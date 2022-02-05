import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public changedEvent: any, public dialogRef: MatDialogRef<ImageCropperComponent>) { }

  ngOnInit() {}

  croppedImage: any;
  fileChangeEvent(event: any): void {
    this.changedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  apply() {
    this.dialogRef.close(this.croppedImage);
  }

  close() {
    this.changedEvent = null;
    this.dialogRef.close();
  }


  
}
