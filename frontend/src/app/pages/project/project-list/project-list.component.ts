import { Component, OnInit, ViewChild } from '@angular/core';
import { Project, ProjectList } from '../../../models/project.model';
import { GeneralService } from '../../../services/general.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {

  public displayedColumns: string[] = ['code', 'name', 'municipality', 'department', 'actions'];
  public dataSource = new MatTableDataSource<Project>();
  public totalItems = 0;
  public pageSize = 10;
  public currentPage = 1;
  public searchQuery = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private generalService: GeneralService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(page: number = 1, size: number = 10, search: string = ''): void {
    let params: Map<string, string> = new Map();
    params.set('page', page.toString());
    params.set('size', size.toString());
    if(search) params.set('search', search);

    this.generalService.getWithParams<ProjectList | undefined>('/projects', params).then((response: ProjectList | undefined) => {
      if(response) {
        this.dataSource.data = response.projects;
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
    this.loadProjects();
  }

  changePage(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProjects();
  }

  deleteProject(id: number): void {
    this.generalService.delete('/projects/' + id).then(() => {
      this.loadProjects();
    });
  }

  goToCreate(): void {
    this.router.navigate(['/projects/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/projects/edit', id]);
  }

  goToDetails(id: number): void {
    this.router.navigate(['/projects/details', id]);
  }

}
