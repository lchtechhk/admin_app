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
import { AuthService } from '../services/AuthService';
import { ModalController, NavParams } from '@ionic/angular';
import { AddressComponent } from '../components/address/address.component';


CommonProvider
@Component({
  selector: 'profile-tab',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  private person_data : any = {};
  private customer_addresses : any = [];
  private home_icon : any = this.config.img_url+"home.png";
  private schedule_data : any;
  private backPath: any = '/home/profile';

  constructor(
    private AuthService : AuthService,
    private config : ConfigProvider,
    private ObjectUtils : ObjectUtils,
    private storage: Storage ,
    private datepipe: DatePipe,
    private navCtrl: NavController,
    private sharedDataProvider : SharedDataProvider,
    private uiProvider : UIProvider,
    private route: ActivatedRoute,
    public modalController: ModalController,
    private router: Router,

    ) {
    this.route.queryParams.subscribe(params => {
      if(params["signatureImage"] != undefined){
        this.person_data.user_signature = JSON.parse(params["signatureImage"]);
        this.uiProvider.presentLoadingDefault();
        // this.config.post(this.config.url+'save_user_signature','',{signature_image : this.person_data.user_signature, user_id : this.sharedDataProvider.person_id},(res:any)=>{
        //   if(!this.ObjectUtils.isEmptyField(res) && !this.ObjectUtils.isEmptyField(res.data) && res.status){
        //   }else {
        //     alert(JSON.stringify(res.data))
        //   }
        // }, (error:any) => {
        //   alert(JSON.stringify(error))
        // });
      }
    });

  }

  async ngOnInit(){
    this.person_data = await this.sharedDataProvider.get_storage_key("person_data");
    this.customer_addresses = await this.sharedDataProvider.get_storage_key("customer_address");
    if(!this.ObjectUtils.isEmptyField(this.person_data.picture)){
      this.person_data.picture = this.config.img_url+this.person_data.picture;
    }
  }

  async open_add_address_modal() {
    const modal = await this.modalController.create({
      component: AddressComponent,
      componentProps: {
        "operation" : "add",
        "backPath": this.backPath,
      },
      // cssClass: "wideModal"
    });
    return await modal.present();
  }

  async open_edit_address_modal(address) {
    const modal = await this.modalController.create({
      component: AddressComponent,
      componentProps: {
        "address": address,
        "operation" : "edit",
        "backPath": this.backPath,
      },
      // cssClass: "wideModal"
    });
    return await modal.present();
  }
  
  open_address_page(){
    console.log("open_address_page");
  }
  open_signature(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        destinationPage: "home/profile",
        },
        skipLocationChange: true
    };
    this.navCtrl.navigateForward("/signature",navigationExtras);
  }
  logout(){
    this.AuthService.logout();
  }

}
