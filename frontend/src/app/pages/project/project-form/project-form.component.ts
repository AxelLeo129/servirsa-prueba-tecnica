import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Department, Project } from '../../../models/project.model';
import { departments } from '../../../../utils/constants';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit {

  public loading: boolean = false;
  public projectForm!: FormGroup;
  public isEditing: boolean = false;
  private projectId: number | null = null;
  public departments: Department[] = departments;
  public filteredMunicipalities: string[] = [];

  /**
   * Constructor del componente.
   *
   * @param projectService Servicio para gestionar proyectos.
   * @param route Servicio para obtener parámetros de la URL.
   * @param router Servicio para la navegación entre rutas.
   */
  constructor(
    private generalService: GeneralService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.projectForm = this.createFormGroup();
  }

  /**
   * Crea un `FormGroup` con validaciones para el formulario.
   *
   * @returns Un objeto `FormGroup` configurado.
   */
  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      municipality: new FormControl({ value: '', disabled: true }, [Validators.required]),
      department: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required])
    });
  }

  /**
   * Inicializa el formulario y verifica si es un modo de edición.
   */
  ngOnInit(): void {
    this.projectForm.get('department')?.valueChanges.subscribe((selectedDepartment) => {
      this.updateMunicipalities(selectedDepartment);
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.projectId = parseInt(id, 10);
        this.isEditing = true;
        this.loadProject(this.projectId);
      }
    });
  }

  /**
   * Actualiza la lista de municipios cuando cambia el departamento seleccionado.
   */
  updateMunicipalities(selectedDepartment: string, municipalityValue: string = ""): void {
    const selectedDept = this.departments.find(dept => dept.name === selectedDepartment);
    this.filteredMunicipalities = selectedDept ? selectedDept.municipalities : [];

    const municipalityControl = this.projectForm.get('municipality');
    if (this.filteredMunicipalities.length > 0) {
      municipalityControl?.enable();
    } else {
      municipalityControl?.disable();
      municipalityControl?.setValue(municipalityValue);
    }
  }

  /**
   * Carga los datos de un proyecto para edición.
   *
   * @param id Identificador del proyecto.
   */
  loadProject(id: number): void {
    this.generalService.get<Project | undefined>('/projects/' + id).then((project: Project | undefined) => {
      if (project) {
        this.projectForm.patchValue(project);
        this.updateMunicipalities(project.department, project.municipality);
      }
    });
  }

  /**
   * Guarda o actualiza un proyecto.
   */
  saveProject(): void {
    if (this.projectForm.invalid) return;

    const projectData = this.projectForm.value;
    if (this.isEditing && this.projectId) {
      this.generalService.put('/projects', this.projectId.toString(), projectData).then(() => {
        this.router.navigate(['/projects']);
      });
    } else {
      this.generalService.post('/projects', projectData).then(() => {
        this.router.navigate(['/projects']);
      });
    }
  }

  /**
   * Obtiene el control del formulario para el campo `name`.
   * @returns Control del formulario `name`.
   */
  get name() { return this.projectForm.get('name'); }

  /**
   * Obtiene el control del formulario para el campo `municipality`.
   * @returns Control del formulario `municipality`.
   */
  get municipality() { return this.projectForm.get('municipality'); }

  /**
   * Obtiene el control del formulario para el campo `department`.
   * @returns Control del formulario `department`.
   */
  get department() { return this.projectForm.get('department'); }

  /**
   * Obtiene el control del formulario para el campo `start_date`.
   * @returns Control del formulario `start_date`.
   */
  get start_date() { return this.projectForm.get('start_date'); }

  /**
   * Obtiene el control del formulario para el campo `end_date`.
   * @returns Control del formulario `end_date`.
   */
  get end_date() { return this.projectForm.get('end_date'); }

}
