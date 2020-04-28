import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UIProvider } from '../providers/UIProvider';
import { ObjectUtils } from '../providers/ObjectUtils';
import { ActivatedRoute } from "@angular/router";
import { IonSlides } from '@ionic/angular';
import { ConfigProvider } from '../providers/ConfigProvider';
import { OrderService } from '../services/OrderService';

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
  public target : string = "pending";
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
    public OrderService: OrderService,
  ) { }

  async ngOnInit() {
    await this.uiProvider.presentLoadingDefault();
    await this.queryParams();
    await this.initial_seg_slide();
    await this.getAllOrderRecord();
    await this.uiProvider.dismissLoadingDefault();
  }

  async go_orderDetailPage(order:any){
    // console.log("order : " + JSON.stringify(order));
    let navigationExtras: NavigationExtras = {
      queryParams: {
        // backPath: this.backPath,
        order : JSON.stringify(order),
        target : this.target
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.router.navigate(['/order-detail-record'], navigationExtras);
  }

  async getAllOrderRecord() {
    const orders = await this.OrderService.getAllOrderRecord();
    if (orders.status && !this.ObjectUtils.isEmptyField(orders.data) && !this.ObjectUtils.isEmptyField(orders.data.orders)) {
      if(orders.data.orders.pending) this.pending_orders = orders.data.orders.pending;
      if(orders.data.orders.complete) this.complete_orders = orders.data.orders.complete;
      if(orders.data.orders.cancel) this.cancel_orders = orders.data.orders.cancel;
      // console.log("getAllOrderRecord : " + JSON.stringify(orders.data.orders));
    }
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
      if (params && params.target) {
        this.target = params.target;
      }
    });
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
