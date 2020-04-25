import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderRecordPage } from './order-record.page';

const routes: Routes = [
  {
    path: '',
    component: OrderRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRecordPageRoutingModule {}
