import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    // loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    loadChildren: () => import('./login/login.modules').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },  {
    path: 'order-confirm',
    loadChildren: () => import('./order-confirm/order-confirm.module').then( m => m.OrderConfirmPageModule)
  },
  {
    path: 'order-address',
    loadChildren: () => import('./order-address/order-address.module').then( m => m.OrderAddressPageModule)
  },
  {
    path: 'order-payment',
    loadChildren: () => import('./order-payment/order-payment.module').then( m => m.OrderPaymentPageModule)
  },
  {
    path: 'order-record',
    loadChildren: () => import('./order-record/order-record.module').then( m => m.OrderRecordPageModule)
  },
  {
    path: 'order-detail-record',
    loadChildren: () => import('./order-detail-record/order-detail-record.module').then( m => m.OrderDetailRecordPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
