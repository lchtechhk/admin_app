import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderConfirmPageRoutingModule } from './order-confirm-routing.module';

import { OrderConfirmPage } from './order-confirm.page';
import { OrderAddressPageModule } from '../order-address/order-address.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderConfirmPageRoutingModule,
    OrderAddressPageModule
  ],
  declarations: [OrderConfirmPage]
})
export class OrderConfirmPageModule {}
