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
    public cartProducts : any = new Array();

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
        this.cartProducts = this.get_storage_key("cartProducts");
    }
    async getToken() {
        try {
            let token = await this.storage.get('token');
            return token;
        }
        catch (e) { console.log(e) }
    }
    async setToken(token) {
        try {
            await this.removeToken();
            await this.storage.set('token', token);
        }
        catch (e) { console.log(e) }
    }
    async removeToken() {
        await this.storage.remove("token");
    }

    async get_storage_key(key) {
        try {
            let value = await this.storage.get(key);
            return value;
        }
        catch (e) { console.log(e) }
    }
    async set_storage_key(key, value) {
        try {
            await this.remove_storage_key(key);
            await this.storage.set(key, value);
        }
        catch (e) { console.log(e) }
    }
    async remove_storage_key(key) {
        await this.storage.remove(key);
    }

    // 
    //adding into cart array products
    addToCart(product) {
        console.log(product);

    
        this.cartTotalItems();

        // console.log(this.cartProducts);
        //console.log(this.cartProducts);
    }

    removeCart(p) {
        this.cartProducts.forEach((value, index) => {
            if (value.cart_id == p) {
                this.cartProducts.splice(index, 1);
                this.storage.set('cartProducts', this.cartProducts);
            }
        });
        this.cartTotalItems();
    }

    cartTotalItems = function () {
        this.events.publish('cartChange');
        let total = 0;
        for (let value of this.cartProducts) {
          total += value.customers_basket_quantity;
        }
        this.cartquantity = total;
        // console.log("updated");
        return total;
    };

    emptyCart() {
        // this.orderDetails.guest_status = 0;
        this.cartProducts = [];
        this.storage.set('cartProducts', this.cartProducts);
        this.cartTotalItems();
    }
      
    // 
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