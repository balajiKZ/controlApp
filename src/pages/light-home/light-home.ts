import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LightHttpProvider } from '../../providers/light-http/light-http';

/**
 * Generated class for the LightHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-light-home',
  templateUrl: 'light-home.html',
})
export class LightHomePage {

  private offButton: any = {
  }
  private projButton: any = {
  }
  private therapyButton: any = {
  }
  private readButton: any = {
  }
  private brightRed: any = {
  }
  private brightBlue: any = {
  }
  private brightGreen: any = {
  }
  private brightPurple: any = {
  }
  private brightOrange: any = {
  }
  private brightYellow: any = {
  }
  private red: any = {
  }
  private blue: any = {
  }
  private green: any = {
  }
  private purple: any = {
  }
  private orange: any = {
  }
  private yellow: any = {
  }
  private darkRed: any = {
  }
  private darkBlue: any = {
  }
  private darkGreen: any = {
  }
  private darkPurple: any = {
  }
  private darkOrange: any = {
  }
  private darkYellow: any = {
  }
  private disableButton: any = {
    bgColor: 'black',
    border: '2px solid #ffffff',
    color: 'white',
    disabled: true
  }
  private lightHistory: any = {
    bgColor: 'black',
    border: '2px solid #ffffff',
    color: 'white',
    disabled: true
  };

  constructor(public navCtrl: NavController, private screenOrientation: ScreenOrientation, public navParams: NavParams, public lightProvider: LightHttpProvider) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.defaultFuncButtonColors();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LightHomePage');
  }

  changeColor(color) {
    this.defaultFuncButtonColors();
    let body = {
      WarmWhite: JSON.stringify(0),
      CoolWhite: JSON.stringify(0),
      Red: JSON.stringify(0),
      Green: JSON.stringify(0),
      Blue: JSON.stringify(0)
    }
    switch (color) {
      case 'off':
        this.offButton = this.disableButton;
        this.lightHistory = this.offButton;
        break;
      case 'proj':
        body.CoolWhite = JSON.stringify(100);
        this.lightHistory = this.projButton;
        this.projButton = this.disableButton;
        break;
      case 'read':
        body.WarmWhite = JSON.stringify(400);
        body.CoolWhite = JSON.stringify(400);
        this.lightHistory = this.readButton;
        this.readButton = this.disableButton;
        break;
      case 'therapy':
        body.CoolWhite = JSON.stringify(1000);
        this.lightHistory = this.therapyButton;
        this.therapyButton = this.disableButton;
        break;
      case 'brightRed':
        body.CoolWhite = JSON.stringify(450);
        body.Red = JSON.stringify(1000);
        this.lightHistory = this.brightRed;
        this.brightRed = this.disableButton;
        break;
      case 'brightBlue':
        body.CoolWhite = JSON.stringify(400);
        body.Blue = JSON.stringify(1000);
        this.lightHistory = this.brightBlue;
        this.brightBlue = this.disableButton;
        break;
      case 'brightGreen':
        body.CoolWhite = JSON.stringify(450);
        body.Green = JSON.stringify(1000);
        this.lightHistory = this.brightGreen;
        this.brightGreen = this.disableButton;
        break;
      case 'brightPurple':
        body.CoolWhite = JSON.stringify(200);
        body.Red = JSON.stringify(200);
        body.Blue = JSON.stringify(550);
        this.lightHistory = this.brightPurple;
        this.brightPurple = this.disableButton;
        break;
      case 'brightOrange':
        body.CoolWhite = JSON.stringify(400);
        body.Red = JSON.stringify(1000);
        body.Green = JSON.stringify(510);
        this.lightHistory = this.brightOrange;
        this.brightOrange = this.disableButton;
        break;
      case 'brightYellow':
        body.CoolWhite = JSON.stringify(450);
        body.Red = JSON.stringify(1000);
        body.Green = JSON.stringify(1000);
        this.lightHistory = this.brightYellow;
        this.brightYellow = this.disableButton;
        break;
      case 'red':
        body.Red = JSON.stringify(1000);
        this.lightHistory = this.red;
        this.red = this.disableButton;
        break;
      case 'blue':
        body.Blue = JSON.stringify(1000);
        this.lightHistory = this.blue;
        this.blue = this.disableButton;
        break;
      case 'green':
        body.Green = JSON.stringify(1000);
        this.lightHistory = this.green;
        this.green = this.disableButton;
        break;
      case 'purple':
        body.Red = JSON.stringify(200);
        body.Blue = JSON.stringify(550);
        this.lightHistory = this.purple;
        this.purple = this.disableButton;
        break;
      case 'orange':
        body.Red = JSON.stringify(1000);
        body.Green = JSON.stringify(510);
        this.lightHistory = this.orange;
        this.orange = this.disableButton;
        break;
      case 'yellow':
        body.Red = JSON.stringify(1000);
        body.Green = JSON.stringify(1000);
        this.lightHistory = this.yellow;
        this.yellow = this.disableButton;
        break;
      case 'darkRed':
        body.Red = JSON.stringify(550);
        this.lightHistory = this.darkRed;
        this.darkRed = this.disableButton;
        break;
      case 'darkBlue':
        body.Blue = JSON.stringify(450);
        this.lightHistory = this.darkBlue;
        this.darkBlue = this.disableButton;
        break;
      case 'darkGreen':
        body.Green = JSON.stringify(200);
        this.lightHistory = this.darkGreen;
        this.darkGreen = this.disableButton;
        break;
      case 'darkPurple':
        body.Red = JSON.stringify(175);
        body.Blue = JSON.stringify(175);
        this.lightHistory = this.darkPurple;
        this.darkPurple = this.disableButton;
        break;
      case 'darkOrange':
        body.Red = JSON.stringify(800);
        body.Green = JSON.stringify(200);
        this.lightHistory = this.darkOrange;
        this.darkOrange = this.disableButton;
        break;
      case 'darkYellow':
        body.Red = JSON.stringify(510);
        body.Green = JSON.stringify(510);
        this.lightHistory = this.darkYellow;
        this.darkYellow = this.disableButton;
        break;
    }
    this.lightProvider.changeRoomLights(body);
  }

  defaultFuncButtonColors() {
    this.offButton = {
      bgColor: 'royalblue',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.projButton = {
      bgColor: '#CACACA',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.therapyButton = {
      bgColor: 'white',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.readButton = {
      bgColor: '#FCFFD5',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.brightRed = {
      bgColor: '#FFE8E8',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.brightBlue = {
      bgColor: '#EBE8FF',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.brightGreen = {
      bgColor: '#E8FFEA',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.brightPurple = {
      bgColor: '#F8E8FF',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.brightOrange = {
      bgColor: '#FFF3D4',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.brightYellow = {
      bgColor: '#FCFFD5',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.red = {
      bgColor: 'red',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.blue = {
      bgColor: 'blue',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.green = {
      bgColor: 'green',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.purple = {
      bgColor: 'purple',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.orange = {
      bgColor: 'orange',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.yellow = {
      bgColor: 'yellow',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.darkRed = {
      bgColor: 'darkred',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.darkBlue = {
      bgColor: 'darkblue',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.darkGreen = {
      bgColor: 'darkgreen',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.darkPurple = {
      bgColor: 'indigo',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.darkOrange = {
      bgColor: 'darkorange',
      border: '2px solid black',
      color: 'black',
      disabled: false
    }
    this.darkYellow = {
      bgColor: 'gold',
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
