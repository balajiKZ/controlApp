import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Clo2Page } from '../clo2/clo2';
import { HomePage } from '../home/home';
import { LightHomePage } from '../light-home/light-home';
import { MeetingHomePage } from '../meeting-home/meeting-home';
import { Chart } from 'chart.js';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  private toilet1: string = 'icon-toilet';
  private toilet2: string = 'icon-toilet';
  private meeting: string = 'icon-meeting';
  private toilet1Color: string = 'danger';
  private toilet2Color: string = 'danger';
  private meetingColor: string = 'danger';

  constructor(public navCtrl: NavController, private screenOrientation: ScreenOrientation, public navParams: NavParams) {

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  navigate(room, type, fab: FabContainer) {
    switch (room) {
      case 'toilet1':
        if (type == 'scent') {
          this.toilet1Color = 'primary';
          this.toilet1 = 'icon-scent-all';
          this.navCtrl.push(HomePage, { room: 'toilet1' });
        } else {
          this.toilet1Color = 'secondary';
          this.toilet1 = 'icon-alcohol';
          this.navCtrl.push(Clo2Page, { room: 'toilet1' });
        }
        break;
      case 'toilet2':
        if (type == 'scent') {
          this.toilet2Color = 'primary';
          this.toilet2 = 'icon-scent-all';
          this.navCtrl.push(HomePage, { room: 'toilet2' });
        } else {
          this.toilet2Color = 'secondary';
          this.toilet2 = 'icon-alcohol';
          this.navCtrl.push(Clo2Page, { room: 'toilet2' });
        }
        break;
      case 'light':
        this.meetingColor = 'secondary';
        this.meeting = 'icon-light';
        this.navCtrl.push(LightHomePage);
        break;
      case 'meeting':
        if (type == 'blue') {
          this.meetingColor = 'primary';
          this.meeting = 'icon-meeting';
          this.navCtrl.push(MeetingHomePage, { room: 'Strategy Meeting' });
        } else if (type == 'red') {
          this.meetingColor = 'danger';
          this.meeting = 'icon-meeting';
          this.navCtrl.push(MeetingHomePage, { room: 'Deal-Closing Meeting' });
        }else if (type == 'therapy') {
          this.meetingColor = 'light';
          this.meeting = 'icon-meeting';
          this.navCtrl.push(MeetingHomePage, { room: 'Light Theraphy' });
        }
        break;
    }

    fab.close();
  }

}
