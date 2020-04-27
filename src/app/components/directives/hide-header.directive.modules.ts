import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HideHeaderDirective } from './hide-header.directive';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [HideHeaderDirective],
  exports: [HideHeaderDirective]
})
export class HideHeaderDirectiveModule {}
