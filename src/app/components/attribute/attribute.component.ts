import { Component, Output, EventEmitter, OnInit, Input, OnChanges } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ConfigProvider } from '../../providers/ConfigProvider';
import { ToastService } from '../../services/ToastService';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss'],
})
export class AttributeComponent implements OnInit {
  private attribute : any;
  private original_image : any;
  private current_selected : any;
  private current_att : any;
  private qty : number = 1;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public config : ConfigProvider,
    private toastCtrl: ToastService,

  ) { }

  ngOnInit() {
    this.attribute = this.navParams.data.attribute;
    this.original_image = this.navParams.data.original_image;
    // console.log(JSON.stringify(this.attribute));
    console.log("original_image : " + this.original_image);

  }

  onItemClick(index: any,att:any) {
    this.current_selected = index;
    this.current_att = att;
  }

  async addCart(){
    console.log("att : " + JSON.stringify(this.current_att));
  }

  qunatityMinus(){
    console.log("qunatityMinus");
  }
  qunatityPlus(){
    console.log("qunatityPlus");
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
