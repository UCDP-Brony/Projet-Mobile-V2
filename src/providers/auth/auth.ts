import { Injectable } from '@angular/core';
import { firebase } from '@firebase/app'
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Observable";
//import { Platform } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
//import { auth } from 'firebase';

@Injectable()
export class AuthProvider {

  constructor(private af: AngularFireAuth, public googlePlus: GooglePlus) {
  }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then((authData) => {
        //console.log(authData);
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }
/*
  loginWithGoogle() {
      console.log('Sign in with google')
      return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }
*/
  loginWithGoogle(){
    return Observable.create(observer => {
      return this.googlePlus.login({
        'webClientId':'622868024418-f2ke9ehl6f1rfb4dreliill9ctbc178h.apps.googleusercontent.com', //Android reverse client id
        'offline': true
      })
      .then( res => {
        const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        firebase.auth().signInWithCredential(firecreds)
        .then( success => { observer.next(success); })
        .catch(error => {
          observer.error(error);
        });
      });
    })
  }

/*
  private oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      return this.af.auth.signInWithPopup(provider);
    } else {
      return this.af.auth.signInWithRedirect(provider)
      .then(() => {
        return this.af.auth.getRedirectResul().then( result => {
          //This gives us a Google Access Token.
          //We can use it to access the Google API.
          let token = result.credential.accessToken;
          //The signed in user info
          let user = result.user;
          console.log(token, user);
        }).catch(function(error) {
          //Handle Errors here
          alert(error.message);
        });
      });
    }
  }
  */
/*
  loginWithGoogle() {
    return Observable.create(observer => {
      if (!(<any>window).cordova) {
       return GooglePlus.login({
          'webClientId':'622868024418-rjvqlnp49pnmeoo86h2447dorteg1i59.apps.googleusercontent.com' //Android reverse client id
        }).then(userData => {
          var token = userData.idToken;
          const googleCredential = auth.GoogleAuthProvider.credential(token, null);
          this.af.auth.signInWithCredential(googleCredential).then((success)=>{
            observer.next(success);
          }).catch(error => {
            //console.log(error);
            observer.error(error);
          });
        }).catch(error => {
            //console.log(error);
            observer.error(error);
        });
      } else {
        return this.af.auth.login({
          provider: AuthProviders.Google,
          method: AuthMethods.Popup
          }).then(()=>{
            observer.next();
          }).catch(error => {
            //console.log(error);
            observer.error(error);
        });
      }
    });
  }
*/
  registerUser(credentials: any) {
      return Observable.create(observer => {
        this.af.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(authData => {
          //authData.auth.updateProfile({displayName: credentials.displayName, photoURL: credentials.photoUrl}); //set name and photo
          observer.next(authData);
        }).catch(error => {
          //console.log(error);
          observer.error(error);
        });
      });
    }

    resetPassword(emailAddress:string){
      return Observable.create(observer => {
        this.af.auth.sendPasswordResetEmail(emailAddress).then(function(success) {
            //console.log('email sent', success);
            observer.next(success);
          }, function(error) {
            //console.log('error sending email',error);
            observer.error(error);
          });
       });
  }

  logout() {
    this.af.auth.signOut();
  }

  get currentUser():string{
    return this.af.auth.currentUser?this.af.auth.currentUser.email:null;
  }
}
