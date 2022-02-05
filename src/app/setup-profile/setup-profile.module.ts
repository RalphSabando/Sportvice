import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetupProfilePageRoutingModule } from './setup-profile-routing.module';

import { SetupProfilePage } from './setup-profile.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetupProfilePageRoutingModule,
    SharedModule
  ],
  declarations: [SetupProfilePage]
})
export class SetupProfilePageModule {}
