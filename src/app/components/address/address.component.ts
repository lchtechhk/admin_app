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

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  private address_detail;
  private address_list;
  private portsSubscription: Subscription;
  private todo : FormGroup;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public config : ConfigProvider,
    private toastCtrl: ToastService,
    private sharedDataProvider: SharedDataProvider,
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private AddressService:AddressService,

  ) { 

        // this.config.post(this.config.url+'save_user_signature','',{signature_image : this.person_data.user_signature, user_id : this.sharedDataProvider.person_id},(res:any)=>{
        //   if(!this.ObjectUtils.isEmptyField(res) && !this.ObjectUtils.isEmptyField(res.data) && res.status){
        //   }else {
        //     alert(JSON.stringify(res.data))
        //   }
        // }, (error:any) => {
        //   alert(JSON.stringify(error))
        // });
  }

  async addAddress(){
    const param = {id:this.address_detail.id,
      district_id:this.address_detail.address_option.district_id,
      company:this.address_detail.company,
      estate:this.address_detail.estate,
      building:this.address_detail.building,
      room:this.address_detail.room,
      is_default:'yes',
    }
    const result = await this.AddressService.updateCustomerAddress(param);
    console.log(JSON.stringify(result));
  }
  portChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
      console.log('portChange:', event.value);
  }
  async ngOnInit() {
    this.address_detail = this.navParams.data.address;
    let district_id = this.address_detail.district_id;
    this.address_list = await this.AddressService.listingAllDistract();

    this.address_list.forEach(element => {
      let d_id = element.district_id;
      if(district_id == d_id){
        this.address_detail.address_option = element;
      }
    });

    // console.log(JSON.stringify(this.address_list));
  }

  pop(){
    const onClosedData: string = "Wrapped Up!";
    this.modalController.dismiss(onClosedData);
  }
}
