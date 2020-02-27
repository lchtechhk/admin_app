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
        console.log("AuthService");
    }
    async authenticate() {
        console.log("authenticate first");
        const token = await this.sharedDataProvider.getToken();
        const result = await this.config.get(this.config.url,token);
       
        console.log("authenticate end : " + result);
    }

    async login(login_profile) {
        const result : ResponseModel  = await this.config.post(this.config.url + 'login', '',login_profile);
        if(result.status && !this.ObjectUtils.isEmptyField(result.data.token)){
            this.sharedDataProvider.setToken(result.data.token);
        }
        return result;

    }

    async logout() {
        await this.storage.remove("person_data");
        await this.storage.remove("person_id");
        // this.person_id = null;
        this.router.navigateByUrl("", { replaceUrl: true });
    }


}