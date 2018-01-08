import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ScentHttpProvider } from '../../providers/scent-http/scent-http';
import { Chart } from 'chart.js';

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

  @ViewChild('lineCanvas') lineCanvas;

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
  lineChart: any;
  private chartData: number[] = [-0.13, -0.12, -0.13, -0.4, -0.2, 0, 0.5];
  private chartTime: any[] = ["02:11:01", "02:11:05", "02:11:08", "02:11:11", "02:11:15", "02:11:18", "02:11:21"];

  constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation, public scentProvider: ScentHttpProvider) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Clo2Page');

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: this.chartTime,
        datasets: [
          {
            label: "Clo2 Level",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.chartData,
            spanGaps: false,
          }
        ]
      }

    });

    var _this = this;

    setInterval(function(){ 
      var newNo=Math.floor(Math.random()*5)- 2.5;
      //var newNo=_this.scentProvider.getData('sensor', '/value', {});
      if(newNo != null && newNo != undefined){
        _this.chartData.shift();
        _this.chartData.push(newNo);
      }
      var time = new Date();
      _this.chartTime.shift();
      _this.chartTime.push(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
      _this.lineChart.update();
     }, 3000);
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
