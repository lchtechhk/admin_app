import { Component} from '@angular/core';
// import { DomController } from '@ionic/angular';

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss'],
})
export class CategoryTabComponent {
 
  slideOpts = {
    // spaceBetween:10,
    // centeredSlides:true,
    // slidersPerView:1.6,
    initialSlide: 3,
    speed: 400
  };

  constructor(
 
  ) {console.log("CategoryTabComponent"); }


  hide_tab(){

  }


}
