import { Component, Output, EventEmitter, OnInit, Input, OnChanges } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ConfigProvider } from '../../providers/ConfigProvider';
import { ToastService } from '../../services/ToastService';
import { SharedDataProvider } from '../../providers/shared-data';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { IonicSelectableComponent } from 'ionic-selectable';
import { AddressService } from '../../services/AddressService';
import { Subscription } from 'rxjs';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { addressModel } from './models/addressModel';
import { postModel } from './models/postModel';

import { ObjectUtils } from '../../providers/ObjectUtils';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  private address_detail = new addressModel;
  private postModel = new postModel;
  private address_list;
  private portsSubscription: Subscription;
  private todo: FormGroup;
  private page_operation;
  private isToggled = false;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public config: ConfigProvider,
    private toastCtrl: ToastService,
    private sharedDataProvider: SharedDataProvider,
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private AddressService: AddressService,
    private ObjectUtils : ObjectUtils,

  ) {
  }

  async addAddress() {
    this.postModel = new postModel;
    this.postModel.district_id =  this.address_detail.address_option.district_id;
    this.postModel.phone = this.address_detail.phone;
    this.postModel.company = this.address_detail.company;
    this.postModel.estate = this.address_detail.estate;
    this.postModel.building = this.address_detail.building;
    this.postModel.room = this.address_detail.room;
    this.postModel.is_default = this.address_detail.is_default;
    const result = await this.AddressService.addCustomerAddress(this.postModel);
    if(result){
      const onClosedData: string = "Wrapped Up!";
      this.modalController.dismiss(onClosedData);
    }
  }

  async updateAddress() {
    console.log("updateAddress : " + JSON.stringify(this.address_detail));
    this.postModel = new postModel;
    this.postModel.id = this.address_detail.id;
    this.postModel.phone = this.address_detail.phone;
    this.postModel.district_id =  this.address_detail.district_id;
    this.postModel.company = this.address_detail.company;
    this.postModel.estate = this.address_detail.estate;
    this.postModel.building = this.address_detail.building;
    this.postModel.room = this.address_detail.room;
    this.postModel.is_default = this.address_detail.is_default;


    const result = await this.AddressService.updateCustomerAddress(this.postModel);
    if(result){
      const onClosedData: string = "Wrapped Up!";
      this.modalController.dismiss(onClosedData);
    }
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('portChange:', event.value);
  }
  async ngOnInit() {
    this.address_list = await this.AddressService.listingAllDistract();
    // console.log("address_list : " + JSON.stringify(this.address_list));


    this.page_operation = this.navParams.data.operation;
    
    if(!this.ObjectUtils.isEmptyField(this.navParams.data.address)){
      this.address_detail = this.navParams.data.address;
      let district_id = this.address_detail.district_id;
      this.address_list.forEach(element => {
        let d_id = element.district_id;
        if (district_id == d_id) {
          this.address_detail.address_option = element;
        }
      });
    }
    if(this.address_detail.is_default == 'yes'){
      this.isToggled = true;
    }else {
      this.isToggled = false;
    }
  }

  pop() {
    const onClosedData: string = "Wrapped Up!";
    this.modalController.dismiss(onClosedData);
  }

  async delete_address(address_id) {
    const result = await this.AddressService.deleteCustomerAddress(address_id);
    if (result) {
      this.modalController.dismiss({operation:"refresh"});
        let navigationExtras: NavigationExtras = {
          queryParams: {
          },
          skipLocationChange: true,
          replaceUrl: true
        };
        this.router.navigate(['/home/profile'], navigationExtras);
    }
  }

  toggleChange(){
    if(this.isToggled){
      this.address_detail.is_default = 'yes';
    }else {
      this.address_detail.is_default = 'no';
    }
    console.log("toggleChange : " + JSON.stringify(this.address_detail));
  }
}
