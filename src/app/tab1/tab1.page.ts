import { Component, Input, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { DomController } from '@ionic/angular';
import { CategoryTabComponent } from '../category-tab/category-tab.component';
// import { CategoryService } from '../services/CategoryService';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  private lastY = 0;
  private categoryTab : any;
  constructor(
    // private categoryService : CategoryService,
    private renderer :Renderer2,
    private domCtrl: DomController,
    private elementRef: ElementRef,
  ) {

  }

  ngOnInit(): void {
    this.categoryTab = this.elementRef.nativeElement.querySelector('#categoryTab');
    this.domCtrl.write(()=>{
      this.renderer.setStyle(this.categoryTab,'transition','margin-top 400ms');
    })
  }

  onContentScroll(event : any){
    if (event.detail.scrollTop > this.lastY) {
      this.renderer.setStyle(this.categoryTab,'margin-top',`-${this.categoryTab.clientHeight}px`);
    } else {
      this.renderer.setStyle(this.categoryTab,'margin-top','0');
    }
    this.lastY = event.detail.scrollTop;
    // console.log(event);
  }

}
