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
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public config : ConfigProvider,

  ) { }

  ngOnInit() {
    this.attribute = this.navParams.data.attribute;
    console.log(JSON.stringify(this.attribute));
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
