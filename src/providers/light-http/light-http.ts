import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(public http: HttpClient, public urlsProvider: UrlsProvider) {
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

    this.http.put("http://" + lightUrl, payload)
      .subscribe(data => {
      }, err => {
        console.log(JSON.stringify(err));
      }
      );
  }

  //function to turn of hue light
  turnOffHueLight(device) {
    let payload = {
      on: false
    }

    let lightUrl = this.urlsProvider.getUrl(device)

    this.http.put("http://" + lightUrl, payload)
      .subscribe(data => {
      }, err => {
        console.log(err)
      }
      );
  }

}
