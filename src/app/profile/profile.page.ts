import { Component } from '@angular/core';
import { CommonProvider } from '../providers/CommonProvider';
import { DatePipe } from '@angular/common'
import * as moment from 'moment';
import { NavController } from '@ionic/angular';

import { ConfigProvider } from '../providers/ConfigProvider';
import { SharedDataProvider } from '../providers/shared-data';
import { ObjectUtils } from '../providers/ObjectUtils';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { UIProvider } from '../providers/UIProvider';


CommonProvider
@Component({
  selector: 'profile-tab',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  person_data : any;
  public schedule_data : any;

  constructor(private config : ConfigProvider,
    private ObjectUtils : ObjectUtils,
    private storage: Storage ,
    private datepipe: DatePipe,
    private navCtrl: NavController,
    private sharedDataProvider : SharedDataProvider,
    private uiProvider : UIProvider,
    private route: ActivatedRoute,) {
    this.person_data = sharedDataProvider.person_data;

    this.route.queryParams.subscribe(params => {
      if(params["signatureImage"] != undefined){
        this.person_data.user_signature = JSON.parse(params["signatureImage"]);
        this.uiProvider.presentLoadingDefault();
        this.config.post(this.config.url+'save_user_signature','',{signature_image : this.person_data.user_signature, user_id : this.sharedDataProvider.person_id},(res:any)=>{
          this.uiProvider.dismissLoadingDefault();
          if(!this.ObjectUtils.isEmptyField(res) && !this.ObjectUtils.isEmptyField(res.data) && res.status){
          }else {
            alert(JSON.stringify(res.data))
          }
        }, (error:any) => {
          this.uiProvider.dismissLoadingDefault();
          alert(JSON.stringify(error))
        });
      }
    });

  }

  open_signature(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        destinationPage: "home/profile",
        }
    };
    this.navCtrl.navigateForward("/signature",navigationExtras);
  }
  logout(){
    this.sharedDataProvider.logout();
  }

}
