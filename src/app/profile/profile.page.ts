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
import { OrderService } from '../services/OrderService';


CommonProvider
@Component({
  selector: 'profile-tab',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  public person_data: any = {};
  public customer_address: any = [];
  public orders: any = {};
  public backPath: any = '/home/profile';

  constructor(
    public AuthService: AuthService,
    public AddressService: AddressService,
    public OrderService: OrderService,
    public config: ConfigProvider,
    public ObjectUtils: ObjectUtils,
    public navCtrl: NavController,
    public sharedDataProvider: SharedDataProvider,
    public uiProvider: UIProvider,
    public route: ActivatedRoute,
    public modalController: ModalController,

  ) {
    this.route.queryParams.subscribe(async params => {
      if (params["signatureImage"] != undefined) {
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

  async ngOnInit() {
    await this.uiProvider.presentLoadingDefault();

    await this.queryParams();
    await this.getAllOrderRecord();

    await this.uiProvider.dismissLoadingDefault();
  }

  async go_pending_order_page() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        target: 'pending'
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.navCtrl.navigateForward("/order-record", navigationExtras);
    // console.log(JSON.stringify(this.orders.pending))
  }
  async go_complete_order_page() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        target: 'complete'
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.navCtrl.navigateForward("/order-record", navigationExtras);
    // console.log(JSON.stringify(this.orders.transport))
  }
  async go_cancel_order_page() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        target: 'cancel'
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.navCtrl.navigateForward("/order-record", navigationExtras);
  }
  async getAllOrderRecord() {
    const orders = await this.OrderService.getAllOrderRecord();
    if (orders.status && !this.ObjectUtils.isEmptyField(orders.data) && !this.ObjectUtils.isEmptyField(orders.data.orders)) {
      this.orders = orders.data.orders;
      // console.log("getAllOrderRecord : " + JSON.stringify(this.orders));
    }
  }

  async queryParams() {
    this.person_data = await this.sharedDataProvider.get_storage_key("person_data");
    this.customer_address = await this.sharedDataProvider.get_storage_key("customer_address");
    if (!this.ObjectUtils.isEmptyField(this.person_data.picture)) {
      this.person_data.picture = this.config.img_url + this.person_data.picture;
    }
    // console.log("person_data : " + JSON.stringify(this.person_data));
  }


  async open_add_address_modal() {
    let modal = await this.modalController.create({
      component: AddressComponent,
      componentProps: {
        "operation": "add",
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
        "operation": "edit",
        "backPath": this.backPath,
      },
      // cssClass: "wideModal"
    });
    await this.dismissModal(modal);
    return await modal.present();
  }

  async dismissModal(modal: any) {
    modal.onDidDismiss().then(async data => {
      await this.uiProvider.presentLoadingDefault();
      if (await this.AddressService.getAddressByToken()) {
        this.customer_address = await this.sharedDataProvider.get_storage_key("customer_address");
        console.log("customer_address : " + JSON.stringify(this.customer_address));
      }
      await this.uiProvider.dismissLoadingDefault();
    });
  }
  open_address_page() {
    console.log("open_address_page");
  }
  open_signature() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        destinationPage: "home/profile",
      },
      skipLocationChange: true
    };
    this.navCtrl.navigateForward("/signature", navigationExtras);
  }
  logout() {
    this.AuthService.logout();
  }

}
