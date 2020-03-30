import { addressOptionModel } from './addressOption';

export class addressModel{
    id:String= "";
    address_option: addressOptionModel = new addressOptionModel;
    district_id:String= "";
    company:String= "";
    estate:String= "";
    building:String= "";
    room:String= "";
    is_default:String= "";

}