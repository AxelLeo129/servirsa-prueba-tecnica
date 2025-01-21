import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../models/purchase-order.model';
import { GeneralService } from '../../../services/general.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-purchase-order-details',
  templateUrl: './purchase-order-details.component.html',
  styleUrl: './purchase-order-details.component.scss'
})
export class PurchaseOrderDetailsComponent implements OnInit {

  public purchaseOrder: PurchaseOrder = {
    id: 0,
    supplier: "",
    date: "",
    amount: "",
    project_id: 0,
    budget_item_id: 0
  };
  public projectId: number | null = null;
  public biId: number | null = null;

  constructor(
    private generalService: GeneralService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const pid = this.route.snapshot.paramMap.get('id');
    if(pid) this.projectId = parseInt(pid, 10);
    const bid = this.route.snapshot.paramMap.get('id1');
    if(bid) this.biId = parseInt(bid, 10);
    const id = this.route.snapshot.paramMap.get('id2');
    if (id) {
      this.loadProject(parseInt(id, 10));
    }
  }

  loadProject(id: number): void {
    this.generalService.get<PurchaseOrder | undefined>('/purchase-orders/' + id).then((response: PurchaseOrder | undefined) => {
      if(response) this.purchaseOrder = response;
    });
  }

}

