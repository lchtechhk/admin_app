import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ConfigProvider } from '../providers/ConfigProvider';
import { ObjectUtils } from '../providers/ObjectUtils';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { FCM } from '@ionic-native/fcm/ngx';
import { UIProvider } from '../providers/UIProvider';
import { Platform } from '@ionic/angular';
import { SharedDataProvider } from '../providers/shared-data';
import { ResponseModel } from '../models/ResponseModel';


@Injectable()
export class AuthService {
    constructor(
        // private fcm: FCM,
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
    async authenticate() {
        const token = await this.sharedDataProvider.getToken();
        const result = await this.config.get(this.config.url+'refresh_token',token);
        if(result.status && !this.ObjectUtils.isEmptyField(result.data.token) && !this.ObjectUtils.isEmptyField(result.data.owner)){
            await this.sharedDataProvider.setToken(result.data.token);
            await this.sharedDataProvider.set_storage_key('person_data',result.data.owner);
        }
        return result
    }

    async login(login_profile) {
        const result : ResponseModel  = await this.config.post(this.config.url + 'login', '',login_profile);
        // const result : ResponseModel  = await this.config.post('/login', '',login_profile);
        if(result.status && !this.ObjectUtils.isEmptyField(result.data.token) && !this.ObjectUtils.isEmptyField(result.data.owner)){
            await this.sharedDataProvider.setToken(result.data.token);
            await this.sharedDataProvider.set_storage_key('person_data',result.data.owner);
        }
        return result;

    }

    async logout() {
        const token = await this.sharedDataProvider.getToken();
        const result = await this.config.get(this.config.url+'logout',token);
        if(result.status){
            await this.sharedDataProvider.removeToken();
        }        
        this.router.navigateByUrl("", { replaceUrl: true });
    }


}