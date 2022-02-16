import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../shared/services/toast.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  passwordType: string = 'password'; 
  iconType: string = 'eye-outline';
  passwordShown: boolean = false;
  page = false;
  log = false;
  signupForm: FormGroup;
  submitted: boolean = false;

  constructor(public afSG: AngularFireStorage,
      public toastService: ToastService,
      public afAuth: AngularFireAuth,
      private router: Router,
      private translateService: TranslateService,
      private fb: FormBuilder,
      private userService: UserService
      ) {
          this.signupForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            checked: [false, Validators.requiredTrue]
          })
          this.page = false; 
          this.afAuth.authState.subscribe(auth => {
          if (!auth) {
            this.log = false;
          } else { 
            this.log = true; 
          } 
        });
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
  
  
  signup() {
    // console.log('signup', this.signupForm);
    if(this.signupForm.valid) {
      this.submitted = true;
      this.afAuth.createUserWithEmailAndPassword(this.signupForm.get('email').value, this.signupForm.get('password').value)
                .then(auth => { 
                  // console.log('success: ' + auth.user.);
                  this.userService.saveUser(auth.user.uid, {
                    name: this.signupForm.get('name').value,
                    email: this.signupForm.get('email').value
                  })
                  // this.createUserInfo(auth.user.uid); 
                  this.page = false;
                  this.log = true; 
                  this.router.navigateByUrl('/setup-profile');
            }) .catch(err => { 
                  console.log('Error: ' + err);
                  console.log(err.toString().includes('email-already-in-use'));
                  if(err.toString().includes('email-already-in-use')) {
                    this.toastService.showToast(this.translateService.instant('register_page.email_used'));

                  }
            })
    } 
      // if (this.signupForm.name == "") {
      //      this.errorSignup(); 
      //   } else {
      //      this.page = true;
      //         this.afAuth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password)
      //           .then(auth => { 
      //             console.log('ID de l utilisateur: ' + auth.user.uid);
      //             this.createUserInfo(auth.user.uid); 
      //             this.page = false;
      //             this.log = true; 
      //             this.router.navigateByUrl('/profile-edit');
      //       }) .catch(err => { 
      //             console.log('Erreur: ' + err);
      //         this.errorSignup();
      //       this.page = false;
      //   });
      //   } 
  }
  
  
  
  

}
