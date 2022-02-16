import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';

const materials = [
  MatTabsModule,
  MatInputModule,
  MatStepperModule,
  MatDialogModule, 
  MatCheckboxModule
]

const sharedModules = [
  TranslateModule,
  ReactiveFormsModule,
  AvatarModule,
  ImageCropperModule 
]

const components = [
  ImageCropperComponent,
  PostCardComponent,
  CommentCardComponent
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    ...sharedModules,
    ...materials
  ],
  exports: [
    ...sharedModules,
    ...components,
    ...materials
  ],
  entryComponents:[ImageCropperComponent]
})

export class SharedModule { }
