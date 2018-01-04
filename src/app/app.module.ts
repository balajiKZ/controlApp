import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { UrlsProvider } from '../providers/urls/urls';
import { LightHttpProvider } from '../providers/light-http/light-http';
import { MusicHttpProvider } from '../providers/music-http/music-http';
import { ScentHttpProvider } from '../providers/scent-http/scent-http';

@NgModule({
  declarations: [
    MyApp,
    MainPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UrlsProvider,
    LightHttpProvider,
    MusicHttpProvider,
    ScentHttpProvider
  ]
})
export class AppModule { }
