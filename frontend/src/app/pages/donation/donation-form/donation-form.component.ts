import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Donation } from '../../../models/donations.model';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrl: './donation-form.component.scss'
})
export class DonationFormComponent implements OnInit {

  public loading: boolean = false;
  public form!: FormGroup;
  public isEditing: boolean = false;
  private id: number | null = null;
  public projectId: number | null = null;
  public bdId: number | null = null;

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
      donor: new FormControl('', [Validators.required, Validators.minLength(3)]),
      date: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Inicializa el formulario y verifica si es un modo de edición.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pid = params.get('id');
      if(pid) this.projectId = parseInt(pid, 10);
      const bid = params.get('id1');
      if(bid) this.bdId = parseInt(bid, 10);
      const id = params.get('id2');
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
    this.generalService.get<Donation | undefined>('/donations/' + id).then((response: Donation | undefined) => {
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
      this.generalService.put('/donations', this.id.toString(), data).then(() => {
        this.router.navigate(['/donations/' +  this.projectId + "/" + this.bdId]);
      });
    } else {
      data['project_id'] = this.projectId;
      data['budget_item_id'] = this.bdId;
      this.generalService.post('/donations', data).then(() => {
        this.router.navigate(['/donations/' +  this.projectId + "/" + this.bdId]);
      });
    }
  }

  /**
   * Obtiene el control del formulario para el campo `name`.
   * @returns Control del formulario `name`.
   */
  get donor() { return this.form.get('donor'); }
  get date() { return this.form.get('date'); }
  get amount() { return this.form.get('amount'); }

}

