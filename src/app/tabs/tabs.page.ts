import { Component, OnInit } from '@angular/core';
import { SharedDataProvider } from '../providers/shared-data';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  public cart_count = 0;

  constructor(
    private sharedDataProvider : SharedDataProvider,

  ) {
  }
  async ngOnInit() {
   this.cart_count = await this.sharedDataProvider.getCartCount();
  }

}
