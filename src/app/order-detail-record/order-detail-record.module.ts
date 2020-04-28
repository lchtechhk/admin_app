import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailRecordPageRoutingModule } from './order-detail-record-routing.module';

import { OrderDetailRecordPage } from './order-detail-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailRecordPageRoutingModule
  ],
  declarations: [OrderDetailRecordPage]
})
export class OrderDetailRecordPageModule {}
