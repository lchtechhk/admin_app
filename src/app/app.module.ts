import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { DatePipe } from '@angular/common'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonProvider } from './providers/CommonProvider';
import { ObjectUtils } from './providers/ObjectUtils';
import { ConfigProvider } from './providers/ConfigProvider';
import { UIProvider } from './providers/UIProvider';
import { SharedDataProvider } from './providers/shared-data';
import { AuthService } from './services/AuthService';

import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
// import { FCM } from '@ionic-native/fcm/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
     IonicModule.forRoot(),
     IonicStorageModule.forRoot(),
      AppRoutingModule],  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    ObjectUtils,
    ConfigProvider,
    UIProvider,
    SharedDataProvider,
    CommonProvider,
    AuthService,
    // FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
