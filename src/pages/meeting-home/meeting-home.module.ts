import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetingHomePage } from './meeting-home';

@NgModule({
  declarations: [
    MeetingHomePage,
  ],
  imports: [
    IonicPageModule.forChild(MeetingHomePage),
  ],
})
export class MeetingHomePageModule {}
