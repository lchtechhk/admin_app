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
import { ObjectUtils } from '../../providers/ObjectUtils';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  private address_detail = new addressModel;
  private address_list;
  private portsSubscription: Subscription;
  private todo: FormGroup;

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
    const param = {
      id: this.address_detail.id,
      district_id: this.address_detail.address_option.district_id,
      company: this.address_detail.company,
      estate: this.address_detail.estate,
      building: this.address_detail.building,
      room: this.address_detail.room,
      is_default: 'yes',
    }
    const result = await this.AddressService.updateCustomerAddress(param);
    if(result){
      const onClosedData: string = "Wrapped Up!";
      this.modalController.dismiss(onClosedData);
    }
  }

  async updateAddress() {
    const param = {
      id: this.address_detail.id,
      district_id: this.address_detail.address_option.district_id,
      company: this.address_detail.company,
      estate: this.address_detail.estate,
      building: this.address_detail.building,
      room: this.address_detail.room,
      is_default: 'yes',
    }
    const result = await this.AddressService.updateCustomerAddress(param);
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
    console.log("address_detail : " + JSON.stringify(this.address_detail));
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
}
