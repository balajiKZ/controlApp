import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';

import { LightHttpProvider } from '../../providers/light-http/light-http';
import { MusicHttpProvider } from '../../providers/music-http/music-http';
import { ScentHttpProvider } from '../../providers/scent-http/scent-http';
import { UrlsProvider } from '../../providers/urls/urls';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private lightStatus: boolean = true;
  private soundStatus: boolean = true;
  private scentStatus: boolean = true;
  private primaryDevice: string = 'raspMenMusic';
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
    frmt: 'wav',
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

  private nominalButtonColor = 'rgb(0,0,255)';
  private darkButtonColor = '#000099';
  private brightButtonColor = '#CCE5FF';


  constructor(public navCtrl: NavController, public http: HttpClient, public urlsProvider: UrlsProvider, public navParams: NavParams, private screenOrientation: ScreenOrientation, public lightProvider: LightHttpProvider, public musicProvider: MusicHttpProvider, public scentProvider: ScentHttpProvider) {

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    if (this.navParams.get('room') == "toilet1") {
      this.lightHistory.device = "raspMenMusic";
      this.musicHistory.device = "raspMenMusic";
      this.scentHistory.device = "raspMenMusic";
      this.primaryDevice = 'raspMenMusic';
      this.nominalButtonColor = 'rgb(0,0,255)';
      this.darkButtonColor = '#000099';
      this.brightButtonColor = '#CCE5FF';
    } else {
      this.lightHistory.device = "raspWomenMusic";
      this.musicHistory.device = "raspWomenMusic";
      this.scentHistory.device = "raspWomenMusic";
      this.primaryDevice = 'raspWomenMusic';
      this.nominalButtonColor = 'rgb(0,255,0)';
      this.darkButtonColor = '#17681d';
      this.brightButtonColor = '#c9f2cc';
    }
    this.updateUI();

  }

  updateUI() {
    let currentData
    let lightUrl = this.urlsProvider.getUrl(this.primaryDevice) + '/status';
    this.defaultLightButtonColors();
    this.defaultTrackButtonColors();
    this.defaultVolumeButtonColors();
    this.defaultIntensityButtonColors();
    this.http.get(lightUrl).subscribe(data => {
      currentData = data;
      if (currentData.light != null && currentData.light != undefined) {
        switch (currentData.light) {
          case 'off':
            this.lightStatus = false;
            this.whiteButton = this.disableButton;
            this.darkButton = this.disableButton;
            this.nominalButton = this.disableButton;
            this.brightButton = this.disableButton;
            break;
          case 'white':
            this.lightStatus = true;
            this.whiteButton = this.disableButton;
            this.lightHistory.color = 'white';
            break;
          case 'dark':
            this.lightStatus = true;
            this.darkButton = this.disableButton;
            this.lightHistory.color = 'dark';
            break;
          case 'bright':
            this.lightStatus = true;
            this.brightButton = this.disableButton;
            this.lightHistory.color = 'bright';
            break;
          case 'nominal':
            this.lightStatus = true;
            this.nominalButton = this.disableButton;
            this.lightHistory.color = 'nominal';
            break;
        }
        this.scentHistory.onTime = currentData.onTime;
        this.scentHistory.offTime = currentData.offTime;
        this.scentStatus = currentData.scentStatus;
        this.soundStatus = currentData.musicStatus;
        this.musicHistory.file = currentData.file;
        this.musicHistory.frmt = currentData.format;
        this.musicHistory.volume = currentData.volume;

        if (!this.scentStatus) {
          this.lowIntButton = this.disableButton;
          this.highIntButton = this.disableButton;
          this.medIntButton = this.disableButton;
        } else {
          if (this.scentHistory.onTime < 5) {
            this.lowIntButton = this.disableButton;
            this.scentHistory.level = 'low';
          } else if (this.scentHistory.onTime > 5 && this.scentHistory.onTime < 30) {
            this.medIntButton = this.disableButton;
            this.scentHistory.level = 'nominal';
          } else {
            this.highIntButton = this.disableButton;
            this.scentHistory.level = 'high';
          }
        }

        if (!this.soundStatus) {
          this.natureButton = this.disableButton;
          this.birdButton = this.disableButton;
          this.musicButton = this.disableButton;
          this.lowButton = this.disableButton;
          this.highButton = this.disableButton;
          this.medButton = this.disableButton;
        } else {
          if (this.musicHistory.file == "birds") {
            this.birdButton = this.disableButton;
          } else if (this.musicHistory.file == "instrumental") {
            this.natureButton = this.disableButton;
          } else if (this.musicHistory.file == "abba") {
            this.musicButton = this.disableButton;
          }

          if (this.musicHistory.volume < 0.3) {
            this.lowButton = this.disableButton;
          } else if (this.musicHistory.volume > 0.7) {
            this.highButton = this.disableButton;
          } else {
            this.medButton = this.disableButton;
          }
        }

      }
    }, err => { console.log('error'); })
  }

  toggle(item) {
    switch (item) {
      case 'light':
        this.defaultLightButtonColors();
        this.lightStatus = !this.lightStatus;
        if (this.lightStatus) {
          //his.lightProvider.changeHueLightColor(this.lightHistory.device, this.lightHistory.bri, this.lightHistory.sat, this.lightHistory.xy);
          this.lightProvider.changeColorEgloMulti(this.lightHistory.color, this.lightHistory.device);
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
          //this.lightProvider.turnOffHueLight(this.lightHistory.device);
          this.lightProvider.changeColorEgloMulti('off', this.lightHistory.device);
          this.whiteButton = this.disableButton;
          this.darkButton = this.disableButton;
          this.nominalButton = this.disableButton;
          this.brightButton = this.disableButton;
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
          if (this.musicHistory.file == "birds") {
            this.birdButton = this.disableButton;
          } else if (this.musicHistory.file == "instrumental") {
            this.natureButton = this.disableButton;
          } else if (this.musicHistory.file == "abba") {
            this.musicButton = this.disableButton;
          }
        } else {
          this.musicProvider.stopMusic(this.musicHistory.device);
          this.natureButton = this.disableButton;
          this.birdButton = this.disableButton;
          this.musicButton = this.disableButton;
          this.lowButton = this.disableButton;
          this.highButton = this.disableButton;
          this.medButton = this.disableButton;
        }
        break;
      case 'scent':
        this.defaultIntensityButtonColors();
        this.scentStatus = !this.scentStatus;
        if (this.scentStatus) {
          //this.scentProvider.changeTimer(this.scentHistory.device, this.scentHistory.cart, this.scentHistory.onTime, this.scentHistory.offTime);
          this.scentProvider.startEgloMulti(this.scentHistory.device, this.scentHistory.onTime, this.scentHistory.offTime);
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
          //this.scentProvider.stopTimer(this.scentHistory.device);
          this.scentProvider.stopEgloMulti(this.scentHistory.device);
          this.lowIntButton = this.disableButton;
          this.highIntButton = this.disableButton;
          this.medIntButton = this.disableButton;
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
          device: this.primaryDevice,
          color: 'white',
          bri: 251,
          sat: 251,
          xy: [0.3127, 0.329]
        };
        this.whiteButton = this.disableButton;
        break;
      case 'dark':
        this.lightHistory = {
          device: this.primaryDevice,
          color: 'dark',
          bri: 206,
          sat: 219,
          xy: [0.1966, 0.5625]
        };
        this.darkButton = this.disableButton;
        break;
      case 'nominal':
        this.lightHistory = {
          device: this.primaryDevice,
          color: 'nominal',
          bri: 251,
          sat: 120,
          xy: [0.2795, 0.4735]
        };
        this.nominalButton = this.disableButton;
        break;
      case 'bright':
        this.lightHistory = {
          device: this.primaryDevice,
          color: 'bright',
          bri: 251,
          sat: 81,
          xy: [0.3106, 0.3742]
        };
        this.brightButton = this.disableButton;
        break;
    }
    //this.lightProvider.changeHueLightColor(this.lightHistory.device, this.lightHistory.bri, this.lightHistory.sat, this.lightHistory.xy);
    this.lightProvider.changeColorEgloMulti(this.lightHistory.color, this.lightHistory.device);
  }

  //Change the song track
  changeTrack(type) {
    this.defaultTrackButtonColors();
    switch (type) {
      case 'bird':
        this.musicHistory = {
          device: this.primaryDevice,
          file: 'birds',
          frmt: 'wav',
          loop: true,
          volume: 0.4,
        }
        this.birdButton = this.disableButton;
        this.medButton = this.disableButton;
        break;
      case 'track1':
        this.musicHistory = {
          device: this.primaryDevice,
          file: 'instrumental',
          frmt: 'wav',
          loop: true,
          volume: 0.4,
        }
        this.natureButton = this.disableButton;
        this.medButton = this.disableButton;
        break;
      case 'track2':
        this.musicHistory = {
          device: this.primaryDevice,
          file: 'abba',
          frmt: 'mp3',
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
    //this.scentProvider.changeTimer(this.scentHistory.device, this.scentHistory.cart, this.scentHistory.onTime, this.scentHistory.offTime);
    this.scentProvider.startEgloMulti(this.scentHistory.device, this.scentHistory.onTime, this.scentHistory.offTime);
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
      bgColor: this.nominalButtonColor,
      border: '2px solid black',
      color: 'black',
      disabled: false
    }

    this.brightButton = {
      bgColor: this.brightButtonColor,
      border: '2px solid black',
      color: 'black',
      disabled: false
    }

    this.darkButton = {
      bgColor: this.darkButtonColor,
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
    this.lowButton = {
      bgColor: 'white',
      border: '2px solid black',
      color: 'black',
      disabled: false
    };
    this.medButton = {
      bgColor: 'white',
      border: '2px solid black',
      color: 'black',
      disabled: false
    };
    this.highButton = {
      bgColor: 'white',
      border: '2px solid black',
      color: 'black',
      disabled: false
    };
  }

  defaultIntensityButtonColors() {
    this.lowIntButton = {
      bgColor: 'white',
      border: '2px solid black',
      color: 'black',
      disabled: false
    };
    this.medIntButton = {
      bgColor: 'white',
      border: '2px solid black',
      color: 'black',
      disabled: false
    };
    this.highIntButton = {
      bgColor: 'white',
      border: '2px solid black',
      color: 'black',
      disabled: false
    };
  }

  //Function to navigate back to the previous page
  back() {
    this.navCtrl.pop();
  }

}
