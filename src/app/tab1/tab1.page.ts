import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LANGUAGE } from 'src/const/language.const';
import { TranslationService } from '../shared/services/translation.service';
// import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    
    public player = false; 
    public popular = false;
    public club = false;
    public friends = false;
  
    public id: any; 
    public progress = false; 
    public log = false; 
    public Languge = LANGUAGE;
    posts: any;
  userId: string;

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
      // private orderPipe: OrderPipe,
    public afDB: AngularFireDatabase,
    public afSG: AngularFireStorage,
    public afAuth: AngularFireAuth,
    public translation: TranslationService
      ) {
          this.player = false;
          this.popular = true;
          this.club = false;
          this.friends = false;
          this.progress = true; 
          this.afAuth.authState.subscribe(auth => {
        if(auth){
            this.log = true; 
            this.progress = false;
          this.userId = auth.uid;
          this.getPosts(); 
        } else {
            this.log = false;
            this.progress = false;
        }
      });
    }
    
    
    activePopular() {
      this.popular = true;
      this.club = false;
      this.friends = false;
  }
  
  activeClub() {
      this.popular = false;
      this.club = true;
      this.friends = false;
  }
  
  activeFriends() {
      this.popular = false;
      this.club = false;
      this.friends = true;
  }
  
  getPosts() {
      this.afDB.list('Posts/').snapshotChanges(['child_added']).subscribe(actions => {
         this.posts = [];
             actions.forEach(action => {
             this.posts.push({
                 postId: action.key,
                description: action.payload.exportVal().description, 
                image: action.payload.exportVal().image,
                video: action.payload.exportVal().video,    
                club: action.payload.exportVal().club,   
                username: action.payload.exportVal().userName,   
                userimage: action.payload.exportVal().userImage,   
                 });
             });
         });
  }
  
  /*
  addLike(post: any) {
      console.log('userID: ' + this.userId);
      post.likesNb++;
      post.liked = true;
      this.afDB.object('Posts/' + post.key + '/' + this.userId).set({
        liked: true
      });
      this.afDB.object('Posts/' + post.key).update({
        likesNb: post.likesNb
      });
    }

    removeLike(post: any){
      post.likesNb--;
      post.liked = false;
      this.afDB.list('Posts/' + post.key).remove(this.userId);
      this.afDB.object('Posts/' + post.key).update({
        likesNb: post.likesNb
      });
    }
    */
  
  
    /*
    getPosts() {
      this.afDB.list('Posts/').snapshotChanges(['child_added']).subscribe(actions => {
        this.posts = [];
        actions.forEach(action => {
          const date = action.payload.exportVal().date;
              // console.log('photo post: ' + postUrl);
              let userLiked = false;
              if(action.payload.exportVal()[this.userId]) {userLiked = true;}
              this.posts.push({
                id: action.payload.exportVal().userId,
                postId: action.key,
                description: action.payload.exportVal().description,
                date: date,
                hour: date.substring(8,10) + '/' + date.substring(5,7) + ' - ' + date.substring(11, 16),
                pseudo: action.payload.exportVal().pseudo,
                imgUrl: action.payload.exportVal().imgUrl,
                userImg: action.payload.exportVal().userImg,
                liked: userLiked, 
                likesNb: action.payload.exportVal().likesNb
              });
              this.posts =  this.orderPipe.transform(this.posts, 'date', true); 
        });
      });
    }

    addLike(post: any) {
      console.log('userID: ' + this.userId);
      post.likesNb++;
      post.liked = true;
      this.afDB.object('Posts/' + post.key + '/' + this.userId).set({
        liked: true
      });
      this.afDB.object('Posts/' + post.key).update({
        likesNb: post.likesNb
      });
    }

    removeLike(post: any){
      post.likesNb--;
      post.liked = false;
      this.afDB.list('Posts/' + post.key).remove(this.userId);
      this.afDB.object('Posts/' + post.key).update({
        likesNb: post.likesNb
      });
    }
  */
  
  selectLanguage(item) {
    this.translation.setLanguage(item);
  }

}
