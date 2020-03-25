import { Component, OnInit } from '@angular/core';
import { ConfigProvider } from '../providers/ConfigProvider';
import { SharedDataProvider } from '../providers/shared-data';
import { ObjectUtils } from '../providers/ObjectUtils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  private carts;
  private total: any;
  constructor(
    public config: ConfigProvider,
    private sharedDataProvider: SharedDataProvider,
    public ob: ObjectUtils,
    private router: Router,
  ) {

  }

  async ngOnInit() {
    this.carts = await this.sharedDataProvider.get_storage_key('cart');
    console.log("carts : " + JSON.stringify(this.carts));
  }

  ionViewWillEnter() {
    // this.totalPrice()
  }

  async removeCart(id) {
    await this.sharedDataProvider.removeCart(id);
    this.carts = await this.sharedDataProvider.get_storage_key('cart');
  }
  qunatityPlus = function (index) {
    if (!this.ob.isEmptyField(this.carts.cart_product[index].attu.qty)) {
      this.carts.cart_product[index].attu.qty++;
    }
    this.sharedDataProvider.arrangeCart(this.carts);

    console.log("index : " + this.carts.cart_product[index].attu.qty);
  }
  //function decreasing the quantity
  qunatityMinus = function (index) {
    if (!this.ob.isEmptyField(this.carts.cart_product[index].attu.qty)) {
      this.carts.cart_product[index].attu.qty--;
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
