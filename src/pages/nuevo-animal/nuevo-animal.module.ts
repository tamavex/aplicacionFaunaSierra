import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoAnimalPage } from './nuevo-animal';

@NgModule({
  declarations: [
    NuevoAnimalPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoAnimalPage),
  ],
})
export class NuevoAnimalPageModule {}
