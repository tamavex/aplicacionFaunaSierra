import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDetalleAnimalPage } from './modal-detalle-animal';

@NgModule({
  declarations: [
    ModalDetalleAnimalPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalDetalleAnimalPage),
  ],
})
export class ModalDetalleAnimalPageModule {}
