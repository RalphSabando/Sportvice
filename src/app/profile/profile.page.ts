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
    croppedImg: any = 'https://st2.depositphotos.com/1006318/5909/v/600/depositphotos_59095205-stock-illustration-businessman-profile-icon.jpg';
    profileImg: string = `assets/profile_avatar_placeholder.png`;
    
    public posts: any;
    public clubs: any;

    userPosts = [ 
      { 
        id: 1, 
        content: "Lorem Ipsum", 
        user: {
          name: "John Doe",
          clubs: ["Football's Club"],
          imgUrl: ""
        },
        attachments: ["https://media.istockphoto.com/photos/silhouette-action-sport-picture-id1272269793?b=1&k=20&m=1272269793&s=170667a&w=0&h=xie_NP8GQ6LFpiA0WLqoVUF7y2wyebpCJDQ4wJwPy40=",
      "https://upload.wikimedia.org/wikipedia/commons/9/92/Youth-soccer-indiana.jpg","https://i.pinimg.com/originals/63/00/82/63008254d66e382e44b48edd327b0c0a.jpg"]
      },
      { 
        id: 2, 
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur semper hendrerit nisi ut convallis. Nunc at ultricies leo. Mauris in justo at metus porttitor consequat quis ac sem. In non congue leo.", 
        user: {
          name: "Jane Doe",
          clubs: ["Volleyball's Club"],
          imgUrl: ""
        }
      },
    ]

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
