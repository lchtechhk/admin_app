import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UIProvider } from '../providers/UIProvider';
import { ObjectUtils } from '../providers/ObjectUtils';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-order-record',
  templateUrl: './order-record.page.html',
  styleUrls: ['./order-record.page.scss'],
})
export class OrderRecordPage implements OnInit {
  public orders : any = [];
  constructor(
    public router: Router,
    public uiProvider : UIProvider,
    public ObjectUtils : ObjectUtils,
    public route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    await this.uiProvider.presentLoadingDefault();

    await this.queryParams();
    await this.uiProvider.dismissLoadingDefault();
  }

  segmentChanged(event:any){
    console.log('Segment changed', event);
  }

  async queryParams(){
    this.route.queryParams.subscribe(params => {
      if (params && params.orders) {
        this.orders = params.orders
      }
    });
    console.log("orders : " + JSON.stringify(this.orders));
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
