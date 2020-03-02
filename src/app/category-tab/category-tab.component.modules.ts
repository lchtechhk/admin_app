import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryTabComponent } from './category-tab.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [CategoryTabComponent],
  exports: [CategoryTabComponent]
})
export class CategoryTabComponentModule {}
