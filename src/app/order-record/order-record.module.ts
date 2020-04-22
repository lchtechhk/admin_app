import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderRecordPageRoutingModule } from './order-record-routing.module';

import { OrderRecordPage } from './order-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderRecordPageRoutingModule
  ],
  declarations: [OrderRecordPage]
})
export class OrderRecordPageModule {}
