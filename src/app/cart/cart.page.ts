import { Component, OnInit } from '@angular/core';
import { ConfigProvider } from '../providers/ConfigProvider';
import { SharedDataProvider } from '../providers/shared-data';
import { ObjectUtils } from '../providers/ObjectUtils';
import { Router, NavigationExtras } from '@angular/router';
import { UIProvider } from '../providers/UIProvider';
import { ProductService } from '../services/ProductService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  private carts;
  private total: any;
  private backPath : any = '/home/cart';

  constructor(
    public config: ConfigProvider,
    private sharedDataProvider: SharedDataProvider,
    public ob: ObjectUtils,
    private router: Router,
    public uiProvider: UIProvider,
    private productService : ProductService,

  ) {

  }

  async ngOnInit() {
    this.carts = await this.sharedDataProvider.get_storage_key('cart');
    console.log("carts : " + JSON.stringify(this.carts));
  }

  ionViewWillEnter() {
    // this.totalPrice()
  }

  async viewProductDetail(product_id){

    this.uiProvider.presentLoadingDefault();
    const product = await this.productService.viewProduct(product_id);
    console.log("product : " + JSON.stringify(product));

    let navigationExtras: NavigationExtras = {
      queryParams: {
        product: JSON.stringify(product),
        backPath : this.backPath,
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.router.navigate(['/product-detail'], navigationExtras);
    this.uiProvider.dismissLoadingDefault();
  }
  async removeCart(id) {
    await this.sharedDataProvider.removeCart(id);
    this.carts = await this.sharedDataProvider.get_storage_key('cart');
  }
  qunatityPlus = function (index) {
    this.carts.cart_product[index].qty++;
    this.sharedDataProvider.arrangeCart(this.carts);
  }
  //function decreasing the quantity
  qunatityMinus = function (index) {
    if (!this.ob.isEmptyField(this.carts.cart_product[index].qty) && this.carts.cart_product[index].qty > 1) {
      this.carts.cart_product[index].qty--;
    }
    this.sharedDataProvider.arrangeCart(this.carts);
  }

  totalPrice() {
    var price = 0;
    for (let value of this.sharedDataProvider.cartProducts) {
      var pp = value.final_price * value.customers_basket_quantity;
      price = price + pp;
    }
    this.total = price;
  };

  async proceedToCheckOut() {

    console.log("proceedToCheckOut");
  }

  openProductsPage() {
    this.router.navigateByUrl("/home/tab1", { replaceUrl: true });
  }

  trackByFn(index, item) {
    console.log("index : " + index);
    console.log("item : " + JSON.stringify(item));

    return index;
  }
}
