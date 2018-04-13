import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  lat: number;
  lng: number;
  params: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.params = this.navParams.get("coords");
    this.params = this.params.replace("geo:", "");
    let array = this.params.split(",");
    this.lat = Number(array[0]);
    this.lng = Number(array[1]);
  }

  CloseModal() {
    this.viewCtrl.dismiss();
  }

}
