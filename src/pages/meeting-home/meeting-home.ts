import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LightHttpProvider } from '../../providers/light-http/light-http';
import { MusicHttpProvider } from '../../providers/music-http/music-http';
import { ScentHttpProvider } from '../../providers/scent-http/scent-http';

/**
 * Generated class for the MeetingHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meeting-home',
  templateUrl: 'meeting-home.html',
})
export class MeetingHomePage {

  public themeName: string;
  public toggleText: string = "ON";
  private toggleBtn: any = {
  }
  public lightStatus: boolean = true;
  public scentStatus: boolean = true;
  public soundStatus: boolean = true;
  public meetingTheme: boolean = true;
  private bgColor: string = "blue";
  private volume: number = 4;
  private device: string = "";
  private musicDevice: string = "";
  private body: any = {
    WarmWhite: JSON.stringify(0),
    CoolWhite: JSON.stringify(0),
    Red: JSON.stringify(0),
    Green: JSON.stringify(0),
    Blue: JSON.stringify(0)
  }
  private bodyRead: any = {
    WarmWhite: JSON.stringify(400),
    CoolWhite: JSON.stringify(400),
    Red: JSON.stringify(0),
    Green: JSON.stringify(0),
    Blue: JSON.stringify(0)
  }
  private song: any = {
    file: '',
    frmt: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation, public musicProvider: MusicHttpProvider, public lightProvider: LightHttpProvider, public scentProvider: ScentHttpProvider) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.themeName = this.navParams.get('room');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeetingHomePage');
    if (this.themeName == "Light Theraphy") {
      this.meetingTheme = !this.meetingTheme;
      this.body.CoolWhite = JSON.stringify(1000);
      this.device = "liquid1";
      this.scentProvider.startTimer('liquid1');
      this.bgColor = "white";
    } else if (this.themeName == "Strategy Meeting") {
      this.body.CoolWhite = JSON.stringify(400);
      this.body.Blue = JSON.stringify(1000);
      this.device = "dualMain";
      this.song.file = 'blueSong';
      this.song.frmt = 'mp3';
      this.musicProvider.startMusicLoop('server', this.song.file, this.song.frmt);
      this.bgColor = "blue";
    } else if (this.themeName == "Deal-Closing Meeting") {
      this.body.CoolWhite = JSON.stringify(450);
      this.body.Red = JSON.stringify(1000);
      this.device = "liquid2";
      this.song.file = 'redSong';
      this.song.frmt = 'wav';
      this.musicProvider.startMusicLoop('server', this.song.file, this.song.frmt);
      this.bgColor = "red";
    }
    this.lightProvider.changeRoomLights(this.body);
    this.scentProvider.startTimer(this.device);
    this.defaultToggleButton();
  }

  toggle(data) {
    switch (data) {
      case 'main':
        if (this.toggleText == "OFF") {
          this.toggleText = "ON";
          this.lightProvider.changeRoomLights(this.body);
          this.scentProvider.startTimer(this.device);
          if (this.meetingTheme) {
            this.musicProvider.startMusicLoop('server', this.song.file, this.song.frmt);
          }
          this.scentStatus = true;
          this.soundStatus = true;
          this.lightStatus = true;
        } else {
          this.toggleText = "OFF";
          this.lightProvider.changeRoomLights(this.bodyRead);
          this.scentProvider.stopTimer(this.device);
          this.toggleBtn = {
            bgColor: 'indigo',
            border: '2px solid white',
            color: 'white'
          }
          if (this.meetingTheme) {
            this.musicProvider.stopMusic('server');
          }
          this.scentStatus = false;
          this.soundStatus = false;
          this.lightStatus = false;
        }
        break;
      case 'light':
        if (this.lightStatus) {
          this.lightProvider.changeRoomLights(this.bodyRead);
        } else {
          this.lightProvider.changeRoomLights(this.body);
        }
        this.lightStatus = !this.lightStatus;
        break;
      case 'scent':
        if (this.scentStatus) {
          this.scentProvider.stopTimer(this.device);
        } else {
          this.scentProvider.startTimer(this.device);
        }
        this.scentStatus = !this.scentStatus;
        break;
      case 'sound':
        if (this.soundStatus) {
          this.musicProvider.stopMusic('server');
        } else {
          this.musicProvider.startMusicLoop('server', this.song.file, this.song.frmt);
        }
        this.soundStatus = !this.soundStatus;
        break;
    }
  }

  defaultToggleButton() {
    this.toggleBtn = {
      bgColor: this.bgColor,
      border: '2px solid white',
      color: 'white'
    }
    if (this.themeName == "Light Theraphy") {
      this.toggleBtn.border = '2px solid black';
      this.toggleBtn.color = "black";
    }
  }

  volumeChange() {
    console.log('pinged');
    this.musicProvider.changeVolume('server', this.volume / 10);
  }

  //Function to navigate back to the previous page
  back() {
    this.lightProvider.changeRoomLights(this.bodyRead);
    this.scentProvider.stopTimer(this.device);
    if (this.meetingTheme) {
      this.musicProvider.stopMusic('server');
    }
    this.navCtrl.pop();
  }

}
