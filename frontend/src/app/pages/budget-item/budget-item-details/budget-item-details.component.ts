import { Component, OnInit } from '@angular/core';
import { BudgetItem } from '../../../models/budget-item.model';
import { GeneralService } from '../../../services/general.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budget-item-details',
  templateUrl: './budget-item-details.component.html',
  styleUrl: './budget-item-details.component.scss'
})
export class BudgetItemDetailsComponent implements OnInit {

  public budgetItem: BudgetItem = {
    id: 0,
    name: ""
  };
  public projectId: number | null = null;

  constructor(
    private generalService: GeneralService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const pid = this.route.snapshot.paramMap.get('id');
    if(pid) this.projectId = parseInt(pid, 10);
    const id = this.route.snapshot.paramMap.get('id1');
    if (id) {
      this.loadProject(parseInt(id, 10));
    }
  }

  loadProject(id: number): void {
    this.generalService.get<BudgetItem | undefined>('/budget-items/' + id).then((response: BudgetItem | undefined) => {
      if(response) this.budgetItem = response;
    });
  }
}
