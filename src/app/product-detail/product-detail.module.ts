import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPageRoutingModule } from './product-detail-routing.module';

import { ProductDetailPage } from './product-detail.page';
import { AttributeComponentModule  } from '../components/attribute/attribute.component.modules';
import { AttributeComponent  } from '../components/attribute/attribute.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailPageRoutingModule,
    AttributeComponentModule,
  ],
  declarations: [ProductDetailPage],
  entryComponents: [AttributeComponent],

})
export class ProductDetailPageModule {}
