import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PurchaseOrder, PurchaseOrderList } from '../../../models/purchase-order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GeneralService } from '../../../services/general.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrl: './purchase-order-list.component.scss'
})
export class PurchaseOrderListComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'supplier', 'date', 'amount', 'actions'];
  public dataSource = new MatTableDataSource<PurchaseOrder>();
  public totalItems = 0;
  public pageSize = 10;
  public currentPage = 1;
  public searchQuery = '';
  private projectId!: number;
  private biId!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private generalService: GeneralService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const id1 = params.get('id1');
      if (id && id1) {
        this.projectId = parseInt(id, 10);
        this.biId = parseInt(id1, 10);
        this.load();
      }
    });
  }

  load(page: number = 1, size: number = 10, search: string = ''): void {
    let params: Map<string, string> = new Map();
    params.set('page', page.toString());
    params.set('size', size.toString());
    if(search) params.set('search', search);

    this.generalService.getWithParams<PurchaseOrderList | undefined>('/purchase-orders/list/' + this.projectId + "/" + this.biId, params).then((response: PurchaseOrderList | undefined) => {
      if(response) {
        this.dataSource.data = response.purchaseOrders;
        this.totalItems = response.totalItems;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchQuery = filterValue;
    this.currentPage = 1;
    this.load(1, this.paginator.pageSize, this.searchQuery);
  }

  changePage(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.load();
  }

  deleteProject(id: number): void {
    this.generalService.delete('/purchase-orders/' + id).then(() => {
      this.load();
    });
  }

  goToCreate(): void {
    this.router.navigate(['/purchase-orders/' +  this.projectId + "/" + this.biId + '/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/purchase-orders/' +  this.projectId + "/" + this.biId + '/edit', id]);
  }

  goToDetails(id: number): void {
    this.router.navigate(['/purchase-orders/' +  this.projectId + "/" + this.biId + '/details', id]);
  }

}
