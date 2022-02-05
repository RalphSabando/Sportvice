import { Component, OnInit } from '@angular/core';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    public userId: any;
    public userData = {
      name: '',
      description: '', 
      image: '',
      role: '' 
    };
    
    public posts: any;
    public clubs: any;

  constructor(
      public toastController: ToastController,
        public actionSheetController: ActionSheetController,
        public afAuth: AngularFireAuth,
        public afDB: AngularFireDatabase,
        public afSG: AngularFireStorage,
        private router: Router
      ) {
          this.afAuth.authState.subscribe(auth => {
              if (!auth) {
                this.router.navigateByUrl('/home');
              } else {
                this.userId = auth.uid;
                this.getUserProfile();
                this.getUserClubs();
                this.getUserPosts();
              }
            });
      }

  ngOnInit() {
  }
  
  getUserPosts() {
      this.afDB.list('Users/' + this.userId + '/Posts').snapshotChanges(['child_added']).subscribe(actions => {
         this.posts = []; 
             actions.forEach(action => {
             this.posts.push({
                 postId: action.key,
                description: action.payload.exportVal().description,
                name: action.payload.exportVal().name, 
                image: action.payload.exportVal().image, 
                 });
             });
        });
  }
  
  getUserClubs() {
       this.afDB.list('Users/' + this.userId + '/Clubs').snapshotChanges(['child_added']).subscribe(actions => {
         this.clubs = []; 
             actions.forEach(action => {
             this.clubs.push({
                 clubId: action.key,
                description: action.payload.exportVal().description,
                name: action.payload.exportVal().name, 
                image: action.payload.exportVal().image, 
                color: action.payload.exportVal().color,
                 });
             });
        });
    }
  
  getUserProfile() {
      this.afDB.object('Users/' + this.userId + '/Infos').snapshotChanges()
      .subscribe(actions => {
          this.userData = { 
            name: actions.payload.exportVal().name,
            description: actions.payload.exportVal().description,
            image: actions.payload.exportVal().image,
            role: actions.payload.exportVal().role,  
          };
      });
    }

}
