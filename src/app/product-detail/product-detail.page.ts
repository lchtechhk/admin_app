import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ConfigProvider } from '../providers/ConfigProvider';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ModalController, NavParams  } from '@ionic/angular';
import { AttributeComponent } from '../components/attribute/attribute.component';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  private product : any;
  sliderConfig = {
    zoom: false,
    passiveListeners: false,
  }
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public config : ConfigProvider,
    private photoViewer: PhotoViewer,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.product) {
        this.product = JSON.parse(params.product);
      }
    });
    // console.log("ngOnInit 2 : " + JSON.stringify(this.product));
  }

  async presentModal() {
    console.log("hi");
    const modal = await this.modalController.create({
      component: AttributeComponent,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      },
      cssClass: "wideModal"
    });
    return await modal.present();
  }

  zoomImage(img) {
    this.photoViewer.show(img);
  }

  pop(){
    this.location.back();
  }
}