import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressComponent } from './address.component';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, IonicSelectableModule],
  declarations: [AddressComponent],
  exports: [AddressComponent]
})
export class AddressComponentModule {}
