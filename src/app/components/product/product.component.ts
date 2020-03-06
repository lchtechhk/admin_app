import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ConfigProvider } from '../../providers/ConfigProvider';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductComponent implements OnInit {
  @Input('data') p;//product data
  @Input('type') type;
  is_upcomming = false;

  constructor(
    public config : ConfigProvider
  ) { 
  }

  ngOnInit() {
    // console.log(JSON.stringify(this.p));
  }

  checkProductNew() {
    var pDate = new Date(this.p.create_date);
    var date = pDate.getTime() + this.config.newProductDuration * 86400000;
    var todayDate = new Date().getTime();
    if (date > todayDate)
      return true;
    else
      return false
  }

  showProductDetail() {
    
  }
  addToCart() {  }

  isInCart() {
    return false;
  }

}
