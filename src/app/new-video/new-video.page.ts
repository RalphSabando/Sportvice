import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}



@Component({
  selector: 'app-new-video',
  templateUrl: './new-video.page.html',
  styleUrls: ['./new-video.page.scss'],
})
export class NewVideoPage implements OnInit {
    
     // File upload task 
  fileUploadTask: AngularFireUploadTask;

  // Upload progress
  percentageVal: Observable<number>;

  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;

  // Uploaded File URL
  UploadedImageURL: Observable<string>;

  // Uploaded image collection
  files: Observable<imgFile[]>;

  // Image specifications
  imgName: string;
  imgSize: number;

  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  private filesCollection: AngularFirestoreCollection<imgFile>; 
  
  log: any;
  userId: any; 

  constructor(
      public modalController: ModalController,
      private afs: AngularFirestore,
      public afDB: AngularFireDatabase,
      public afStorage: AngularFireStorage,
      public toastController: ToastController,
      public afAuth: AngularFireAuth,
      private router: Router
      ) {
          
           this.isFileUploading = false;
        this.isFileUploaded = false;
        
        // Define uploaded files collection
        this.filesCollection = afs.collection<imgFile>('imagesCollection');
        this.files = this.filesCollection.valueChanges();
          
          this.afAuth.authState.subscribe(auth => {
          if (!auth) {
            this.log = false;
          } else { 
             this.userId = auth.uid;  
            this.log = true;
          } 
        });
      }

  ngOnInit() {
  }
  
   uploadImage(event: FileList) {
      
      const file = event.item(0)

      // Image validation
      if (file.type.split('/')[0] !== 'video') {  
        console.log('File type is not supported!')
        return;
      }

      this.isFileUploading = true;
      this.isFileUploaded = false;

      this.imgName = file.name;

      // Storage path
      const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;

      // Image reference
      const imageRef = this.afStorage.ref(fileStoragePath);

      // File upload task
      this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);

      // Show uploading progress
      this.percentageVal = this.fileUploadTask.percentageChanges();
      this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
        
        finalize(() => {
          // Retreive uploaded image storage path
          this.UploadedImageURL = imageRef.getDownloadURL();
          
          this.UploadedImageURL.subscribe(resp=>{
            this.storeFilesFirebase({
              name: file.name,
              filepath: resp,
              size: this.imgSize
            });
            this.isFileUploading = false;
            this.isFileUploaded = true;
          },error=>{
            console.log(error);
          })
        }),
        
        tap(snap => {
            this.imgSize = snap.totalBytes;
        })
        
      )
  }
  
  storeFilesFirebase(image: imgFile) {
      const fileId = this.afs.createId();
      
      this.filesCollection.doc(fileId).set(image).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      }); 
      
      
      this.afDB.object("Users/" + this.userId).set({  
            ServiceImg: image,  
      }).then(res => {
          console.log(res);
        this.dismiss(); 
      }).catch(err => {
         console.log(err);  
      });
      
    } 
    
    
     
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }  
  

}
