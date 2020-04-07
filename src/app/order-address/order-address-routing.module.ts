import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderAddressPage } from './order-address.page';

const routes: Routes = [
  {
    path: '',
    component: OrderAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderAddressPageRoutingModule {}
