import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UIProvider } from '../providers/UIProvider';
import { ObjectUtils } from '../providers/ObjectUtils';
import { ActivatedRoute } from "@angular/router";
import { ConfigProvider } from '../providers/ConfigProvider';

@Component({
  selector: 'app-order-detail-record',
  templateUrl: './order-detail-record.page.html',
  styleUrls: ['./order-detail-record.page.scss'],
})
export class OrderDetailRecordPage implements OnInit {

  public order : any;
  public order_id : String;
  public target : string = "";

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
    await this.uiProvider.dismissLoadingDefault();

  }

  async queryParams(){
    this.route.queryParams.subscribe(async params => {
      if (params && params.order) {
        console.log("order : " + this.order);
        this.order_id = params.order;
        // this.order = this.order.order_id;
      }
      if (params && params.target) {
        this.target = params.target;
      }
    });
    // console.log("order_info : " + JSON.stringify(this.order_info));
    // console.log("complete_orders : " + JSON.stringify(this.complete_orders));
    // console.log("cancel_orders : " + JSON.stringify(this.cancel_orders));

  }

  pop(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        // backPath: this.backPath,
              target : this.target
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.router.navigate(['/order-record'], navigationExtras);
  }

}
