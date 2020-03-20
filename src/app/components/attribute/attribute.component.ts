import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ConfigProvider } from '../../providers/ConfigProvider';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss'],
})
export class AttributeComponent implements OnInit {
  private attribute : any;
  private original_image : any;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public config : ConfigProvider,

  ) { }

  ngOnInit() {
    this.attribute = this.navParams.data.attribute;
    this.original_image = this.navParams.data.original_image;
    // console.log(JSON.stringify(this.attribute));
    console.log("original_image : " + this.original_image);

  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
