import { Component, OnInit } from '@angular/core';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.page.html',
  styleUrls: ['./chatbox.page.scss'],
})
export class ChatboxPage implements OnInit {
    users: any;

  constructor(
      public toastController: ToastController,
        public actionSheetController: ActionSheetController,
        public afAuth: AngularFireAuth,
        public afDB: AngularFireDatabase,
        public afSG: AngularFireStorage,
        private router: Router
      ) {
          this.getUsers();
      }

  ngOnInit() {
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

}
