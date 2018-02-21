import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UrlsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UrlsProvider {

  private urlList: any = {
    raspMenMusic: 'http://192.168.1.195:5000',
    dualMen: 'http://192.168.1.169:80',
    dualWomen: 'http://192.168.1.237:80',
    dualMain: 'http://192.168.1.21:80',
    sensor: 'http://192.168.1.153:80',
    hueLightMen: 'http://192.168.1.52/api/RDYDu5Y6mpqAZaQjMkjjJ01zn0JcJW-1Dqqr5ts9/lights/1/state',
    hueLightWomen: 'http://192.168.1.52/api/RDYDu5Y6mpqAZaQjMkjjJ01zn0JcJW-1Dqqr5ts9/lights/2/state',
    egloLight1: 'http://192.168.1.54/rgb',
    egloLight2: 'http://192.168.1.216/rgb',
    egloLight3: 'http://192.168.1.91/rgb',
    egloLight4: 'http://192.168.1.99/rgb',
    liquid1: 'http://192.168.1.51',
    liquid2: 'http://192.168.1.57',
    server: 'http://38179677.ngrok.io'
  }

  constructor(public http: HttpClient) {
    console.log('Hello UrlsProvider Provider');
  }

  //function to get the url
  getUrl(id) {
    return this.urlList[id];
  }

  //function to write the url
  setUrl(id, value) {
    this.urlList[id] = value;
  }


}
