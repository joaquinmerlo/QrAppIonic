
import { Injectable } from '@angular/core';
import { ScanData } from '../../models/ScanData.model'
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller'
import { MapPage } from '../../pages/importPages.pages'
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { Platform } from 'ionic-angular';

@Injectable()
export class HistoryProvider {

  private _history: ScanData[] = [];

  constructor(private inAppBrowser: InAppBrowser,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private contacts: Contacts,
    private platform: Platform) {
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
        this.modalCtrl.create(MapPage, { coords: scan.info }).present();
        break;
      case "vcard":
        this.CreateContact(scan.info);
        break;
      case "email":
        this.SendEmail(scan.info);
        break;
      default:
        this.ToastMessage("Error al abrir el scan.");
        console.log("Error al abrir el archivo.");
        break;
    }
  }

  LoadHistory() {
    return this._history;
  }

  CreateContact(txt: string) {
    let campos: any = this.parse_vcard(txt);
    console.log(campos);
    if (!this.platform.is('cordova')) {
      this.ToastMessage("No es posible guardar contacto estando en el navegador de la pc.");
      return;
    }

    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, campos.tel[0].value[0]);
    contact.phoneNumbers = [new ContactField('mobile', campos[0].value[0])];
    contact.save().then(
      () => this.ToastMessage("Contacto " + contact.name + " creado"),
      (error: any) => { this.ToastMessage("Error al crear contacto :("); console.error("Error:", error); }
    );

  }

  SendEmail(txt: string) {

    //Ver documentacion y actualizar. (email composer)
    txt = txt.replace("MATMSG:TO:", "mailto:");
    txt = txt.replace(";SUB:", "?subject=");
    txt = txt.replace(";BODY:", "&body=");
    txt = txt.replace(";;", "");
    txt = txt.replace(/ /g, "%20");

    console.log(txt);

    this.inAppBrowser.create(txt, "_system");
  }

  ToastMessage(txt: string) {
    this.toastCtrl.create({
      message: txt,
      position: "top",
      duration: 2000
    }).present()
  }

  private parse_vcard(input: string) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
      var results, key;

      if (Re1.test(line)) {
        results = line.match(Re1);
        key = results[1].toLowerCase();
        fields[key] = results[2];
      } else if (Re2.test(line)) {
        results = line.match(Re2);
        key = results[1].replace(ReKey, '').toLowerCase();

        var meta = {};
        results[2].split(';')
          .map(function (p, i) {
            var match = p.match(/([a-z]+)=(.*)/i);
            if (match) {
              return [match[1], match[2]];
            } else {
              return ["TYPE" + (i === 0 ? "" : i), p];
            }
          })
          .forEach(function (p) {
            meta[p[0]] = p[1];
          });

        if (!fields[key]) fields[key] = [];

        fields[key].push({
          meta: meta,
          value: results[3].split(';')
        })
      }
    });

    return fields;
  };
}
