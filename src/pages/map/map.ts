import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';


let window: any;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  public map: any = {};

  constructor(private eliteApi:EliteApiProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map  = {
      lat: location.latitude,
      lng: location.longitude,
      zoom:12,
      marketLabel: games.location
    };
  }

  goToDirections(){
   
    window.location = `geo:${this.map.lat}, ${this.map.lng};u=35`;
  }

}
