import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { AddressComponentModule  } from '../components/address/address.component.modules';
import { AddressComponent  } from '../components/address/address.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AddressComponentModule,
    RouterModule.forChild([{ path: '', component: ProfilePage }])
  ],
  declarations: [ProfilePage],
  entryComponents: [
    ProfilePage,
    AddressComponent,
  ],
})
export class ProfilePageModule {}
