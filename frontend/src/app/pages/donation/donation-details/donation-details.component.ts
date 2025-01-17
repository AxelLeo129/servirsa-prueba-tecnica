import { Component, OnInit } from '@angular/core';
import { Donation } from '../../../models/donations.model';
import { GeneralService } from '../../../services/general.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.component.html',
  styleUrl: './donation-details.component.scss'
})
export class DonationDetailsComponent  implements OnInit {

  public donation: Donation = {
    id: 0,
    donor: "",
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
    this.generalService.get<Donation | undefined>('/donations/' + id).then((response: Donation | undefined) => {
      if(response) this.donation = response;
    });
  }
}
