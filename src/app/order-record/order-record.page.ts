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
  public complete_orders : any = [];
  public cancel_orders : any = [];
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

  async goOrderDetailPage(){
    
  }
  async segmentChanged(){
     this.initial_seg_slide();
  }

  async slideChanged() {
    const index = await this.slider.getActiveIndex();
    if(index == 0){
      this.target = 'pending'
    }else if(index == 1){
      this.target = 'complete'
    }else if(index == 2){
      this.target = 'cancel'
    }
  }

  async initial_seg_slide(){
    if(this.target == 'pending'){
      await this.slider.slideTo(0);
    }else if(this.target == 'complete'){
      await this.slider.slideTo(1);
    }else if(this.target == 'cancel'){
      await this.slider.slideTo(2);
    }
  }
  async queryParams(){
    this.route.queryParams.subscribe(async params => {
      if (params && params.pending_orders) {
        this.pending_orders = params.pending_orders;
      }
      if (params && params.complete_orders) {
        this.complete_orders = params.complete_orders;
      }
      if (params && params.cancel_orders) {
        this.cancel_orders = params.cancel_orders;
      }
      if (params && params.target) {
        this.target = params.target;
      }
    });
    console.log("pending_orders : " + JSON.stringify(this.pending_orders));
    // console.log("complete_orders : " + JSON.stringify(this.complete_orders));
    // console.log("cancel_orders : " + JSON.stringify(this.cancel_orders));

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
