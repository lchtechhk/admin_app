import { Component, OnInit } from '@angular/core';
import { ConfigProvider } from '../providers/ConfigProvider';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(
    public config : ConfigProvider
  ) { }

  ngOnInit() {
  }

}
