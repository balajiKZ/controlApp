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
    raspMenMusic: '192.168.1.105:5000/',
    hueLightMen: '192.168.1.52/api/RDYDu5Y6mpqAZaQjMkjjJ01zn0JcJW-1Dqqr5ts9/lights/1/state',
    hueLightWomen: '192.168.1.52/api/RDYDu5Y6mpqAZaQjMkjjJ01zn0JcJW-1Dqqr5ts9/lights/2/state'
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
