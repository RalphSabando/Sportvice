import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SudoPageRoutingModule } from './sudo-routing.module';

import { SudoPage } from './sudo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SudoPageRoutingModule
  ],
  declarations: [SudoPage]
})
export class SudoPageModule {}
