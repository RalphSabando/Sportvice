import { Component } from '@angular/core';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    public userId: any;
    
    public events: any;
    public clubs: any;
    public users: any; 
    
    slideOpts = { 
        initialSlide: 1,
        speed: 400
      };
    

  constructor(
      public toastController: ToastController,
        public actionSheetController: ActionSheetController,
        public afAuth: AngularFireAuth,
        public afDB: AngularFireDatabase,
        public afSG: AngularFireStorage,
        private router: Router
      ) {
         this.getEvents(); 
         this.getClubs(); 
         this.getUsers();
  }
  
  getClubs() {
      this.afDB.list('FavoritesClubs/').snapshotChanges(['child_added']).subscribe(actions => {
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
  
  getUsers() { 
      this.afDB.list('Users/').snapshotChanges(['child_added']).subscribe(actions => {
         this.users = []; 
             actions.forEach(action => { 
             this.users.push({ 
                userId: action.key,
                description: action.payload.exportVal().description,
                name: action.payload.exportVal().name, 
                image: action.payload.exportVal().image, 
                 });
             });
        });
  }
  
  
   getEvents() {
       this.afDB.list('Events/').snapshotChanges(['child_added']).subscribe(actions => {
         this.events = []; 
             actions.forEach(action => {
             this.events.push({
                eventId: action.key,
                description: action.payload.exportVal().description,
                name: action.payload.exportVal().name, 
                image: action.payload.exportVal().image, 
                 });
             });
        });
    }

 



}
