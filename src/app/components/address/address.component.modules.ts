import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressComponent } from './address.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [AddressComponent],
  exports: [AddressComponent]
})
export class AddressComponentModule {}
