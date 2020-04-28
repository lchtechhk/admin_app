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
export class OrderService {
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
    async getAllOrderRecord() {
        const token = await this.sharedDataProvider.getToken();
        const result : ResponseModel = await this.config.post(this.config.url+'getAllOrderRecord',token,{});
        return result;
    }
    async getOrderItem(order_id:any){
        const token = await this.sharedDataProvider.getToken();
        const result : ResponseModel = await this.config.post(this.config.url+'getOrderItem',token,{order_id:order_id});
        return result;
    }
    async addOrder(param){
        console.log("addOrder : " + JSON.stringify(param));
        const token = await this.sharedDataProvider.getToken();
        const result : ResponseModel = await this.config.post(this.config.url+'addOrder',token,param);
        return result;
    }

    // async updateOrder(param){
    //     console.log("updaterder : " + JSON.stringify(param));

    //     const token = await this.sharedDataProvider.getToken();
    //     const result : ResponseModel = await this.config.post(this.config.url+'updaterder',token,param);
    //     if(result.status){
    //         return true
    //     }
    //     return false;
    // }

    // async deleteCustomerAddress(address_id){
    //     const token = await this.sharedDataProvider.getToken();
    //     const result : ResponseModel = await this.config.post(this.config.url+'deleteCustomerAddress',token,{address_id : address_id});
    //     if(result.status){
    //         return true
    //     }
    //     return false;

    // }
}