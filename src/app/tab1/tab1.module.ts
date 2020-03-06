import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../components/explore-container/explore-container.module';
import { CategoryTabComponentModule } from '../components/category-tab/category-tab.component.modules';

import { HideHeaderDirectiveModule } from '../components/directives/hide-header.directive.modules';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CategoryTabComponentModule,
    HideHeaderDirectiveModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
