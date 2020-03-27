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

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  private address;
  private address_option;
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
    this.route.queryParams.subscribe(params => {
      if (params && params.address) {
        this.address = JSON.parse(params.address);
      }
        // this.config.post(this.config.url+'save_user_signature','',{signature_image : this.person_data.user_signature, user_id : this.sharedDataProvider.person_id},(res:any)=>{
        //   if(!this.ObjectUtils.isEmptyField(res) && !this.ObjectUtils.isEmptyField(res.data) && res.status){
        //   }else {
        //     alert(JSON.stringify(res.data))
        //   }
        // }, (error:any) => {
        //   alert(JSON.stringify(error))
        // });
    });
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
      console.log('port:', event.value);
  }

  async ngOnInit() {
    this.address_option = await this.AddressService.listingAllDistract();
    this.address = {id:"1",district:"district A"};
    console.log("address_option : " + JSON.stringify(this.address_option));
  }

  pop(){

  }
}
