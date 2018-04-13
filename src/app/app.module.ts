import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//Pages
import { HomePage, HistoryPage, MapPage, TabsPage } from '../pages/importPages.pages';
//plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { InAppBrowser } from '@ionic-native/in-app-browser';
//Providers
import { HistoryProvider } from '../providers/history/history';
//mapas
import { AgmCoreModule } from '@agm/core'


@NgModule({
  declarations: [
    MyApp,
    HomePage, HistoryPage, MapPage, TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBsXfEZMT4ndwUNQO63tMhRBbwMu73nrGE'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, HistoryPage, MapPage, TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen, BarcodeScanner,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HistoryProvider, InAppBrowser
  ]
})
export class AppModule { }
