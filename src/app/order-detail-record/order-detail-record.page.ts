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
  public order_id : string;
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
    this.route.queryParams.subscribe(params => {
      if (params && params.order) {
        this.order = JSON.parse(params.order);
        this.order_id = this.order.order_id;
        console.log(this.order_id);

      }
      if (params && params.target) {
        this.target = params.target;
      }
    });

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
