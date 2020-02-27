import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ConfigProvider } from '../providers/ConfigProvider';
import { ObjectUtils } from '../providers/ObjectUtils';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { FCM } from '@ionic-native/fcm/ngx';
import { UIProvider } from '../providers/UIProvider';
import { Platform } from '@ionic/angular';


@Injectable()
export class SharedDataProvider {
    public person_data: any = null;
    public person_id: number = null;
    public token: any = null;
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

    ) {
        console.log("SharedDataProvider");
        // this.is_login();
    }
    async is_login() {
        await this.storage.get('token').then((val) => {
            if (!this.ob.isEmptyField(val)) {
                this.token = val;
                if (this.platform.is('android') || this.platform.is('ios')) {
                    // this.update_fcm();
                } else {
                    // this.router.navigateByUrl("/home/tab1", { replaceUrl: true });
                    console.log("is_login : " + this.token);
                }
            } else {
                // this.router.navigateByUrl("", { replaceUrl: true });
            }
        });
    }
    async getToken(){
        console.log("getToken");
        try {
            return await this.storage.get('token').then((val) =>{
                console.log("val : " + val);
                return this.token = val;

            });
        }
        catch(e) { console.log(e) }
    }
    async setToken(token){
        console.log("setToken");
        try {
            this.token = token;
            await this.storage.set('token', token);
        }
        catch(e) { console.log(e) }
    }

    async storage_remove(key) {
        await this.storage.remove(key);

    }

    public update_fcm() {
    //     if (this.platform.is("android") || this.platform.is("ios")) {
    //         this.fcm.getToken().then(token => {
    //             this.uiProvider.presentLoadingDefault();
    //             this.config.post(this.config.url + 'update_fcm', { fcm: token, user_id: this.person_id }, (res: any) => {
    //                 if (!this.ObjectUtils.isEmptyField(res) && !this.ObjectUtils.isEmptyField(res.data) && res.status) {
    //                     this.router.navigateByUrl("/home/tab1", { replaceUrl: true });
    //                 } else {
    //                     alert(JSON.stringify(res.data))
    //                 }
    //                 this.uiProvider.dismissLoadingDefault();
    //             }, (error: any) => {
    //                 this.uiProvider.dismissLoadingDefault();
    //                 alert(JSON.stringify(error))
    //             });
    //         });
    //     }
        this.router.navigateByUrl("/home/tab1", { replaceUrl: true });

    }
}