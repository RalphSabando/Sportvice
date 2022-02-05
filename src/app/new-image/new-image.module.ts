import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewImagePageRoutingModule } from './new-image-routing.module';

import { NewImagePage } from './new-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewImagePageRoutingModule
  ],
  declarations: [NewImagePage]
})
export class NewImagePageModule {}
