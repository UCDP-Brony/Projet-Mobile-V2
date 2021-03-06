import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'
import { SignupPage } from '../signup/signup'
import { ResetPasswordPage } from '../reset-password/reset-password'
import { AlbumsPage } from '../../pages/albums/albums'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  error: any;
  signupPage = SignupPage;
  resetPasswordPage = ResetPasswordPage

  constructor(public navCtrl: NavController, private fb: FormBuilder, private auth: AuthProvider) {
    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });
    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  loginWithGoogle(): void{
    this.auth.loginWithGoogle().subscribe((success) => {
      console.log(success);
    }, err => {
      console.log(err);
    });
  }
/*
  loginWithFacebook(): void{
    this.auth.loginWithFacebook().subscribe((success) => {
      console.log(success);
    }, err => {
      console.log(err);
    });
  }
*/
  login(): void {
    if (this.loginForm.valid) {
      var credentials = ({email: this.email.value, password: this.password.value}); //Added next lines
      this.auth.loginWithEmail(credentials).subscribe(data => {
        console.log(data);
      }, error=>{             //Added next lines for handling unknown users
        console.log(error);
        if (error.code == 'auth/user-not-found'){
          alert('User not found');
        }
      });
    }
  }

  goToAlbum() {
    this.navCtrl.push(AlbumsPage).catch(err => {
      alert("No entry, please login first");
    });
  }

  logout(): void {
    this.auth.logout();
  }

  ionViewCanLeave(){
    this.auth.authenticated();
  }
}
