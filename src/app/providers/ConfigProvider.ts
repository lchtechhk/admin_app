import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UIProvider } from '../providers/UIProvider';
import { ObjectUtils } from '../providers/ObjectUtils';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ResponseModel } from '../models/ResponseModel';

@Injectable()
export class ConfigProvider {

  public token: any = "";
  public newProductDuration = 100;
  
  constructor(
    public storage: Storage,
    private router: Router,
    private http: HttpClient,
    private uiProvider: UIProvider,
    private ObjectUtils: ObjectUtils) {
  };

  public url: string = "http://192.168.1.116/admin/api/app/";
  public pdf_url: string = "http://192.168.1.116/admin/api/app/";
  public img_url: string = "http://192.168.1.116/admin/";

  // public url : string = "http://192.168.0.2/admin/api/app/";
  // public pdf_url : string = "http://192.168.0.2/admin/api/app/";
  // public img_url: string = "http://192.168.0.2/admin/";

  // public url : string = "http://127.0.0.1/admin/api/app/";
  // public pdf_url : string = "http://127.0.0.1/admin/api/app/";
  // public img_url: string = "http://127.0.0.1/admin/";

  // public url : string = "http://13.229.0.90/app/api/";
  // public pdf_url : string = "http://13.229.0.90/app/";
  // public img_url: string = "https://13.251.6.226/rainbow_icon/";

  async post(url: string, token: string, data: any) {
    // const headers = {'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    // "Content-Type": "application/json",
    // 'Accept': 'application/json, text/plain',};

    const headers = {
      "Content-Type": "application/json",
      'Accept': 'application/json, text/plain',
    };
    const response = new ResponseModel;
    console.log("[POST] -- URL : " + url + '?token=' + token);
    try{
      const result : any = await this.http.post(url + '?token=' + token, data, {headers : headers, responseType: 'json'}).toPromise();
      response.status = this.ObjectUtils.isEmptyField(result.status) ? false : result.status;
      response.data = this.ObjectUtils.isEmptyField(result.data) ? {} : result.data;
      response.message = this.ObjectUtils.isEmptyField(result.message) ? "" : result.message;
    }catch (err){
      console.log("err : " + JSON.stringify(err))
      response.status = false;
      if(!this.ObjectUtils.isEmptyField(err.error) && !this.ObjectUtils.isEmptyField(err.error.message))response.message = this.httpException(err.error.message);
    }
    // console.log("[POST] -- Response : " + JSON.stringify(response));
    return response;
  }

  async get(url: string, token: string) {
    const response = new ResponseModel;
    console.log("[GET] -- URL : " + url + '?token=' + token);
    try{
      const result : any = await this.http.get(url + '?token=' + token, { responseType: 'json' }).toPromise();
      response.status = this.ObjectUtils.isEmptyField(result.status) ? false : result.status;
      response.data = this.ObjectUtils.isEmptyField(result.data) ? {} : result.data;
      response.message = this.ObjectUtils.isEmptyField(result.message) ? "" : result.message;
    }catch (err){
      response.status = false;
      if(!this.ObjectUtils.isEmptyField(err.error.message))response.message = this.httpException(err.error.message);
    }
    // console.log("[GET] -- Response : " + JSON.stringify(response));
    return response;
  }

  public httpException(message){
    console.log("[HTTP] -- Error : " + message);
    switch (message){
      case 'The token has been blacklisted' :
      return '登入逾時';
      case 'We cant find an account with this credentials.':
      return '登入失敗,用戶不存在';
      default :
      return '伺服器發生故障,請聯絡開發人員';
    }
  }

  public check_login(navCtrl, person_id) {
    if (this.ObjectUtils.isEmptyField(person_id)) {
      this.uiProvider.presentSingleAlert('注意', '請先登入帳戶', '登入', () => {
        this.router.navigateByUrl("");
      });
    }
  }
}
