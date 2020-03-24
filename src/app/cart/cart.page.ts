import { Component, OnInit } from '@angular/core';
import { ConfigProvider } from '../providers/ConfigProvider';
import { SharedDataProvider } from '../providers/shared-data';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  total: any;
  constructor(
    public config : ConfigProvider,
    private sharedDataProvider: SharedDataProvider,
  ) { 
    
  }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.totalPrice()
  }

  removeCart(id) {
    this.sharedDataProvider.removeCart(id);
    this.totalPrice();
  }
  qunatityPlus = function (q) {
    q.customers_basket_quantity++;
    q.subtotal = q.final_price * q.customers_basket_quantity;
    q.total = q.subtotal;
    if (q.customers_basket_quantity > q.quantity) {
      q.customers_basket_quantity--;
      this.shared.toast('Product Quantity is Limited!', 'short', 'center');
    }
    this.totalPrice();
    this.shared.cartTotalItems();
    this.storage.set('cartProducts', this.shared.cartProducts);
  }
  //function decreasing the quantity
  qunatityMinus = function (q) {
    if (q.customers_basket_quantity == 1) {
      return 0;
    }
    q.customers_basket_quantity--;
    q.subtotal = q.final_price * q.customers_basket_quantity;
    q.total = q.subtotal;
    this.totalPrice();

    this.shared.cartTotalItems();
    this.storage.set('cartProducts', this.shared.cartProducts);
  }

  totalPrice() {
    var price = 0;
    for (let value of this.sharedDataProvider.cartProducts) {
      var pp = value.final_price * value.customers_basket_quantity;
      price = price + pp;
    }
    this.total = price;
  };

}
