import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project.model';
import { GeneralService } from '../../../services/general.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {

  public project: Project = {
    id: 1,
    code: "",
    name: "",
    municipality: "",
    department: "",
    start_date: "",
    end_date: "",
  };

  constructor(
    private generalService: GeneralService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProject(parseInt(id, 10));
    }
  }

  loadProject(id: number): void {
    this.generalService.get<Project | undefined>('/projects/' + id).then((response: Project | undefined) => {
      if(response) this.project = response;
    });
  }
}
