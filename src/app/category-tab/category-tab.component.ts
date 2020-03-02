import { Component,Directive, Input, OnInit,Renderer2} from '@angular/core';
import { DomController } from '@ionic/angular';

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss'],
  host:{
    '(ionScroll)': 'onContentScroll($event)'
  }
})
@Directive({
  selector: '[appHideHeader]'
})
export class CategoryTabComponent implements OnInit {
  @Input('tabaa') autoHideTab:any;
  private lastY = 0;

  constructor(
    private renderer :Renderer2,
    private domCtrl: DomController
  ) {console.log("CategoryTabComponent"); }

  ngOnInit(): void {
    // this.autoHideTab = this.autoHideTab.el;
    // this.domCtrl.write(()=>{
    //   this.renderer.setStyle(this.autoHideTab,'transition','margin-top 400ms');
    // })
  }

  onContentScroll(event : any){
    // if (event.detail.scrollTop > this.lastY) {
    //   this.renderer.setStyle(this.autoHideTab,'margin-top',`-${this.autoHideTab.clientHeight}px`);
    // } else {
    //   this.renderer.setStyle(this.autoHideTab,'margin-top','0');
    // }
    // this.lastY = event.detail.scrollTop;
    console.log(event);
  }

}
