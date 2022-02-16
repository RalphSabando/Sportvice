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
    
    public clubs = [
      {id: 1, name: "Test", imgUrl: "https://internationalwomensday.s3-us-west-2.amazonaws.com/images/Women-Sport-IWD-1.jpg"},
      {id: 1, name: "Test", imgUrl: "https://www.si.com/.image/t_share/MTczMzYxMjQzODkxOTY3ODk3/x163129_tk1_00818.jpg"},
      {id: 1, active: true, name: "Test", imgUrl: "https://images.theconversation.com/files/359238/original/file-20200922-18-1kw9ff7.jpg?ixlib=rb-1.1.0&rect=19%2C65%2C2157%2C1076&q=45&auto=format&w=668&h=324&fit=crop"},
      {id: 1, name: "Test", imgUrl: "https://cdn-cciho.nitrocdn.com/TIThodAFYqmLddSqJWHXMnaqddKsgFOz/assets/static/optimized/wp-content/uploads/2021/12/76466d726df17a8323233d3e963a6970.GettyImages-1235927549-December-10th-SportBusiness.jpg"},
      {id: 1, name: "Test", imgUrl: "https://www.lpu.edu.ph/wp-content/uploads/2021/09/Laguna-Sports-01-1536x1017-1.jpg"},
      {id: 1, name: "Test", imgUrl: "https://images.ctfassets.net/3s5io6mnxfqz/60lxbWTf31Olmnvhn6cvFP/3124360f3f5f7ef3d2f9d9c96f412134/AdobeStock_211607687.jpeg?fm=jpg&w=900&fl=progressive"},
      {id: 1, name: "Test", imgUrl: "https://news.llu.edu/sites/news.llu.edu/files/styles/featured_image_755x425/public/preventing_sports_injuries_082919.jpg?itok=QygEVzVX&c=49b5386921ae12821d24b4d2d5e53488"},
      {id: 1, name: "Test", imgUrl: "https://media.istockphoto.com/photos/silhouette-action-sport-outdoors-of-a-group-of-kids-having-fun-picture-id1267168589?b=1&k=20&m=1267168589&s=170667a&w=0&h=_iXpMHE7d4PPJfdMm4S2raNVvSs1h2cBBWM9gHACC3o="}
    ];


    messages = [
      { 
        id: 1, userDetails: { id: 123, name: "Fontain", imgUrl: "https://st2.depositphotos.com/1006318/5909/v/600/depositphotos_59095205-stock-illustration-businessman-profile-icon.jpg" },
        content: "Jogging Man<br><img src='data:image/jpeg;base64,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'/>",
        created_at: Date(),
        reactions: [
          { userId: 1, reaction: "smiley"},
          { userId: 2, reaction: "smiley"},
          { userId: 3, reaction: "smiley"},
          { userId: 4, reaction: "smiley"},
        ]
      },
      { 
        id: 2, userDetails: { id: 123, name: "BillyBoy", imgUrl: "https://st2.depositphotos.com/1006318/5909/v/600/depositphotos_59095205-stock-illustration-businessman-profile-icon.jpg" },
        content: "Running Man<br><img src='https://post.healthline.com/wp-content/uploads/2020/01/Runner-training-on-running-track-732x549-thumbnail.jpg'/> test",
        created_at: Date(),
        reactions: [
          { userId: 1, reaction: "smiley"},
          { userId: 2, reaction: "smiley"},
          { userId: 3, reaction: "smiley"},
          { userId: 4, reaction: "smiley"},
        ]
      }
    ];

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
        //   this.afDB.list('Clubs/').snapshotChanges(['child_added']).subscribe(actions => {
        //  this.clubs = [];
        //      actions.forEach(action => {
        //      this.clubs.push({
        //          clubId: action.key,
        //         description: action.payload.exportVal().description,
        //         name: action.payload.exportVal().name, 
        //         image: action.payload.exportVal().image, 
        //          });
        //      });
        //  });
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
