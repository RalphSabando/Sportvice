import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormatFileSizePipe } from '../format-file-size.pipe';
import { PostNewPageRoutingModule } from './post-new-routing.module';

import { PostNewPage } from './post-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostNewPageRoutingModule
  ],
  declarations: [
      FormatFileSizePipe,
      PostNewPage
      ]
})
export class PostNewPageModule {}
