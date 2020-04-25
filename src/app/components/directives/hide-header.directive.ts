import { Component,Directive, Input, OnInit,Renderer2} from '@angular/core';
import { DomController } from '@ionic/angular';

@Component({
  selector: '[appHideHeader]',
  templateUrl: './hide-header.directive.html',
  styleUrls: ['./hide-header.directive.scss'],
  host:{
    '(ionScroll)': 'onContentScroll($event)'
  }
})
// @Directive({
//   selector: '[appHideHeader]',
//   host:{
//     '(ionScroll)': 'onContentScroll($event)'
//   }
// })
export class HideHeaderDirective implements OnInit  {
  @Input('tab') autoHideTab:any;
  private lastY = 0;
  constructor(
    private renderer :Renderer2,
    private domCtrl: DomController
  ) { 

  }

  ngOnInit(): void {
    this.autoHideTab = this.autoHideTab.el;
    this.domCtrl.write(()=>{
      this.renderer.setStyle(this.autoHideTab,'transition','margin-top 400ms');
    })
  }
  
  onContentScroll(event : any){
    if (event.detail.scrollTop > this.lastY) {
      this.renderer.setStyle(this.autoHideTab,'margin-top',`-${this.autoHideTab.clientHeight}px`);
    } else {
      this.renderer.setStyle(this.autoHideTab,'margin-top','0');
    }
    this.lastY = event.detail.scrollTop;
    // console.log(event);
  }


}
