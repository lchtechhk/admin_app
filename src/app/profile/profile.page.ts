import { Component } from '@angular/core';
import { CommonProvider } from '../providers/CommonProvider';
import { DatePipe } from '@angular/common'
import { NavController } from '@ionic/angular';

import { ConfigProvider } from '../providers/ConfigProvider';
import { SharedDataProvider } from '../providers/shared-data';
import { ObjectUtils } from '../providers/ObjectUtils';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { UIProvider } from '../providers/UIProvider';
import { AuthService } from '../services/AuthService';
import { ModalController } from '@ionic/angular';
import { AddressComponent } from '../components/address/address.component';
import { AddressService } from '../services/AddressService';


CommonProvider
@Component({
  selector: 'profile-tab',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  public person_data : any = {};
  public customer_address : any = [];
  public backPath: any = '/home/profile';

  constructor(
    public AuthService : AuthService,
    public AddressService : AddressService,
    public config : ConfigProvider,
    public ObjectUtils : ObjectUtils,
    public navCtrl: NavController,
    public sharedDataProvider : SharedDataProvider,
    public uiProvider : UIProvider,
    public route: ActivatedRoute,
    public modalController: ModalController,

    ) {
    this.route.queryParams.subscribe(async params => {
      if(params["signatureImage"] != undefined){
        this.person_data.user_signature = JSON.parse(params["signatureImage"]);
        await this.uiProvider.presentLoadingDefault();
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
    this.customer_address = await this.sharedDataProvider.get_storage_key("customer_address");
    if(!this.ObjectUtils.isEmptyField(this.person_data.picture)){
      this.person_data.picture = this.config.img_url+this.person_data.picture;
    }
    console.log("person_data : " + JSON.stringify(this.person_data));
    // console.log("customer_address : " + JSON.stringify(this.customer_address));

  }

  async open_add_address_modal() {
    let modal = await this.modalController.create({
      component: AddressComponent,
      componentProps: {
        "operation" : "add",
        "backPath": this.backPath,
      },
      // cssClass: "wideModal"
    });
    await this.dismissModal(modal);
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
    await this.dismissModal(modal);
    return await modal.present();
  }
  
  async dismissModal(modal:any){
    modal.onDidDismiss().then(async data=>{
      await this.uiProvider.presentLoadingDefault();
      if(await this.AddressService.getAddressByToken()){
        this.customer_address = await this.sharedDataProvider.get_storage_key("customer_address");
        console.log("customer_address : " + JSON.stringify(this.customer_address));
      }
      await this.uiProvider.dismissLoadingDefault();
    });
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
