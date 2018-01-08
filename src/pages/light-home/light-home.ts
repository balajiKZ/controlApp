import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.defaultFuncButtonColors();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LightHomePage');
  }

  changeColor(color) {
    this.defaultFuncButtonColors();
    let body={
      WarmWhite:JSON.stringify(0),
      CoolWhite:JSON.stringify(1052),
      Red:JSON.stringify(0),
      Green:JSON.stringify(0),
      Blue:JSON.stringify(0)
    }
    switch (color) {
      case 'proj':
        this.lightHistory = this.projButton;
        this.projButton = this.disableButton;
        break;
      case 'read':
        this.lightHistory = this.readButton;
        this.readButton = this.disableButton;
        break;
      case 'therapy':
        this.lightHistory = this.therapyButton;
        this.therapyButton = this.disableButton;
        break;
      case 'brightRed':
        this.lightHistory = this.brightRed;
        this.brightRed = this.disableButton;
        break;
      case 'brightBlue':
        this.lightHistory = this.brightBlue;
        this.brightBlue = this.disableButton;
        break;
      case 'brightGreen':
        this.lightHistory = this.brightGreen;
        this.brightGreen = this.disableButton;
        break;
      case 'brightPurple':
        this.lightHistory = this.brightPurple;
        this.brightPurple = this.disableButton;
        break;
      case 'brightOrange':
        this.lightHistory = this.brightOrange;
        this.brightOrange = this.disableButton;
        break;
      case 'brightYellow':
        this.lightHistory = this.brightYellow;
        this.brightYellow = this.disableButton;
        break;
      case 'red':
        this.lightHistory = this.red;
        this.red = this.disableButton;
        break;
      case 'blue':
        this.lightHistory = this.blue;
        this.blue = this.disableButton;
        break;
      case 'green':
        this.lightHistory = this.green;
        this.green = this.disableButton;
        break;
      case 'purple':
        this.lightHistory = this.purple;
        this.purple = this.disableButton;
        break;
      case 'orange':
        this.lightHistory = this.orange;
        this.orange = this.disableButton;
        break;
      case 'yellow':
        this.lightHistory = this.yellow;
        this.yellow = this.disableButton;
        break;
      case 'darkRed':
        this.lightHistory = this.darkRed;
        this.darkRed = this.disableButton;
        break;
      case 'darkBlue':
        this.lightHistory = this.darkBlue;
        this.darkBlue = this.disableButton;
        break;
      case 'darkGreen':
        this.lightHistory = this.darkGreen;
        this.darkGreen = this.disableButton;
        break;
      case 'darkPurple':
        this.lightHistory = this.darkPurple;
        this.darkPurple = this.disableButton;
        break;
      case 'darkOrange':
        this.lightHistory = this.darkOrange;
        this.darkOrange = this.disableButton;
        break;
      case 'darkYellow':
        this.lightHistory = this.darkYellow;
        this.darkYellow = this.disableButton;
        break;
    }
  }

  defaultFuncButtonColors() {
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

}
