import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';  

import { ModalController } from '@ionic/angular';
import { NewVideoPage } from '../new-video/new-video.page';
import { NewImagePage } from '../new-image/new-image.page';

@Component({
  selector: 'app-club',
  templateUrl: './club.page.html',
  styleUrls: ['./club.page.scss'],
})
export class ClubPage implements OnInit {

  userId: any;
    conversations = [];
    
    messagetext = '';
     
    public message = false; 
    
    public clubs: any;

   constructor(
       public modalController: ModalController,
       private router: Router, 
      public actionSheetController: ActionSheetController,
      public afAuth: AngularFireAuth,
      public afDB: AngularFireDatabase,
      public afSG: AngularFireStorage, 
      ) {
          this.afAuth.authState.subscribe(auth => {
              if (!auth) {
                //this.router.navigateByUrl('/login');
                console.log('non connecté');
              } else {
                this.userId = auth.uid;
                console.log('Connecté: ' + auth.uid);
                this.getClubs();
              }
            });
        this.getConversations(); 
        this.message = false; 
      }
      
      activeMessage() {
          this.message = true; 
          this.messagetext = '';  
      }
      
      getClubs() {
          this.afDB.list('Clubs/').snapshotChanges(['child_added']).subscribe(actions => {
         this.clubs = [];
             actions.forEach(action => {
             this.clubs.push({
                 clubId: action.key,
                description: action.payload.exportVal().description,
                name: action.payload.exportVal().name, 
                image: action.payload.exportVal().image, 
                 });
             });
         });
      }
      
        
        
        getConversations() {
          const conversationRef = this.afDB.list('Clubs/');
          conversationRef.snapshotChanges(['child_added'])
          .subscribe(actions => {
            const that = this;
            const data = [];
            actions.forEach((action: any) => {
                that.afSG.ref(action.payload.val().clubImg).getDownloadURL().subscribe(clubImg => {
                  data.push({
                    clubId:  action.key, 
                    clubImg: clubImg,
                  });
                });
              this.conversations = data;
            });
          });
        }

  
  
      async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
          header: 'Club Settings',
          cssClass: 'my-custom-class',
          buttons: [{
            text: 'Quitter le club',
            role: 'destructive',
            icon: 'log-out', 
            handler: () => {
              this.router.navigateByUrl('/tabs/tab2'); 
            }
          }, {
            text: 'Annuler',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }]
        });
        await actionSheet.present();
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

  ngOnInit() {
  }

}
