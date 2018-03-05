import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DbFaunaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  db : SQLiteObject = null;

  constructor(public sqlite: SQLite) {
    console.log('Hello DbFaunaProvider Provider');
  }

//buscar dónde se llama a este método. 
public openDb(){

      return this.sqlite.create({
          name: 'data.db',
          location: 'default' // el campo location es obligatorio
      })
      .then((db: SQLiteObject) => {
       this.db =db;
       console.log('Se ha abierto');
     })
  }

  public createTableFauna(){
    return this.db.executeSql("create table if not exists animal( id INTEGER PRIMARY KEY AUTOINCREMENT,nombreComun TEXT, nombreCientifico TEXT, lat FLOAT, lng FLOAT, description TEXT, foto TEXT )",{})
  }

  public addAnimal(animal){
    let sql = "INSERT INTO animal (nombreComun, nombreCientifico, lat, lng, description, foto) values (?,?,?,?,?,?)";
    return this.db.executeSql(sql,[animal.nombreComun, animal.nombreCientifico, animal.lat,animal.lng,animal.description,animal.foto]);
  }

    public getAnimales(){
    let sql = "SELECT * FROM animal";
    return this.db.executeSql(sql,{});
  }

   public borrarAnimal(id){
     let sql = "DELETE FROM animal WHERE id= ? ";
     return this.db.executeSql(sql,[id]);
  }
  
  public modificaAnimal(animal){
    let sql = "UPDATE animal  SET nombreComun = ?, nombreCientifico = ?, description = ?, foto = ? WHERE id = ? ";
    console.log("actualizar tras salir");
    return this.db.executeSql(sql,[
                                   animal.nombreComun,
                                    animal.nombreCientifico, 
                                    animal.description,
                                    animal.foto,
                                    animal.id]);
                                }
}

