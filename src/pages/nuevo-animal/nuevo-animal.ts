import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the ModalNuevoAnimalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'nuevo-animal',
  templateUrl: 'nuevo-animal.html',
})
export class NuevoAnimalPage {

  coords : any = { lat: 0, lng: 0 }
  nombreComun: string;
  nombreCientifico: string = '';
  description: string;
  foto: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,  private viewCtrl : ViewController, private camera: Camera, public db : DbProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoAnimalPage');
	    this.coords.lat = this.navParams.get('lat');
	    this.coords.lng = this.navParams.get('lng');
  }

	sacarFoto(){

    let cameraOptions : CameraOptions = {
        quality: 50,
        encodingType: this.camera.EncodingType.JPEG, 
        targetWidth: 800,
        targetHeight: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true
    }


    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is a base64 encoded string
        this.foto = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }
	guardarAnimal(){
    let animal = {
      lat: this.coords.lat,
      lng: this.coords.lng ,
      nombreComun: this.nombreComun,
      nombreCientifico: this.nombreCientifico,
      description: this.description,
      foto: this.foto
    }
    this.db.addAnimal(animal).then((res)=>{
      console.log("guardar animal");
      this.navCtrl.pop();
     /*  alert('se ha introducido correctamente en la bd'); */
    },(err)=>{ /* alert('error al meter en la bd'+err) */ })
}
}
