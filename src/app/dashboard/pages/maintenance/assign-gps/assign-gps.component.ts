import { Component, Input, Output, EventEmitter, inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-assign-gps',
  templateUrl: './assign-gps.component.html',
  styleUrls: ['./assign-gps.component.css']
})
export class AssignGPSComponent {
  private fb = inject(FormBuilder)
  formAssign: FormGroup;
  name: string = '';

  //data para los select
  /*opcionesSelect1 = ['Opción 1', 'Opción 2', 'Opción 3'];
  opcionesSelect2 = ['Elemento A', 'Elemento B', 'Elemento C'];*/

  @Output() cerrar = new EventEmitter<void>();
  @Output() nameCaptured = new EventEmitter<string>();

  constructor() {
    this.formAssign = this.fb.group({
      Name: ['',[Validators.required,Validators.pattern(/^[A-Za-z]{2,4}[0-9]{1,6}$/)]],
      selectUno: [''],
      selectDos: ['']
    });
  }

  saveData(){
    if(this.formAssign.valid){
      this.nameCaptured.emit(this.formAssign.get('Name')?.value);
    }else{this.formAssign.markAllAsTouched();}
  }

  cerrarModal() {
    this.cerrar.emit();
  }
}
