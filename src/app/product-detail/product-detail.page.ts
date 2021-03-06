import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ConfigProvider } from '../providers/ConfigProvider';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { AttributeComponent } from '../components/attribute/attribute.component';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  public product: any;
  public backPath: any = '/home/tab1';

  sliderConfig = {
    zoom: false,
    passiveListeners: false,
  }
  constructor(
    public location: Location,
    public route: ActivatedRoute,
    public config: ConfigProvider,
    public photoViewer: PhotoViewer,
    public modalController: ModalController,
    public router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.product) {
        this.product = JSON.parse(params.product);
      }
      if (params && params.backPath) {
        this.backPath = params.backPath;
      }
    });
  }

  async presentModal(attribute) {
    const modal = await this.modalController.create({
      component: AttributeComponent,
      componentProps: {
        "attribute": attribute,
        "original_image": this.product.image,
      },
      cssClass: "wideModal"
    });
    return await modal.present();
  }

  zoomImage(img) {
    this.photoViewer.show(img);
  }

  pop() {
    let navigationExtras: NavigationExtras = {
      skipLocationChange: true
    };
    this.router.navigate([this.backPath], navigationExtras);

  }
}