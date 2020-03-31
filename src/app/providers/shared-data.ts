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
    async getCartCount(){
        let qty = 0;
        let cart : any = await this.get_storage_key('cart');
        if(!this.ob.isEmptyField(cart) && !this.ob.isEmptyField(cart.cart_product) && cart.total_qty > 0 ){
            qty = cart.total_qty;
        }
        return qty;
    }
    async addToCart(obj) {
        // console.log("obj : " + JSON.stringify(obj));

        let cart : any = await this.get_storage_key('cart');
        // console.log("cart 1: " + JSON.stringify(cart));

        if(this.ob.isEmptyField(cart)){
            cart = {cart_product:[obj]};
            // console.log("cart 2: " + JSON.stringify(cart));
        }else {
            const att_id = obj.att_id;
            const qty = obj.qty;
            let is_existing = false;
            cart.cart_product.forEach(element => {
                if(element.att_id == att_id){
                    element.qty += qty;
                    is_existing = true;
                }
            });
            if(!is_existing){
                cart.cart_product.push(obj);
            }
        }
        await this.arrangeCart(cart);
        // console.log("cart 3: " + JSON.stringify(cart));
    }

    async removeCart(att_id) {
        let cart : any = await this.get_storage_key('cart');
        cart.cart_product.forEach((value, index) => {
            if (value.att_id == att_id) {
                cart.cart_product.splice(index, 1);
            }
        });
        await this.arrangeCart(cart);
    }

    public async arrangeCart(cart:any){
        let final_total_price = 0;
        let total = 0;
        if(this.ob.isEmptyField(cart) && this.ob.isEmptyField(cart.cart_product.attu) ){ return}
            const cart_product = cart.cart_product;
            for (let value of cart_product) {
                let sub_total = value.attu.final_price * value.qty;
                value.sub_total = sub_total
                final_total_price += sub_total;
                total += value.qty;
            }
            cart.total_qty = total;
            cart.final_total_price = final_total_price;
            await this.remove_storage_key('cart');
            await this.set_storage_key('cart',cart);
        
        console.log("arrangeCart : " + JSON.stringify(cart));
    }
    // 
    public update_fcm() {
        //     if (this.platform.is("android") || this.platform.is("ios")) {
        //         this.fcm.getToken().then(token => {
        //             await this.uiProvider.presentLoadingDefault();
        //             this.config.post(this.config.url + 'update_fcm', { fcm: token, user_id: this.person_id }, (res: any) => {
        //                 if (!this.ObjectUtils.isEmptyField(res) && !this.ObjectUtils.isEmptyField(res.data) && res.status) {
        //                     this.router.navigateByUrl("/home/tab1", { replaceUrl: true });
        //                 } else {
        //                     alert(JSON.stringify(res.data))
        //                 }
        //                 await this.uiProvider.dismissLoadingDefault();
        //             }, (error: any) => {
        //                 await this.uiProvider.dismissLoadingDefault();
        //                 alert(JSON.stringify(error))
        //             });
        //         });
        //     }
        this.router.navigateByUrl("/home/tab1", { replaceUrl: true });

    }
}