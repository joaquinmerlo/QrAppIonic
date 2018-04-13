
import { Injectable } from '@angular/core';
import { ScanData } from '../../models/ScanData.model'
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller'
import { MapPage } from '../../pages/importPages.pages'

@Injectable()
export class HistoryProvider {

  private _history: ScanData[] = [];

  constructor(private inAppBrowser: InAppBrowser, private toasCtrl: ToastController,private modalCtrl:ModalController) {
    
  }

  AddToHistory(text: string) {
    let newScan = new ScanData(text);
    this._history.unshift(newScan);
    console.log(newScan);
    this.OpenScan(0);
  }

  OpenScan(index: number) {
    let scan = this._history[index];
    switch (scan.type) {
      case "http":
        this.inAppBrowser.create(scan.info, "_system");
        break;
      case "geo":
        this.modalCtrl.create(MapPage,{coords:scan.info}).present();
        break;
      default:
        this.toasCtrl.create({
          message: "Error al abrir el scan.",
          position: "top",
          duration: 2000
        }).present();
        console.log("Error al abrir el archivo.");
        break;
    }
  }

  LoadHistory() {
    return this._history;
  }

}
