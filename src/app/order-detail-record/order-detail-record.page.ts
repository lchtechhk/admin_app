import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UIProvider } from '../providers/UIProvider';
import { ObjectUtils } from '../providers/ObjectUtils';
import { ActivatedRoute } from "@angular/router";
import { ConfigProvider } from '../providers/ConfigProvider';
import { OrderService } from '../services/OrderService';

@Component({
  selector: 'app-order-detail-record',
  templateUrl: './order-detail-record.page.html',
  styleUrls: ['./order-detail-record.page.scss'],
})
export class OrderDetailRecordPage implements OnInit {

  public order: any;
  public order_id: string;
  public target: string = "";
  public order_items: any = [];
  public pending_item: any = [];
  public transport_items: any = [];
  public received_items: any = [];
  constructor(
    public router: Router,
    public uiProvider: UIProvider,
    public ObjectUtils: ObjectUtils,
    public route: ActivatedRoute,
    public config: ConfigProvider,
    public OrderService: OrderService,
  ) { }

  async ngOnInit() {
    await this.uiProvider.presentLoadingDefault();
    await this.queryParams();
    await this.getOrderItem();
    await this.uiProvider.dismissLoadingDefault();

  }

  async getOrderItem() {
    if (!this.ObjectUtils.isEmptyField(this.order_id)) {
      const items = await this.OrderService.getOrderItem(this.order_id);
      if (items.status && !this.ObjectUtils.isEmptyField(items.data) && !this.ObjectUtils.isEmptyField(items.data)) {
        this.order_items = items.data.orders;
        this.pending_item = items.data.orders.pending;
        this.transport_items = items.data.orders.transport;
        this.received_items = items.data.orders.received;
        console.log("pending_item : " + JSON.stringify(this.pending_item));

        // console.log("order_items : " + JSON.stringify(this.order_items));
      }
    }
  }


  async queryParams() {
    this.route.queryParams.subscribe(params => {
      if (params && params.order) {
        this.order = JSON.parse(params.order);
        this.order_id = this.order.order_id;
      }
      if (params && params.target) {
        this.target = params.target;
      }
    });
    console.log(JSON.stringify(this.order));
  }

  pop() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        // backPath: this.backPath,
        target: this.target
      },
      skipLocationChange: true,
      replaceUrl: true
    };
    this.router.navigate(['/order-record'], navigationExtras);
  }

}
