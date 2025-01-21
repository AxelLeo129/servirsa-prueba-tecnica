import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BudgetItem, BudgetItemList } from '../../../models/budget-item.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GeneralService } from '../../../services/general.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrl: './budget-item-list.component.scss'
})
export class BudgetItemListComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource = new MatTableDataSource<BudgetItem>();
  public totalItems = 0;
  public pageSize = 10;
  public currentPage = 1;
  public searchQuery = '';
  private projectId!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private generalService: GeneralService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.projectId = parseInt(id, 10);
        this.load();
      }
    });
  }

  load(page: number = 1, size: number = 10, search: string = ''): void {
    let params: Map<string, string> = new Map();
    params.set('page', page.toString());
    params.set('size', size.toString());
    if(search) params.set('search', search);

    this.generalService.getWithParams<BudgetItemList | undefined>('/budget-items/list/' + this.projectId, params).then((response: BudgetItemList | undefined) => {
      if(response) {
        this.dataSource.data = response.budgetItems;
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
    this.generalService.delete('/budget-items/' + id).then(() => {
      this.load();
    });
  }

  goToCreate(): void {
    this.router.navigate(['/budget-items/' +  this.projectId + '/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/budget-items/' +  this.projectId + '/edit', id]);
  }

  goToDetails(id: number): void {
    this.router.navigate(['/budget-items/' +  this.projectId + '/details', id]);
  }

}
