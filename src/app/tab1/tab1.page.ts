import { Component, Input, OnInit, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';
import { DomController } from '@ionic/angular';
import { CategoryTabComponent } from '../category-tab/category-tab.component';
import { ProductService } from '../services/ProductService';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  private lastY = 0;
  private categoryTab : any;
  private products : any;
  @ViewChild("content", { static:false}) private content: ElementRef;
  constructor(
    private productService : ProductService,
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
    this.getProductListing();
  }
   async getProductListing(){
    this.products = await this.productService.searchProduct();
    console.log("products : " + JSON.stringify(this.products));
  }
  scrollStart(event : any){
    console.log("scrollStart");
    console.log(event);
    this.renderer.setStyle(this.categoryTab,'margin-top','0');
  }
  onContentScroll(event : any){
    console.log("onContentScroll");
    if (event.detail.scrollTop > this.lastY) {
      this.renderer.setStyle(this.categoryTab,'margin-top',`-${this.categoryTab.clientHeight}px`);
    } else {
      // this.renderer.setStyle(this.categoryTab,'margin-top','0');
      
    }
    this.lastY = event.detail.scrollTop;
    // console.log(event);
  }

  scrollComplete(event : any){
    console.log("scrollComplete");
    // if (event.detail.scrollTop > this.lastY) {
    //   this.renderer.setStyle(this.categoryTab,'margin-top',`-${this.categoryTab.clientHeight}px`);
    // } else {
    //   this.renderer.setStyle(this.categoryTab,'margin-top','0');
      
    // }
    // this.lastY = event.detail.scrollTop;
    console.log(event);
  }

}
