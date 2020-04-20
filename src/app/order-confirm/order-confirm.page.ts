import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ConfigProvider } from '../providers/ConfigProvider';
import { SharedDataProvider } from '../providers/shared-data';
import { ObjectUtils } from '../providers/ObjectUtils';
import { ProductService } from '../services/ProductService';
import { OrderService } from '../services/OrderService';
import { PaymentMethodService } from '../services/PaymentMethodService';
import { UIProvider } from '../providers/UIProvider';
import { postModel } from './models/postModel';
import { orderProductModel } from './models/orderProductModel';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.page.html',
  styleUrls: ['./order-confirm.page.scss'],
})
export class OrderConfirmPage implements OnInit {
  public backPath: any = '/home/cart';
  public carts;
  public customer_address;
  public payment_methods;
  public person_data;
  private todo: FormGroup;

  public postModel = new postModel;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public config: ConfigProvider,
    public sharedDataProvider: SharedDataProvider,
    public ob: ObjectUtils,
    public productService: ProductService,
    public orderService: OrderService,
    public paymentMethodService: PaymentMethodService,
    public uiProvider: UIProvider,
    private formBuilder: FormBuilder
  ) {
    this.todo = this.formBuilder.group({
      customer_remark: ['', ""],
      customer_street_address: ['', Validators.required],
      payment_method_name: ['', Validators.required],

    });
  }

  async ngOnInit() {
    await this.uiProvider.presentLoadingDefault();
    // Get Default Address
    this.postModel = new postModel;
    // Get QueryParams
    await this.queryParams();
    // Get DefaultAddress
    await this.getPersonData();
    // Get DefaultAddress
    await this.getDefaultAddressId();
    // Get DefaultPaymentMethod
    await this.getDefaultPaymentMethodId();
    // Get CartProduct
    await this.getCartProduct();

    console.log("carts 2: " + JSON.stringify(this.carts));
    await this.uiProvider.dismissLoadingDefault();
  }

  async queryParams() {
    this.route.queryParams.subscribe(params => {
      if (params && params.backPath) {
        this.backPath = params.backPath;
      }
      if (params && params.selected_address) {
        const selected_address = JSON.parse(params.selected_address);
        this.postModel.customer_address_id = selected_address.id;
        this.postModel.customer_street_address = selected_address.address_ch;
      }
      if (params && params.selected_method) {
        const selected_method = JSON.parse(params.selected_method);
        this.postModel.payment_method_id = selected_method.payment_method_id;
        this.postModel.payment_method_name = selected_method.name;
        this.postModel.payment_method_image = selected_method.image;
        this.postModel.payment_method_default_image = selected_method.default_image;
      }
    });
  }
  async submit_order() {
        
    // Sending Order To Server    
    console.log("postModel : " + JSON.stringify(this.postModel));

    const result = await this.orderService.addOrder(this.postModel);
    if (result.status) {
      this.uiProvider.presentSingleAlert("訂單狀態", "提交成功", "確定", async () => {
        // console.log("submit_order : " + JSON.stringify(result));
        // await this.sharedDataProvider.remove_storage_key('cart');
        let navigationExtras: NavigationExtras = {
          queryParams: {
          },
          skipLocationChange: true,
          replaceUrl: true
        };
        // this.router.navigate(['/home/tab1'], navigationExtras);
      });
    } else {
      this.uiProvider.presentSingleAlert("訂單狀態", "提交失敗<br/>" + result.message, "確定", () => {
      });
    }
  }
  async getPersonData() {
    this.person_data = await this.sharedDataProvider.get_storage_key('person_data');
    if (!this.ob.isEmptyField(this.person_data) && !this.ob.isEmptyField(this.person_data.email)) {
      this.postModel.email = this.person_data.email;
    }
  }
  async getCartProduct() {
    this.carts = await this.sharedDataProvider.get_storage_key('cart');
    if (!this.ob.isEmptyField(this.carts.cart_product)) {
      let att_ids = [];
      this.carts.cart_product.forEach(element => {
        att_ids.push(element.att_id);
      });
      this.updateCartProduct(att_ids);
    }
    // console.log("carts : " + JSON.stringify(this.carts));
  }

  async getDefaultPaymentMethodId() {
    this.payment_methods = await this.sharedDataProvider.get_storage_key("payment_methods");
    this.payment_methods.forEach(element => {
      if (element.is_default == 'yes' && this.ob.isEmptyField(this.postModel.payment_method_id)) {
        this.postModel.payment_method_id = element.payment_method_id;
        this.postModel.payment_method_name = element.name;
        this.postModel.payment_method_image = element.image;
        this.postModel.payment_method_default_image = element.default_image;
      }
    });
  }
  async getDefaultAddressId() {
    this.customer_address = await this.sharedDataProvider.get_storage_key("customer_address");
    this.customer_address.forEach(element => {
      if (element.is_default == 'yes' && this.ob.isEmptyField(this.postModel.customer_address_id)) {
        this.postModel.customer_address_id = element.id;
        this.postModel.customer_country = element.country_name;
        this.postModel.customer_city = element.city_name;
        this.postModel.customer_area = element.area_name;
        this.postModel.customer_district = element.district_name;
        this.postModel.customer_estate = element.estate;
        this.postModel.customer_building = element.building;
        this.postModel.customer_room = element.room;

        this.postModel.customer_address_id = element.id;
        this.postModel.customer_street_address = element.address_ch;

        this.postModel.customer_street_address = element.address_ch;
        this.postModel.customer_name = this.ob.isEmptyField(element.lastname) ? "" : element.lastname + " " + this.ob.isEmptyField(element.firstname) ? "" : element.firstname;
        this.postModel.customer_company = element.company;
        this.postModel.customer_telephone = element.phone;
      }
    });
  }

  async updateCartProduct(att_ids) {
    // Server get new Attu 
    const products = await this.productService.getProductByAttIds_key(att_ids);
    if (!this.ob.isEmptyField(products)) {
      let order_products : Array<orderProductModel> = Array<orderProductModel>()
      this.carts.cart_product.forEach(element => {
        let att_id = element.att_id;
        if (!this.ob.isEmptyField(products[att_id])) {
          // update cart attu detail
          element.att = products[att_id];
          let order_product = new orderProductModel
          order_product.product_attribute_id = att_id;
          order_product.product_quantity = element.qty;
          order_product.product_price = element.att.final_price;
          order_product.final_price = element.sub_total;
          order_products.push(order_product);
        }
      });
      await this.sharedDataProvider.arrangeCart(this.carts);
      this.carts = await this.sharedDataProvider.get_storage_key('cart');
      // Adding CartProduct to PostModel
      this.postModel.order_products = order_products;
      this.postModel.order_price = this.carts.final_total_price;
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
  open_order_address() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        // backPath: "/home/cart",
      },
      skipLocationChange: false,
      replaceUrl: false
    };
    this.router.navigate(['/order-address'], navigationExtras);
  }

  open_order_payment_method() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        // backPath: "/home/cart",
      },
      skipLocationChange: false,
      replaceUrl: false
    };
    this.router.navigate(['/order-payment'], navigationExtras);
  }
}
