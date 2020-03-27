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
export class AddressService {
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
    async listingAllDistract() {
        const token = await this.sharedDataProvider.getToken();
        const result : ResponseModel = await this.config.get(this.config.url+'listingDistrict',token);
        if(result.status && !this.ObjectUtils.isEmptyField(result.data.districts)){
            return result.data.districts;
        }
        return [];
    }

    async updateCustomerAddress(param){
        const token = await this.sharedDataProvider.getToken();
        const result : ResponseModel = await this.config.post(this.config.url+'updateCustomerAddress',token,param);
        if(result.status){
            return true
        }
        return false;
    }

}