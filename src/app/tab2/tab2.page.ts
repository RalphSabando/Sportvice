import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { ModalController } from '@ionic/angular';
import { PostNewPage } from '../post-new/post-new.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
     userId: any;
    conversations = [];
    
    messagetext = '';
     
    public message = false; 
    
    public clubs: any;

   constructor(
       public modalController: ModalController,
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
              console.log('Delete clicked');
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
      
      
      async openPostNewPage() {
    const modal = await this.modalController.create({
          component: PostNewPage,
          cssClass: 'my-custom-class',
          mode: 'ios'
        });
        return await modal.present();
  }
      

}
