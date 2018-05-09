import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the AlbumsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-albums',
  templateUrl: 'albums.html',
})
export class AlbumsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider) {
  }

  logout() {
    this.auth.logout();
    this.navCtrl.push(HomePage);
  }

  ionViewCanEnter() {
    return this.auth.authenticated();
  }

}
