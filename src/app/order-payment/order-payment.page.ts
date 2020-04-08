import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ConfigProvider } from '../providers/ConfigProvider';
import { SharedDataProvider } from '../providers/shared-data';
import { ObjectUtils } from '../providers/ObjectUtils';
import { UIProvider } from '../providers/UIProvider';
import { PaymentMethodService } from '../services/PaymentMethodService';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.page.html',
  styleUrls: ['./order-payment.page.scss'],
})
export class OrderPaymentPage implements OnInit {
  public backPath: any = '/home/order-payment';
  public payment_methods : any= [];
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public config: ConfigProvider,
    public sharedDataProvider: SharedDataProvider,
    public ob: ObjectUtils,
    public uiProvider: UIProvider,
    public paymentMethodService: PaymentMethodService,

  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.backPath) {
        this.backPath = params.backPath;
      }
    });
    await this.uiProvider.presentLoadingDefault();
    // Get PaymentMethod
    await this.getAllPaymentMethod();  
    await this.uiProvider.dismissLoadingDefault();

  }

  select_method(selected_method){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        selected_method: JSON.stringify(selected_method),
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.router.navigate(['/order-confirm'], navigationExtras);
  }

  async getAllPaymentMethod(){
    const payment_methods = await this.paymentMethodService.getAllPaymentMethod();
    if (!this.ob.isEmptyField(payment_methods)) {
      this.payment_methods = payment_methods;
    }
    console.log("payment_methods : " +JSON.stringify(this.payment_methods));
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
