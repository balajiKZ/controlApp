import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LightHttpProvider } from '../../providers/light-http/light-http';
import { MusicHttpProvider } from '../../providers/music-http/music-http';
import { ScentHttpProvider } from '../../providers/scent-http/scent-http';

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
  private birdButton: any = {
  }
  private natureButton: any = {
  }
  private musicButton: any = {
  }
  private lowButton: any = {
  }
  private medButton: any = {
  }
  private highButton: any = {
  }
  private lowIntButton: any = {
  }
  private medIntButton: any = {
  }
  private highIntButton: any = {
  }
  private lightHistory: any = {
    device: 'hueLightMen',
    color: 'white',
    bri: 256,
    sat: 125,
    xy: [0.3127, 0.329]
  };

  private musicHistory: any = {
    device: 'raspMenMusic',
    level: 'nominal',
    file: 'birds',
    frmt: 'mp3',
    loop: true,
    volume: 0.4,
  };

  private scentHistory: any = {
    device: 'dualMen',
    level: 'nominal',
    cart: 'cart2',
    onTime: 10,
    offTime: 50
  }

  constructor(public navCtrl: NavController, private screenOrientation: ScreenOrientation, public lightProvider: LightHttpProvider, public musicProvider: MusicHttpProvider, public scentProvider: ScentHttpProvider) {

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.defaultLightButtonColors();
    this.defaultTrackButtonColors();
    this.defaultVolumeButtonColors();
    this.defaultIntensityButtonColors();

  }

  toggle(item) {
    switch (item) {
      case 'light':
        this.defaultLightButtonColors();
        this.lightStatus = !this.lightStatus;
        if (this.lightStatus) {
          this.lightProvider.changeHueLightColor(this.lightHistory.device, this.lightHistory.bri, this.lightHistory.sat, this.lightHistory.xy);
          switch (this.lightHistory.color) {
            case 'white':
              this.whiteButton = this.disableButton;
              break;
            case 'dark':
              this.darkButton = this.disableButton;
              break;
            case 'nominal':
              this.nominalButton = this.disableButton;
              break;
            case 'bright':
              this.brightButton = this.disableButton;
              break;
          }
        } else {
          this.lightProvider.turnOffHueLight(this.lightHistory.device);
        }
        break;
      case 'sound':
        this.defaultTrackButtonColors();
        this.defaultVolumeButtonColors();
        this.soundStatus = !this.soundStatus;
        //Access the http to turn music on/off
        if (this.soundStatus) {
          if (this.musicHistory.loop) {
            this.musicProvider.startMusicLoop(this.musicHistory.device, this.musicHistory.file, this.musicHistory.frmt);
          } else {
            this.musicProvider.startMusic(this.musicHistory.device, this.musicHistory.file, this.musicHistory.frmt);
          }
          switch (this.musicHistory.level) {
            case 'low':
              this.lowButton = this.disableButton;
              break;
            case 'nominal':
              this.medButton = this.disableButton;
              break;
            case 'high':
              this.highButton = this.disableButton;
              break;
          }
        } else {
          this.musicProvider.stopMusic(this.musicHistory.device);
        }
        break;
      case 'scent':
        this.defaultIntensityButtonColors();
        this.scentStatus = !this.scentStatus;
        if (this.scentStatus) {
          this.scentProvider.changeTimer(this.scentHistory.device, this.scentHistory.cart, this.scentHistory.onTime, this.scentHistory.offTime);
          switch (this.scentHistory.level) {
            case 'low':
              this.lowIntButton = this.disableButton;
              break;
            case 'nominal':
              this.medIntButton = this.disableButton;
              break;
            case 'high':
              this.highIntButton = this.disableButton;
              break;
          }
        } else {
          this.scentProvider.stopTimer(this.scentHistory.device);
        }
        break;
    }
  }

  // Change the light color
  changeColor(type) {

    this.defaultLightButtonColors();

    switch (type) {
      case 'white':
        this.lightHistory = {
          device: 'hueLightMen',
          color: 'white',
          bri: 251,
          sat: 251,
          xy: [0.3127, 0.329]
        };
        this.whiteButton = this.disableButton;
        break;
      case 'dark':
        this.lightHistory = {
          device: 'hueLightMen',
          color: 'dark',
          bri: 206,
          sat: 219,
          xy: [0.1966, 0.5625]
        };
        this.darkButton = this.disableButton;
        break;
      case 'nominal':
        this.lightHistory = {
          device: 'hueLightMen',
          color: 'nominal',
          bri: 251,
          sat: 120,
          xy: [0.2795, 0.4735]
        };
        this.nominalButton = this.disableButton;
        break;
      case 'bright':
        this.lightHistory = {
          device: 'hueLightMen',
          color: 'bright',
          bri: 251,
          sat: 81,
          xy: [0.3106, 0.3742]
        };
        this.brightButton = this.disableButton;
        break;
    }
    this.lightProvider.changeHueLightColor(this.lightHistory.device, this.lightHistory.bri, this.lightHistory.sat, this.lightHistory.xy);
  }

  //Change the song track
  changeTrack(type) {
    this.defaultTrackButtonColors();
    switch (type) {
      case 'bird':
        this.musicHistory = {
          device: 'raspMenMusic',
          file: 'birds',
          frmt: 'wav',
          loop: true,
          volume: 0.4,
        }
        this.birdButton = this.disableButton;
        this.medButton = this.disableButton;
        break;
      case 'nature':
        this.musicHistory = {
          device: 'raspMenMusic',
          file: 'Forest',
          frmt: 'wav',
          loop: true,
          volume: 0.4,
        }
        this.natureButton = this.disableButton;
        this.medButton = this.disableButton;
        break;
      case 'music':
        this.musicHistory = {
          device: 'raspMenMusic',
          file: 'music',
          frmt: 'wav',
          loop: true,
          volume: 0.4,
        }
        this.musicButton = this.disableButton;
        this.medButton = this.disableButton;
        break;
    }
    this.musicProvider.startMusicLoop(this.musicHistory.device, this.musicHistory.file, this.musicHistory.frmt);
  }

  //Change the Volume
  changeVolume(type) {
    this.defaultVolumeButtonColors();
    switch (type) {
      case 'low':
        this.musicHistory.volume = 0.2;
        this.musicHistory.level = 'low';
        this.lowButton = this.disableButton;
        break;
      case 'med':
        this.musicHistory.volume = 0.4;
        this.musicHistory.level = 'nominal';
        this.medButton = this.disableButton;
        break;
      case 'high':
        this.musicHistory.volume = 0.8;
        this.musicHistory.level = 'high';
        this.highButton = this.disableButton;
        break;
    }
    this.musicProvider.changeVolume(this.musicHistory.device, this.musicHistory.volume);
  }

  //Change scent Intensity
  changeIntensity(type) {
    this.defaultIntensityButtonColors();
    switch (type) {
      case 'low':
        this.scentHistory.level = 'low';
        this.scentHistory.onTime = 2;
        this.scentHistory.offTime = 58;
        this.lowIntButton = this.disableButton;
        break;
      case 'med':
        this.scentHistory.level = 'nominal';
        this.scentHistory.onTime = 10;
        this.scentHistory.offTime = 50;
        this.medIntButton = this.disableButton;
        break;
      case 'high':
        this.scentHistory.level = 'high';
        this.scentHistory.onTime = 30;
        this.scentHistory.offTime = 30;
        this.highIntButton = this.disableButton;
        break;
    }
    this.scentProvider.changeTimer(this.scentHistory.device, this.scentHistory.cart, this.scentHistory.onTime, this.scentHistory.offTime);
  }

  //======================Default Value Functions===============================//

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

  defaultTrackButtonColors() {
    this.natureButton = this.birdButton = this.musicButton = {
      bgColor: 'white',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
  }

  defaultVolumeButtonColors() {
    this.lowButton = this.medButton = this.highButton = {
      bgColor: 'white',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
  }

  defaultIntensityButtonColors() {
    this.lowIntButton = this.medIntButton = this.highIntButton = {
      bgColor: 'white',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
  }

  //Function to navigate back to the previous page
  back() {
    this.navCtrl.pop();
  }

}
