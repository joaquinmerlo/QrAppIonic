import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage, HistoryPage, MapPage, TabsPage } from '../pages/importPages.pages';
import { BarcodeScanner} from '@ionic-native/barcode-scanner'


@NgModule({
  declarations: [
    MyApp,
    HomePage, HistoryPage, MapPage, TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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

  ]
})
export class AppModule { }
