import { Component, OnInit} from '@angular/core';
// import { DomController } from '@ionic/angular';
import { CategoryService } from '../services/CategoryService';

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss'],
})
export class CategoryTabComponent implements OnInit {
 
  slideOpts = {
    // spaceBetween:10,
    // centeredSlides:true,
    // slidersPerView:1.6,
    initialSlide: 3,
    speed: 400
  };

  constructor(
    private categoryService : CategoryService,

  ) { }


  ngOnInit(): void {
    console.log("ngOnInit");

    this.categoryService.getAllSubCategory();
    console.log("CategoryTabComponent");
  }

  hide_tab(){

  }


}
