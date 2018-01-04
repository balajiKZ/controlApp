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
        this.http.put(ipAddress + '/time/blow/element', { 'element': cart }).subscribe(data => {
          // Next modify the time
          this.http.put(ipAddress + '/time/blow', { 'onTime': onTime, 'offTime': offTime })
            .subscribe(data => {
              //Activate the timer as requested
              let ip = ipAddress + "/timer/on";
              // POST to the state to the device
              var body = {};
              this.http.post(ip, body)
                .subscribe(data => {
                },
                err => {
                  this.errorController(err);
                });
            },
            err => {
              this.errorController(err);
            });
        },
          err => {
            this.errorController(err);
          });
      },
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
      subTitle: err,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
