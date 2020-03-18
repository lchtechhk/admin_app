import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  private product : any;
  sliderConfig = {
    zoom: true
  }
  constructor(
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.product) {
        this.product = JSON.parse(params.product);
      }
    });
    console.log("ngOnInit 2 : " + JSON.stringify(this.product));
  }

  pop(){
    this.location.back();
  }
}
