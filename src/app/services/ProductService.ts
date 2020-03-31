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
export class ProductService {
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
    async searchProduct(sub_category_id) {
        const search = {sub_category_id: sub_category_id};
        const token = await this.sharedDataProvider.getToken();
        const result : ResponseModel = await this.config.post(this.config.url+'listingProduct',token,search);
        if(result.status && !this.ObjectUtils.isEmptyField(result.data.products)){
            return result.data.products;
        }
        return [];
    }

    async getProductByAttIds(att_ids){
        const search = att_ids;
        const token = await this.sharedDataProvider.getToken();
        const result : ResponseModel = await this.config.post(this.config.url+'getProductByAttIds',token,{att_ids:att_ids});
        if(result.status && !this.ObjectUtils.isEmptyField(result.data.products)){
            return result.data.products;
        }
        return [];
    }
    async viewProduct(product_id) {
        const search = {product_id: product_id};
        const token = await this.sharedDataProvider.getToken();
        const result : ResponseModel = await this.config.post(this.config.url+'getProductDetails',token,search);
        if(result.status && !this.ObjectUtils.isEmptyField(result.data.product)){
            return result.data.product;
        }
        return [];
    }

}