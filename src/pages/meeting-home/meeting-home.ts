import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  private volume: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.themeName = this.navParams.get('room');
    if(this.themeName =="Light Theraphy"){
      this.meetingTheme = ! this.meetingTheme;
    }
    this.defaultToggleButton();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeetingHomePage');
  }

  toggle(data) {
    switch (data) {
      case 'main':
        if (this.toggleText == "OFF") {
          this.toggleText = "ON";
          this.toggleBtn = {
            bgColor: 'green',
            border: '2px solid white',
            color: 'white'
          }
        } else {
          this.toggleText = "OFF";
          this.toggleBtn = {
            bgColor: 'red',
            border: '2px solid white',
            color: 'white'
          }
        }
        break;
      case 'light':
        if (this.lightStatus) {

        } else {

        }
        this.lightStatus = !this.lightStatus;
        break;
      case 'scent':
        if (this.scentStatus) {

        } else {

        }
        this.scentStatus = !this.scentStatus;
        break;
      case 'sound':
        if (this.soundStatus) {

        } else {

        }
        this.soundStatus = !this.soundStatus;
        break;
    }
  }

  defaultToggleButton() {
    this.toggleBtn = {
      bgColor: 'green',
      border: '2px solid white',
      color: 'white'
    }
  }

}
