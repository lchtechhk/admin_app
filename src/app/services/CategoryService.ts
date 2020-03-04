import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ConfigProvider } from '../providers/ConfigProvider';
import { ObjectUtils } from '../providers/ObjectUtils';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UIProvider } from '../providers/UIProvider';
import { Platform } from '@ionic/angular';
import { SharedDataProvider } from '../providers/shared-data';
import { ResponseModel } from '../models/ResponseModel';


@Injectable()
export class CategoryService {
    constructor(
        public storage: Storage,
        public config: ConfigProvider,
        public ob: ObjectUtils,
        private navCtrl: NavController,
        private router: Router,
        private ObjectUtils: ObjectUtils,
        private uiProvider: UIProvider,
        private platform: Platform,
        private sharedDataProvider: SharedDataProvider,

    ) {
    }
    async getAllSubCategory() {
        console.log("getAllSubCategorygetAllSubCategorygetAllSubCategory");
        const token = await this.sharedDataProvider.getToken();
        const result : ResponseModel = await this.config.get(this.config.url+'listingCategory',token);
        if(result.status && !this.ObjectUtils.isEmptyField(result.data.token) && !this.ObjectUtils.isEmptyField(result.data.owner)){
            await this.sharedDataProvider.setToken(result.data.token);
            await this.sharedDataProvider.set_storage_key('person_data',result.data.owner);
        }
        console.log("getAllSubCategory : " + JSON.stringify(result));
        return result
    }

}