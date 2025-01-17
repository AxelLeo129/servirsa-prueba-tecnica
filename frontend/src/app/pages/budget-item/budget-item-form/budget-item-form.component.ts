import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetItem } from '../../../models/budget-item.model';
import { GeneralService } from '../../../services/general.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budget-item-form',
  templateUrl: './budget-item-form.component.html',
  styleUrl: './budget-item-form.component.scss'
})
export class BudgetItemFormComponent implements OnInit {

  public loading: boolean = false;
  public form!: FormGroup;
  public isEditing: boolean = false;
  private id: number | null = null;
  public projectId: number | null = null;

  /**
   * Constructor del componente.
   *
   * @param generalService Servicio para gestionar proyectos.
   * @param route Servicio para obtener parámetros de la URL.
   * @param router Servicio para la navegación entre rutas.
   */
  constructor(
    private generalService: GeneralService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.form = this.createFormGroup();
  }

  /**
   * Crea un `FormGroup` con validaciones para el formulario.
   *
   * @returns Un objeto `FormGroup` configurado.
   */
  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  /**
   * Inicializa el formulario y verifica si es un modo de edición.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pid = params.get('id');
      if(pid) this.projectId = parseInt(pid, 10);
      const id = params.get('id1');
      if (id) {
        this.id = parseInt(id, 10);
        this.isEditing = true;
        this.loadProject(this.id);
      }
    });
  }

  /**
   * Carga los datos de un proyecto para edición.
   *
   * @param id Identificador del proyecto.
   */
  loadProject(id: number): void {
    this.generalService.get<BudgetItem | undefined>('/budget-items/' + id).then((response: BudgetItem | undefined) => {
      if (response) this.form.patchValue(response);
    });
  }

  /**
   * Guarda o actualiza un proyecto.
   */
  save(): void {
    if (this.form.invalid) return;

    const data = this.form.value;
    if (this.isEditing && this.id) {
      this.generalService.put('/budget-items', this.id.toString(), data).then(() => {
        this.router.navigate(['/budget-items/' + this.projectId]);
      });
    } else {
      data['project_id'] = this.projectId;
      this.generalService.post('/budget-items', data).then(() => {
        this.router.navigate(['/budget-items/' + this.projectId]);
      });
    }
  }

  /**
   * Obtiene el control del formulario para el campo `name`.
   * @returns Control del formulario `name`.
   */
  get name() { return this.form.get('name'); }

  /**
   * Obtiene el control del formulario para el campo `municipality`.
   * @returns Control del formulario `municipality`.
   */
  get municipality() { return this.form.get('municipality'); }

  /**
   * Obtiene el control del formulario para el campo `department`.
   * @returns Control del formulario `department`.
   */
  get department() { return this.form.get('department'); }

  /**
   * Obtiene el control del formulario para el campo `start_date`.
   * @returns Control del formulario `start_date`.
   */
  get start_date() { return this.form.get('start_date'); }

  /**
   * Obtiene el control del formulario para el campo `end_date`.
   * @returns Control del formulario `end_date`.
   */
  get end_date() { return this.form.get('end_date'); }

}
