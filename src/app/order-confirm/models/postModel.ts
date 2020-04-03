import { orderProductModel } from './orderProductModel';

export class postModel{
    customer_name:String= "";
    customer_company:String= "";
    customer_address_id:String= "";

    customer_country:String= "";
    customer_city:String= "";
    customer_area:String= "";
    customer_district:String= "";
    customer_estate:String= "";
    customer_building:String= "";
    customer_room:String= "";

    customer_street_address:String= "";
    customer_telephone:String= "";
    email:String= "";
    shipping_cost:String= "";
    shipping_method:String= "";
    order_price:String= "";
    date_purchased:String= "";
    orderProduct: Array<orderProductModel> = Array<orderProductModel>();


}