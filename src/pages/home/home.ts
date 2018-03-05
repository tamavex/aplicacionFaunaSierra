import { Component } from '@angular/core';
import { NavController,NavParams, ModalController, AlertController} from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import {NuevoAnimalPage} from '../nuevo-animal/nuevo-animal';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	animales: any;
	coords : any = { lat: 0, lng: 0 }

    constructor(public navCtrl: NavController, 
                public db : DbProvider, 
                public navParams: NavParams, 
                public alertCtrl: AlertController,
                public modalCtrl : ModalController) {
    	console.log("Entro");
    	this.db.openDb();
    	
	}

	ionViewWillEnter(){
		console.log("Vista de error");
		
		    this.db.getAnimales().then((res)=>{
			    this.animales = [];
			    for(var i = 0; i < res.rows.length; i++){
			        this.animales.push({
			          id: res.rows.item(i).id,
			          nombreComun: res.rows.item(i).nombreComun,
			          nombreCientifico: res.rows.item(i).nombreCientifico,
			          lat:res.rows.item(i).lat,
			          lng:res.rows.item(i).lng,
			          description: res.rows.item(i).description,
			          foto: res.rows.item(i).foto
			        });
			    }
		    },(err)=>{ /* alert('error al sacar de la bd'+err) */ })
	  
    }

	nuevoAnimal(){
		// aquí vamos a abrir el modal para añadir nuestro animal.
		   this.navCtrl.push(NuevoAnimalPage);
   		   

	}

	   borrarAnimal(id){

    let alert = this.alertCtrl.create({
      title: 'Confirmar borrado',
      message: '¿Estás seguro de que deseas eliminar este animal?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
          }
        },
        {
          text: 'Si',
          handler: () => {
               // AquÍ borramos el sitio en la base de datos
                             this.db.borrarAnimal(id).then((res)=>{
            // Una vez borrado el sitio recargamos el listado
              this.db.getAnimales().then((res)=>{
              this.animales = [];
              for(var i = 0; i < res.rows.length; i++){
                 this.animales.push({
			          id: res.rows.item(i).id,
			          nombreComun: res.rows.item(i).nombreComun,
			          nombreCientifico: res.rows.item(i).nombreCientifico,
			          lat:res.rows.item(i).lat,
			          lng:res.rows.item(i).lng,
			          description: res.rows.item(i).description,
			          foto: res.rows.item(i).foto
			        });
              }

              },(err)=>{ /* alert('error al sacar de la bd'+err) */ })

            },(err)=>{ /* alert('error al borrar de la bd'+err) */ });
           }
        }
      ]
    });

    alert.present();

 }

  muestraAnimal(animal){
    let modalAnimal = this.modalCtrl.create( 'ModalDetalleAnimalPage', animal );
    modalAnimal.present();
   }

}
