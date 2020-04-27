import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UIProvider } from '../providers/UIProvider';
import { ObjectUtils } from '../providers/ObjectUtils';
import { ActivatedRoute } from "@angular/router";
import { IonSlides } from '@ionic/angular';
import { ConfigProvider } from '../providers/ConfigProvider';

@Component({
  selector: 'app-order-record',
  templateUrl: './order-record.page.html',
  styleUrls: ['./order-record.page.scss'],
})
export class OrderRecordPage implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;

  public pending_orders : any = [];
  public transport_orders : any = [];
  public received_orders : any = [];
  public target : string = "";
  slideOpts = {
    initialSlide: 0,
    speed: 100
  };

  constructor(
    public router: Router,
    public uiProvider : UIProvider,
    public ObjectUtils : ObjectUtils,
    public route: ActivatedRoute,
    public config : ConfigProvider,
  ) { }

  async ngOnInit() {
    await this.uiProvider.presentLoadingDefault();
    await this.queryParams();
    await this.initial_seg_slide();
    await this.uiProvider.dismissLoadingDefault();
  }

  async segmentChanged(){
     this.initial_seg_slide();
  }

  async slideChanged() {
    const index = await this.slider.getActiveIndex();
    if(index == 0){
      this.target = 'pending'
    }else if(index == 1){
      this.target = 'transport'
    }else if(index == 2){
      this.target = 'received'
    }
  }

  async initial_seg_slide(){
    if(this.target == 'pending'){
      await this.slider.slideTo(0);
    }else if(this.target == 'transport'){
      await this.slider.slideTo(1);
    }else if(this.target == 'received'){
      await this.slider.slideTo(2);
    }
  }
  async queryParams(){
    this.route.queryParams.subscribe(async params => {
      if (params && params.pending_orders) {
        this.pending_orders = params.pending_orders;
      }
      if (params && params.transport_orders) {
        this.transport_orders = params.transport_orders;
      }
      if (params && params.received_orders) {
        this.received_orders = params.received_orders;
      }
      if (params && params.target) {
        this.target = params.target;
      }
    });
    console.log("pending_orders : " + JSON.stringify(this.pending_orders));
    // console.log("transport_orders : " + JSON.stringify(this.transport_orders));
    // console.log("received_orders : " + JSON.stringify(this.received_orders));

  }
  
  pop(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        // backPath: this.backPath,
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.router.navigate(['home/profile'], navigationExtras);
  }
}
