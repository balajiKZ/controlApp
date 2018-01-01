import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UrlsProvider } from '../urls/urls';

/*
  Generated class for the MusicHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MusicHttpProvider {

  constructor(public http: HttpClient, public urlProvider: UrlsProvider) {
    console.log('Hello MusicHttpProvider Provider');
  }

  // function to start the music in loop
  startMusicLoop(device, file, frmt) {
    let musicUrl = this.urlProvider.getUrl(device);
    this.http.post("http://" + musicUrl + "/start/music/loop?id=" + file + "&frmt=" + frmt, {})
      .subscribe(data => {
      }, err => {
        console.log("Error occured.")
      }
      );
  }

  // function to start the music without loop
  startMusic(device, file, frmt) {
    let musicUrl = this.urlProvider.getUrl(device);
    this.http.post("http://" + musicUrl + "/start/music?id=" + file + "&frmt=" + frmt, {})
      .subscribe(data => {
      }, err => {
        console.log("Error occured.")
      }
      );
  }

  //function to stop the music
  stopMusic(device) {
    let musicUrl = this.urlProvider.getUrl(device);
    this.http.post("http://" + musicUrl + "/stop/music", {})
      .subscribe(data => {
      }, err => {
        console.log("Error occured.")
      }
      );
  }

  //function to change the volume level
  changeVolume(device, level) {
    let musicUrl = this.urlProvider.getUrl(device);
    this.http.post("http://" + musicUrl + "/change/volume?level=" + level, {})
      .subscribe(data => {
      }, err => {
        console.log("Error occured.")
      }
      );
  }

  //function to get the info
  getInfo(device) {
    let musicUrl = this.urlProvider.getUrl(device);
    this.http.get("http://" + musicUrl + "/info", {})
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log("Error occured.")
      }
      );
  }
}
