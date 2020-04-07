import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ConfigProvider } from '../providers/ConfigProvider';
import { SharedDataProvider } from '../providers/shared-data';
import { ObjectUtils } from '../providers/ObjectUtils';
import { ProductService } from '../services/ProductService';
import { UIProvider } from '../providers/UIProvider';
import { postModel } from './models/postModel';
import { orderProductModel } from './models/orderProductModel';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.page.html',
  styleUrls: ['./order-confirm.page.scss'],
})
export class OrderConfirmPage implements OnInit {
  public backPath: any = '/home/cart';
  public carts;
  public customer_address;
  public selected_address_id :any = "";
  public selected_address :any;
  public selected_customer_street_address :any = "";

  public postModel = new postModel;
  public orderProductModel = new orderProductModel;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public config: ConfigProvider,
    public sharedDataProvider: SharedDataProvider,
    public ob: ObjectUtils,
    public productService: ProductService,
    public uiProvider: UIProvider,

  ) { 
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.backPath) {
        this.backPath = params.backPath;
      }
      if (params && params.selected_address) {
        this.selected_address = JSON.parse(params.selected_address);
        this.selected_address_id = this.selected_address.id;
        this.selected_customer_street_address = this.selected_address.address_ch;
      }
    });
    await this.uiProvider.presentLoadingDefault();

    // Get Default Address
    await this.getDefaultAddressId();
    // Get CartProduct
    await this.getCartProduct();  

    console.log("postModel : " +JSON.stringify(this.postModel));

    await this.uiProvider.dismissLoadingDefault();
  }

  async getCartProduct(){
    this.carts = await this.sharedDataProvider.get_storage_key('cart');
    if (!this.ob.isEmptyField(this.carts.cart_product)) {
      let att_ids = [];
      this.carts.cart_product.forEach(element => {
        att_ids.push(element.att_id);
      });
      this.updateCartProduct(att_ids);
    }
    console.log("carts : " + JSON.stringify(this.carts));
  }
  async getDefaultAddressId(){
    this.customer_address = await this.sharedDataProvider.get_storage_key("customer_address");
    this.customer_address.forEach(element => {
      if(element.is_default == 'yes'){
        console.log("customer_street_address : " + this.postModel.customer_street_address)

        this.postModel.customer_address_id = element.id;
        this.postModel.customer_country = element.country_name;
        this.postModel.customer_city = element.city_name;
        this.postModel.customer_area = element.area_name;
        this.postModel.customer_district = element.district_name;
        this.postModel.customer_estate = element.estate;
        this.postModel.customer_building = element.building;
        this.postModel.customer_room = element.room;
        if(this.ob.isEmptyField(this.selected_customer_street_address)){
          this.postModel.customer_street_address = element.address_ch;
        }else {
          this.postModel.customer_street_address = this.selected_customer_street_address;
        }
        this.postModel.customer_street_address = element.address_ch;
        this.postModel.customer_name = this.ob.isEmptyField(element.lastname) ? "" : element.lastname + " " + this.ob.isEmptyField(element.firstname) ? "" : element.firstname;
        this.postModel.customer_company = element.company;
        this.postModel.customer_telephone = element.phone;
      }
    });
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
        // backPath: this.backPath,
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.router.navigate(['/home/cart'], navigationExtras);

  }
  open_order_address(){
    console.log("open_order_address");
    let navigationExtras: NavigationExtras = {
      queryParams: {
        backPath: "/home/cart",
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.router.navigate(['/order-address'], navigationExtras);
  }
}
