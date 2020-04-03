import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ConfigProvider } from '../providers/ConfigProvider';
import { SharedDataProvider } from '../providers/shared-data';
import { ObjectUtils } from '../providers/ObjectUtils';
import { ProductService } from '../services/ProductService';
import { UIProvider } from '../providers/UIProvider';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.page.html',
  styleUrls: ['./order-confirm.page.scss'],
})
export class OrderConfirmPage implements OnInit {
  public backPath: any = '/home/cart';
  public carts;
  public customer_address;
  public test = 'a';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public config: ConfigProvider,
    public sharedDataProvider: SharedDataProvider,
    public ob: ObjectUtils,
    public productService: ProductService,
    public uiProvider: UIProvider,

  ) { 
    console.log("constructor : ");
  }

  async ngOnInit() {
    console.log("ngOnInit : ");
    await this.uiProvider.presentLoadingDefault();
    this.customer_address = await this.sharedDataProvider.get_storage_key("customer_address");
    this.carts = await this.sharedDataProvider.get_storage_key('cart');
    if (!this.ob.isEmptyField(this.carts.cart_product)) {
      let att_ids = [];
      this.carts.cart_product.forEach(element => {
        att_ids.push(element.att_id);
      });
      this.updateCartProduct(att_ids);
    }
    this.route.queryParams.subscribe(params => {
      if (params && params.backPath) {
        this.backPath = params.backPath;
      }
    });
    await this.uiProvider.dismissLoadingDefault();
    console.log("carts : " + JSON.stringify(this.carts));
  }

  async updateCartProduct(att_ids) {
    const products = await this.productService.getProductByAttIds_key(att_ids);
    if (!this.ob.isEmptyField(products)) {
      this.carts.cart_product.forEach(element => {
        let att_id = element.att_id;
        if (!this.ob.isEmptyField(products[att_id])) {
          element.att = products[att_id];
        }
      });
      await this.sharedDataProvider.arrangeCart(this.carts);
      this.carts = await this.sharedDataProvider.get_storage_key('cart');
    }
  }

  pop() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        backPath: this.backPath,
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.router.navigate([this.backPath], navigationExtras);

  }

}
