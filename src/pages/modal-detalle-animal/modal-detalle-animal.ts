import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DbProvider } from '../../providers/db/db';
//import { LaunchNavigator } from '@ionic-native/launch-navigator';


/**
 * Generated class for the ModalDetalleAnimalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-detalle-animal',
  templateUrl: 'modal-detalle-animal.html',
})
export class ModalDetalleAnimalPage {

	animal: any;
  edit: boolean = false;

  constructor(public navCtrl: NavController,
  			  public navParams: NavParams, 
  			  private viewCtrl: ViewController, 
          private camera: Camera, 
          private db: DbProvider) {
  	this.animal = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetalleAnimalPage');
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  editar(){
     this.edit = true;
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
          this.animal.foto = "data:image/jpeg;base64," + imageData;
      }, (err) => {
          console.log(err);
      });
  }

        guardarCambios(){
          this.db.modificaAnimal(this.animal).then((res)=>{
              this.edit = false;
          },(err)=>{  console.log(err) })

        }

        volverInicio() {
          this.viewCtrl.dismiss();
        }

}
