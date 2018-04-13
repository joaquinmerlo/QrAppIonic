import { Component } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { HistoryProvider } from '../../providers/history/history'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public toast: ToastController, private platform: Platform, private barcodeScanner: BarcodeScanner, private historyProvider:HistoryProvider) {

  }

  showMessage(msg: string) {
    this.toast.create({ message: msg, duration: 2500, position: "top" }).present();
  }

  Scan() {
    console.log("Iniciando Scan");

    if (!this.platform.is('cordova')) {
      this.historyProvider.AddToHistory("geo:-32.87701859465277,-68.84461440552252");
      return;
    }    
    this.barcodeScanner.scan().then(
      (scanData) => {
        console.log("Result: " + scanData.text);
        console.log("Formato: " + scanData.format);
        console.log("Cancelled: " + scanData.cancelled);
        if (scanData.cancelled != true && scanData.text != null) {          
          this.historyProvider.AddToHistory(scanData.text);
        }
      }, (err) => {
        console.error(err);
        this.showMessage(err);
      }
    );
  }
}
