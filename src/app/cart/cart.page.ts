import { Component, OnInit } from '@angular/core';
import { ConfigProvider } from '../providers/ConfigProvider';
import { SharedDataProvider } from '../providers/shared-data';
import { ObjectUtils } from '../providers/ObjectUtils';
import { Router, NavigationExtras } from '@angular/router';
import { UIProvider } from '../providers/UIProvider';
import { ProductService } from '../services/ProductService';
import { isArray } from 'util';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public carts;
  public total: any;
  public backPath: any = '/home/cart';

  constructor(
    public config: ConfigProvider,
    public sharedDataProvider: SharedDataProvider,
    public ob: ObjectUtils,
    public router: Router,
    public uiProvider: UIProvider,
    public productService: ProductService,

  ) {

  }

  async ngOnInit() {
    this.carts = await this.sharedDataProvider.get_storage_key('cart');
    // console.log("carts : " + JSON.stringify(this.carts));

    if (!this.ob.isEmptyField(this.carts.cart_product)) {
      let att_ids = [];
      this.carts.cart_product.forEach(element => {
        att_ids.push(element.att_id);
      });
      this.updateCartProduct(att_ids);
    }
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
  async viewProductDetail(product_id) {

    await this.uiProvider.presentLoadingDefault();
    const product = await this.productService.viewProduct(product_id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        product: JSON.stringify(product),
        backPath: this.backPath,
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.router.navigate(['/product-detail'], navigationExtras);
    await this.uiProvider.dismissLoadingDefault();
  }

  async removeCart(id) {
    await this.sharedDataProvider.removeCart(id);
    this.carts = await this.sharedDataProvider.get_storage_key('cart');
  }

  qunatityPlus = function (index) {
    this.carts.cart_product[index].qty++;
    this.sharedDataProvider.arrangeCart(this.carts);
  }

  qunatityMinus = function (index) {
    if (!this.ob.isEmptyField(this.carts.cart_product[index].qty) && this.carts.cart_product[index].qty > 1) {
      this.carts.cart_product[index].qty--;
    }
    this.sharedDataProvider.arrangeCart(this.carts);
  }

  async proceedToCheckOut() {
    console.log("proceedToCheckOut : " + JSON.stringify(this.carts));
  }

  openProductsPage() {
    this.router.navigateByUrl("/home/tab1", { replaceUrl: true });
  }

  trackByFn(index, item) {
    return index;
  }
}
