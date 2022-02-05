import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';  

import { NewVideoPage } from '../new-video/new-video.page';
import { NewImagePage } from '../new-image/new-image.page';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.page.html',
  styleUrls: ['./post-new.page.scss'], 
})
export class PostNewPage implements OnInit {
    public video = "";
    public image = "";
    public text = "";
    public userId: any; 
    
    public userdatas = {
      image: "",
      name: "",
      description: "",
    };
 
  constructor(
      public router: Router, 
      public afAuth: AngularFireAuth,
        public afDB: AngularFireDatabase, 
      public modalController: ModalController,
      ) {
          this.afAuth.authState.subscribe(auth => {
              this.userId = auth.uid; 
              this.getUserDatas();
          }); 
      }

  ngOnInit() {
  }
  getUserDatas() {
      this.afDB.object('Users/' + this.userId + '/Infos').snapshotChanges()    
      .subscribe(actions => {
          this.userdatas ={  
              image: actions.payload.exportVal().image,
              name: actions.payload.exportVal().name,
              description: actions.payload.exportVal().description, 
          };
      }); 
  }
  
  
  getImage() {
      this.afDB.object('Users/' + this.userId + '/NewImage/' + '/ServiceImg').snapshotChanges()    
      .subscribe(actions => {
          this.image = actions.payload.exportVal().filepath; 
      }); 
  }
  
  getVideo() {
      this.afDB.object('Users/' + this.userId + '/NewImage/' + '/ServiceImg').snapshotChanges()    
      .subscribe(actions => {
          this.video = actions.payload.exportVal().filepath; 
      }); 
  }
  
  publishPost() {
       this.afDB.list("Users/" + this.userId + "/Posts").push({  
           userId: this.userId,
            video: this.video, 
            image: this.image,
            description: this.text, 
            userImage: this.userdatas.image,
            userDescription: this.userdatas.description,
            userName: this.userdatas.name, 
      }).then(res => {
          console.log(res); 
      }).catch(err => {
         console.log(err);  
      });
      this.afDB.list("/Posts").push({  
           userId: this.userId,
            video: this.video,   
            image: this.image,
            description: this.text, 
            userImage: this.userdatas.image,
            userDescription: this.userdatas.description,
            userName: this.userdatas.name,  
      }).then(res => {
          console.log(res); 
      }).catch(err => {
         console.log(err);  
      });
      this.router.navigateByUrl('/profile');
      
    }  
 
   async openNewImagePage() {
    const modal = await this.modalController.create({
          component: NewImagePage, 
          cssClass: 'my-custom-class',
          mode: 'ios'
        });
        return await modal.present();
  }
  
  async openNewVideoPage() {
    const modal = await this.modalController.create({
          component: NewVideoPage,
          cssClass: 'my-custom-class',
          mode: 'ios'
        });
        return await modal.present();
  }
    

}
