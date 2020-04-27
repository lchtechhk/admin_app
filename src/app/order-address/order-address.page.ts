import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ConfigProvider } from '../providers/ConfigProvider';
import { SharedDataProvider } from '../providers/shared-data';
import { ObjectUtils } from '../providers/ObjectUtils';
import { UIProvider } from '../providers/UIProvider';

@Component({
  selector: 'app-order-address',
  templateUrl: './order-address.page.html',
  styleUrls: ['./order-address.page.scss'],
})
export class OrderAddressPage implements OnInit {
  public backPath: any = '/home/order-address';
  public customer_address : any = [];
  
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public config: ConfigProvider,
    public sharedDataProvider: SharedDataProvider,
    public ob: ObjectUtils,
    public uiProvider: UIProvider,
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.backPath) {
        this.backPath = params.backPath;
      }
    });
    await this.uiProvider.presentLoadingDefault();
    this.customer_address = await this.sharedDataProvider.get_storage_key("customer_address");
    await this.uiProvider.dismissLoadingDefault();
  }

  select_address(selected_address){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        selected_address: JSON.stringify(selected_address),
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.router.navigate(['/order-confirm'], navigationExtras);
  }
  pop() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        // backPath: this.backPath,
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.router.navigate(['/order-confirm'], navigationExtras);

  }
}
