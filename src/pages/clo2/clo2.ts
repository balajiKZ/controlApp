import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ScentHttpProvider } from '../../providers/scent-http/scent-http';

/**
 * Generated class for the Clo2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clo2',
  templateUrl: 'clo2.html',
})
export class Clo2Page {

  private buttonText: String = "ClO2 : ON";
  private proximityText: String = "Proximity : ON";
  private startTime: string = "22:00";
  private stopTime: string = "06:00";
  private proximityButton: any = {
    bgColor: 'white',
    border: '2px solid black',
    color: 'black'
  }
  private clo2Button: any = {
    bgColor: 'white',
    border: '2px solid black',
    color: 'black'
  }
  private access: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation, public scentProvider: ScentHttpProvider) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Clo2Page');
  }

  toggleClo2() {
    if (this.buttonText == 'ClO2 : ON') {
      this.buttonText = 'ClO2 : OFF';
      this.clo2Button = {
        bgColor: 'black',
        border: '2px solid white',
        color: 'white'
      }
      this.scentProvider.accessCartridge('dualWomen', 'cartridge2', 'on');
    } else {
      this.buttonText = 'ClO2 : ON';
      this.clo2Button = {
        bgColor: 'white',
        border: '2px solid black',
        color: 'black'
      }
      this.scentProvider.accessCartridge('dualWomen', 'cartridge2', 'off');
    }
  }

  toggleProximity() {
    if (this.proximityText == 'Proximity : ON') {
      this.proximityText = 'Proximity : OFF';
      this.proximityButton = {
        bgColor: 'black',
        border: '2px solid white',
        color: 'white'
      }
      this.scentProvider.accessCartridge('dualWomen', 'proxy', 'on');
    } else {
      this.proximityText = 'Proximity : ON';
      this.proximityButton = {
        bgColor: 'white',
        border: '2px solid black',
        color: 'black'
      }
      this.scentProvider.accessCartridge('dualWomen', 'proxy', 'off');
    }
  }

  timerChange() {
    let startTemp = parseInt(this.startTime.slice(0, 2)) - 1;
    let startStr
    if (startTemp > 9) {
      startStr = startTemp + this.startTime.slice(2) + ":00";
    } else {
      startStr = "0" + startTemp + this.startTime.slice(2) + ":00";
    }
    let stopTemp = parseInt(this.stopTime.slice(0, 2)) - 1;
    let stopStr
    if (stopTemp > 9) {
      stopStr = stopTemp + this.stopTime.slice(2) + ":00";
    } else {
      stopStr = "0" + stopTemp + this.stopTime.slice(2) + ":00";
    }
    this.scentProvider.accessWithUrl('dualWomen', '/clock', { start: startStr, stop: stopStr });
  }

}
