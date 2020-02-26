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
        console.log("console");
        this.is_login();
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

    public is_login() {
        this.storage.get('person_data').then((val) => {
            if (!this.ob.isEmptyField(val)) {
                this.person_data = val;
                this.person_id = val.id;
                if (this.platform.is('android') || this.platform.is('ios')) {
                    this.update_fcm();
                } else {
                    this.router.navigateByUrl("/home/tab1", { replaceUrl: true });
                }
            } else {
                this.router.navigateByUrl("", { replaceUrl: true });
            }
        });
    }
    async get_user() {
        await this.storage.get('person_data').then((val) => {
            if (!this.ob.isEmptyField(val)) {
                this.person_data = val;
                this.person_id = val.id;
            }
        });
    }
    async storage_remove(key) {
        await this.storage.remove(key);

    }
    async login(user) {
        await this.storage.set('person_data', user);
        await this.storage.set('person_id', user.id);
        this.storage.get('person_data').then((val) => {
            if (!this.ob.isEmptyField(val)) {
                this.person_data = val;
                this.person_id = val.id;
                this.update_fcm();
            }
        });
    }
    async logout() {
        await this.storage.remove("person_data");
        await this.storage.remove("person_id");
        this.person_data = null;
        this.person_id = null;
        this.router.navigateByUrl("", { replaceUrl: true });
    }
}