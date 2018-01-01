import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LightHttpProvider } from '../../providers/light-http/light-http';
import { MusicHttpProvider } from '../../providers/music-http/music-http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private lightStatus: boolean = true;
  private soundStatus: boolean = true;
  private scentStatus: boolean = true;
  private whiteButton: any = {
  }
  private disableButton: any = {
    bgColor: 'black',
    border: '2px solid #ffffff',
    color: 'white',
    disabled: true
  }
  private nominalButton: any = {
  }
  private darkButton: any = {
  }
  private brightButton: any = {
  }
  private lightHistory: any = {
    device: 'hueLightMen',
    bri: 256,
    sat: 125,
    xy: [0.3127, 0.329]
  };
  private musicHistory: any = {
    device: 'raspMenMusic',
    file: 'birds',
    frmt: 'mp3',
    loop: true,
    volume: 4,
  };

  constructor(public navCtrl: NavController, private screenOrientation: ScreenOrientation, public lightProvider: LightHttpProvider, public musicProvider: MusicHttpProvider) {

    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.defaultLightButtonColors();

  }

  toggle(item) {
    switch (item) {
      case 'light':
        this.lightStatus = !this.lightStatus;
        if (this.lightStatus) {
          this.lightProvider.changeHueLightColor(this.lightHistory.device, this.lightHistory.bri, this.lightHistory.sat, this.lightHistory.xy);
        } else {
          this.lightProvider.turnOffHueLight(this.lightHistory.device);
        }
        break;
      case 'sound':
        this.soundStatus = !this.soundStatus;
        //Access the http to turn music on/off
        if (this.soundStatus) {
          if (this.musicHistory.loop) {
            this.musicProvider.startMusicLoop(this.musicHistory.device, this.musicHistory.file, this.musicHistory.frmt);
          } else {
            this.musicProvider.startMusic(this.musicHistory.device, this.musicHistory.file, this.musicHistory.frmt);
          }
        } else {
          this.musicProvider.stopMusic(this.musicHistory.device);
        }
        break;
      case 'scent':
        this.scentStatus = !this.scentStatus;
        break;
    }
  }

  changeColor(type) {

    this.defaultLightButtonColors();

    switch (type) {
      case 'white':
        this.lightHistory = {
          device: 'hueLightMen',
          bri: 251,
          sat: 251,
          xy: [0.3127, 0.329]
        };
        this.whiteButton = this.disableButton;
        break;
      case 'dark':
        this.lightHistory = {
          device: 'hueLightMen',
          bri: 206,
          sat: 219,
          xy: [0.1966, 0.5625]
        };
        this.darkButton = this.disableButton;
        break;
      case 'nominal':
        this.lightHistory = {
          device: 'hueLightMen',
          bri: 251,
          sat: 120,
          xy: [0.2795, 0.4735]
        };
        this.nominalButton = this.disableButton;
        break;
      case 'bright':
        this.lightHistory = {
          device: 'hueLightMen',
          bri: 251,
          sat: 81,
          xy: [0.3106, 0.3742]
        };
        this.brightButton = this.disableButton;
        break;
    }
    this.lightProvider.changeHueLightColor(this.lightHistory.device, this.lightHistory.bri, this.lightHistory.sat, this.lightHistory.xy);
  }

  defaultLightButtonColors() {
    this.whiteButton = {
      bgColor: 'white',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }

    this.nominalButton = {
      bgColor: 'rgb(0,255,0)',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }

    this.brightButton = {
      bgColor: 'rgb(180,255,189)',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }

    this.darkButton = {
      bgColor: 'rgb(0,109,2)',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
  }
}
