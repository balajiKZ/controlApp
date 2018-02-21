import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';

import { UrlsProvider } from '../urls/urls';

/*
  Generated class for the LightHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LightHttpProvider {

  constructor(public http: HttpClient, public urlsProvider: UrlsProvider, public alertCtrl: AlertController, ) {
    console.log('Hello LightHttpProvider Provider');
  }

  //function to change the hue light color
  changeHueLightColor(device, bri, sat, xy) {
    let payload = {
      on: true,
      bri: bri,
      xy: xy,
      sat: sat,
      colormode: "xy"
    }

    let lightUrl = this.urlsProvider.getUrl(device)

    this.http.put(lightUrl, payload)
      .subscribe(data => {
      }, err => {
        this.errorController(err);
      }
      );
  }

  errorController(err) {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: err.status,
      message: err.message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  //function to turn of hue light
  turnOffHueLight(device) {
    let payload = {
      on: false
    }

    let lightUrl = this.urlsProvider.getUrl(device)

    this.http.put(lightUrl, payload)
      .subscribe(data => {
      }, err => {
        this.errorController(err);
      }
      );
  }

  changeRoomLights(body) {
    let light1 = this.urlsProvider.getUrl('egloLight1');
    let light2 = this.urlsProvider.getUrl('egloLight2');
    let light3 = this.urlsProvider.getUrl('egloLight3');
    let light4 = this.urlsProvider.getUrl('egloLight4');
    let cool = body.WarmWhite;
    let warm = body.CoolWhite;
    let red = body.Red;
    let green = body.Green;
    let blue = body.Blue;
    let body1 = {
      WarmWhite: warm,
      CoolWhite: cool,
      Red: red,
      Blue: blue,
      Green: green
    };
    this.http.post(light1, body1)
      .subscribe(data => {
      }, err => {
        this.errorController(err);
      }
      );
    this.http.post(light2, body)
      .subscribe(data => {
      }, err => {
        this.errorController(err);
      }
      );
    this.http.post(light3, body)
      .subscribe(data => {
      }, err => {
        this.errorController(err);
      }
      );
    this.http.post(light4, body)
      .subscribe(data => {
      }, err => {
        this.errorController(err);
      }
      );

  }

  getlightStatus() {
    let light1 = this.urlsProvider.getUrl('egloLight1');
    let data;
    this.http.get(light1)
      .subscribe(data => {
      }, err => {
        this.errorController(err);
      }
      );
    return data;
  }

}
