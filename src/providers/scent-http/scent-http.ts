import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import { UrlsProvider } from '../urls/urls';

/*
  Generated class for the ScentHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScentHttpProvider {

  constructor(public http: HttpClient, public alertCtrl: AlertController, public urlsProvider: UrlsProvider) {
    console.log('Hello ScentHttpProvider Provider');
  }

  changeTimer(device, cart, onTime, offTime) {
    let ipAddress = this.urlsProvider.getUrl(device);
    this.http.post(ipAddress + "/timer/off", {})
      .subscribe(data => {
        this.http.post(ipAddress + '/timer/on', { 'timer': cart, 'onTime': onTime, 'offTime': offTime }).subscribe(data => {
        },
          err => {
            this.errorController(err);
          });
      },
        err => {
          this.errorController(err);
        });
  }

  startTimer(device) {
    let ipAddress = this.urlsProvider.getUrl(device);
    this.http.post(ipAddress + "/timer/on", {})
      .subscribe(data => { },
        err => {
          this.errorController(err);
        });
  }

  stopTimer(device) {
    let ipAddress = this.urlsProvider.getUrl(device);
    this.http.post(ipAddress + "/timer/off", {})
      .subscribe(data => { },
        err => {
          this.errorController(err);
        });
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

  accessCartridge(device, cartridge, state) {
    let ipAddress = this.urlsProvider.getUrl(device);
    this.http.post(ipAddress + '/' + cartridge + '/' + state, {})
      .subscribe(data => {

      },
        err => {
          this.errorController(err);
        });
  }

  accessWithUrl(device, content, body) {
    let ipAddress = this.urlsProvider.getUrl(device);
    this.http.put(ipAddress + content, body)
      .subscribe(data => {

      },
        err => {
          this.errorController(err);
        });
  }

  getData(device, content, body) {
    let ipAddress = this.urlsProvider.getUrl(device);
    let response;
    this.http.get(ipAddress + content, body)
      .subscribe(data => {
        response = data['response'];
      },
        err => {
          this.errorController(err);
        });
    return response;
  }

}
