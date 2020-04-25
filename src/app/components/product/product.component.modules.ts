import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductComponent } from './product.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ProductComponent],
  exports: [ProductComponent]
})
export class ProductComponentModule {}
