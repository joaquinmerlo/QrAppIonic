import { Component } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public toast: ToastController, private platform: Platform, private barcodeScanner: BarcodeScanner) {

  }



  showMessage(msg: string) {
    this.toast.create({ message: msg, duration: 2500, position: "top" }).present();
  }

  Scan() {
    console.log("Iniciando Scan");
    this.barcodeScanner.scan().then(
      (scanData) => {
        console.log("Result: " + scanData.text);
        console.log("Formato: " + scanData.format);
        console.log("Cancelled: " + scanData.cancelled);
      }, (err) => {
        console.error(err);
        this.showMessage(err);
      }
    );
  }
}
