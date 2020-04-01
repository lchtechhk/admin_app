import { Component, Output, EventEmitter, OnInit, Input, OnChanges } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ConfigProvider } from '../../providers/ConfigProvider';
import { ToastService } from '../../services/ToastService';
import { SharedDataProvider } from '../../providers/shared-data';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss'],
})
export class AttributeComponent implements OnInit {
  public attribute : any;
  public original_image : any;
  public current_selected : any;
  public current_att : any;
  public qty : number = 1;
  constructor(
    public modalController: ModalController,
    public navParams: NavParams,
    public config : ConfigProvider,
    public toastCtrl: ToastService,
    public sharedDataProvider: SharedDataProvider,


  ) { }

  ngOnInit() {
    this.attribute = this.navParams.data.attribute;
    this.original_image = this.navParams.data.original_image;
  }

  onItemClick(index: any,att:any) {
    this.current_selected = index;
    this.current_att = att;
  }

  async addCart(){
    const att_id = this.current_att.product_attribute_id;
    const obj = {att_id : att_id, qty : this.qty, att : this.current_att}
    this.sharedDataProvider.addToCart(obj);
  }

  qunatityMinus(){
    if(this.qty > 1){
      this.qty = this.qty - 1;
    }
  }
  qunatityPlus(){
    this.qty = this.qty + 1;
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
