import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    passwordType: string = 'password'; 
    iconType: string = 'eye-outline';
    passwordShown: boolean = false;
    page = false;
    loginData = {
        email: '',
        password: ''
      };

  constructor(
      public toastController: ToastController,
      public afAuth: AngularFireAuth,
      private router: Router
      ) {
          this.page = false;
      }

  ngOnInit() {
  }
  
  //Password 
  public togglePassword() { 
      if(this.passwordShown) {
          this.passwordShown = false; 
          this.passwordType = 'password';
          this.iconType = 'eye-outline';
      } else {
          this.passwordShown = true; 
          this.passwordType = 'text';
          this.iconType = 'eye-off-outline';  
      }
  }
  
    
  async login() { 
       this.page = true;
      this.afAuth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
      .then(auth => { 
        this.router.navigateByUrl('/');      
        this.page = false; 
      }).catch(err => {
        this.errorMail();
        this.page = false;  
      });  
    }
  
  async errorMail() {
      const toast = await this.toastController.create({
        message: 'Email ou mot de passe incorrect',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    } 

}
