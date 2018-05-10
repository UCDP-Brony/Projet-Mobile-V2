import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import { firebase } from '@firebase/app'
import { AngularFireAuth } from 'angularfire2/auth';
import { Album, Photo } from './../../model/model';
//import { Platform } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
//import { auth } from 'firebase';

import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireList, AngularFireObject } from 'angularfire2/database/interfaces';


@Injectable()
export class AlbumsServiceProvider {


	albumsRef: AngularFireList<Album>;



  public addAlbum(name: string, desc: string, userId: string) {
    try {
      let album = {
        uuid: this.generateUuid(),
        name: name,
        userId: userId
      } as Album;
      this.albumsRef.push(album);
    }
    catch (e) {
      console.error(e);
    }

  }

//private void writeNewUser(String userId, String name, String email) {
//    User user = new User(name, email);

//    mDatabase.child("users").child(userId).setValue(user);
//}


	public genUuid() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
	      return v.toString(16);
	    });
	}

}
