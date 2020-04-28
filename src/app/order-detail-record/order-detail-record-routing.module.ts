import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDetailRecordPage } from './order-detail-record.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailRecordPageRoutingModule {}
