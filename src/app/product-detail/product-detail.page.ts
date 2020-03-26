import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ConfigProvider } from '../providers/ConfigProvider';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ModalController, NavParams  } from '@ionic/angular';
import { AttributeComponent } from '../components/attribute/attribute.component';
import { Router, NavigationExtras } from '@angular/router';


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
    private router : Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.product) {
        this.product = JSON.parse(params.product);
      }
    });
    // console.log("product : " + JSON.stringify(this.product));
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

  pop(){
    let navigationExtras: NavigationExtras = {
      skipLocationChange: true
    };
    this.router.navigate(['/home/tab1'],navigationExtras);

  }
}