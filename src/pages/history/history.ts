import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScanData } from '../../models/ScanData.model';
import { HistoryProvider}  from '../../providers/history/history'
/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  private scans:ScanData[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private historyProvider:HistoryProvider) {
  }

  ionViewDidLoad() {
    this.scans = this.historyProvider.LoadHistory();
  }

  OpenScan(index:number){
    this.historyProvider.OpenScan(index);
  }
}
