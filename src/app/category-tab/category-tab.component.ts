import { Component, OnInit} from '@angular/core';
// import { DomController } from '@ionic/angular';
import { CategoryService } from '../services/CategoryService';
import { ConfigProvider } from '../providers/ConfigProvider';

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss'],
})
export class CategoryTabComponent implements OnInit {
  private categories : any ;
  slideOpts = {
    // spaceBetween:10,
    // centeredSlides:true,
    // slidersPerView:1.6,
    initialSlide: 3,
    speed: 400
  };

  constructor(
    private categoryService : CategoryService,
    public config : ConfigProvider
  ) { }


  async ngOnInit(){
    this.categories = await this.categoryService.getAllSubCategory();
    console.log("CategoryTabComponent : " + JSON.stringify(this.categories));
  }

  hide_tab(){

  }


}
