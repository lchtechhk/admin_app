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
    addToCart(obj) {
        // console.log("obj : " + JSON.stringify(obj));

        let cart : any = this.get_storage_key('cart');
        const cart_product = cart.cart_product ? cart.cart_product : [];

        if(this.ob.isEmptyField(cart_product) || cart_product.length == 0){
            cart = {total_qty:0,cart_product:[obj]};
        }else {
            const att_id = obj.att_id;
            const qty = obj.qty;
            cart_product.forEach(element => {
                if(element.att_id == att_id){
                    cart_product.qty += qty;
                }
            });
        }
        const total = this.cartTotalItems(cart);
        this.remove_storage_key('cart');
        this.set_storage_key('cart',{total_qty : total, cart_product : cart_product});  
        console.log("cart_product : " + JSON.stringify(cart_product));
    }

    removeCart(p) {
        this.cartProducts.forEach((value, index) => {
            if (value.cart_id == p) {
                this.cartProducts.splice(index, 1);
                this.storage.set('cartProducts', this.cartProducts);
            }
        });
        // this.cartTotalItems(cart_product);
    }

    cartTotalItems(cart:any) {
        console.log("cart : " + JSON.stringify(cart));
        let total = 0;
        if(this.ob.isEmptyField(cart) && this.ob.isEmptyField(cart.cart_product.attu) ) return total;
        const cart_product = cart.cart_product;
        for (let value of cart_product) {
          total += value.qty;
        }
        return total;
    };

    emptyCart() {
        // this.orderDetails.guest_status = 0;
        this.cartProducts = [];
        this.storage.set('cartProducts', this.cartProducts);
        this.cartTotalItems(this.cartProducts);
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