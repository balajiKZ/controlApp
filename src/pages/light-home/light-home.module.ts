import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LightHomePage } from './light-home';

@NgModule({
  declarations: [
    LightHomePage,
  ],
  imports: [
    IonicPageModule.forChild(LightHomePage),
  ],
})
export class LightHomePageModule {}
