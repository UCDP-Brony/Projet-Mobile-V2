import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { AlbumsServiceProvider } from '../../providers/albums/albums-services';
import { Album, Photo } from './../../model/model';
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

	albums: Album[];
	photos: Photo[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, public albumservice: AlbumsServiceProvider,public alertCtrl: AlertController, public toastCtrl: ToastController) {

	


  }

  logout() {
    this.auth.logout();
    this.navCtrl.push(HomePage);
  }


private validateNotEmpty(name: string) {
    if (name == '')  {
      let toastError = this.toastCtrl.create({
        message: 'Merci de renseigner un nom',
        duration: 3000,
        position: 'top'
      });
      toastError.present();
      return false;
    }
    return true;
  }


	public addAlbum() {
	    let prompt = this.alertCtrl.create({
	      title: 'Album',
	      message: "Ajouter un album",
	      inputs: [{
		  name: 'name',
		  placeholder: 'Nom'
		},{
		  name: 'desc',
		  placeholder: 'Description'
		},],
	      buttons:[{
		  text: 'Annuler',
		  handler: data => { }
		},{
		  text: 'Enregistrer',
		  handler: data => {
		    if (this.validateNotEmpty(data.name)) {
			this.albumservice.addAlbum(data.name, data.desc, this.auth.currentUser() );
		    } else {return false;}
		  }
		}
	      ]
	    });
	    prompt.present();
	  }
/**
	private loadAlbum() {
	    this.albumservice.getAlbums().subscribe(albums => {     
	      this.albums = albums;
	    });
	    this.albumservice.getPhotos().subscribe(photos => {     
	      this.photos = photos;
	    });
	}**/

  ionViewCanEnter() {
	alert(this.auth.currentUser);
    return this.auth.authenticated();
  }

}
