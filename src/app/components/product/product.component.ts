import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ConfigProvider } from '../../providers/ConfigProvider';
import { SharedDataProvider } from '../../providers/shared-data';
import { Router } from '@angular/router';

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
    private config : ConfigProvider,
    private sharedDataProvider: SharedDataProvider,
    private router : Router,
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

  showProductDetail(p) {
    this.router.navigateByUrl("/product-detail", { replaceUrl: true });

    console.log(JSON.stringify(p));
  }

  isInCart() {
    return false;
  }

}
