import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderAddressPageRoutingModule } from './order-address-routing.module';

import { OrderAddressPage } from './order-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderAddressPageRoutingModule
  ],
  declarations: [OrderAddressPage]
})
export class OrderAddressPageModule {}
