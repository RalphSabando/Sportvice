import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewVideoPageRoutingModule } from './new-video-routing.module';

//import { FormatFileSizePipe } from '../format-file-size.pipe';

import { NewVideoPage } from './new-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewVideoPageRoutingModule
  ],
  declarations: [
      //FormatFileSizePipe,
      NewVideoPage
      ]
})
export class NewVideoPageModule {}
