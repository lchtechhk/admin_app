import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttributeComponent } from './attribute.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [AttributeComponent],
  exports: [AttributeComponent]
})
export class AttributeComponentModule {}
