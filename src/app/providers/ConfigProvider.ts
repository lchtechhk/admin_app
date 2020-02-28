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

  constructor(
    public storage: Storage,
    private router: Router,
    private http: HttpClient,
    private uiProvider: UIProvider,
    private ObjectUtils: ObjectUtils) {
    console.log("ConfigProvider");
  };

  public url: string = "http://192.168.1.116/admin/api/app/";
  public pdf_url: string = "http://192.168.1.116/admin/api/app/";


  // public url : string = "http://127.0.0.1/admin/api/app/";
  // public pdf_url : string = "http://127.0.0.1/admin/api/app/";

  // public url : string = "http://13.229.0.90/app/api/";
  // public pdf_url : string = "http://13.229.0.90/app/";
  public img_url: string = "https://13.251.6.226/rainbow_icon/";




  // async post(url: string, token: string, data: any, success: (response: any) => void, error: (error: any) => void) {
  //   console.log("post : " + url + '?token=' + token);
  //   const headers = {
  //     "Content-Type": "application/json",
  //     'Accept': 'application/json, text/plain',
  //   };
  //   // this.http.post(url, data, {headers : headers, responseType: 'json'}).subscribe((data:any) => {
  //   this.http.post(url + '?token=' + this.token, data, { headers: headers, responseType: 'json' }).subscribe(async (data: any) => {
  //     console.log("[Post] - Success 1");
  //     this.uiProvider.dismissLoadingDefault();
  //     return data;

  //   },async (err:any) => {
  //     console.log("[Post] -Error : " + err);
  //     this.uiProvider.dismissLoadingDefault();
  //     return err;
  //   });
  // }

  async post(url: string, token: string, data: any) {
    const headers = {
      "Content-Type": "application/json",
      'Accept': 'application/json, text/plain',
    };
    const response = new ResponseModel;
    console.log("[POST] -- URL : " + url + '?token=' + token);
    try{
      const result : any = await this.http.post(url, data, {headers : headers, responseType: 'json'}).toPromise();
      response.status = this.ObjectUtils.isEmptyField(result.status) ? false : result.status;
      response.data = this.ObjectUtils.isEmptyField(result.data) ? {} : result.data;
      response.message = this.ObjectUtils.isEmptyField(result.message) ? "" : result.message;
    }catch (err){
      response.status = false;
      if(!this.ObjectUtils.isEmptyField(err.error.message))response.message = this.httpException(err.error.message);
    }
    console.log("[POST] -- Response : " + JSON.stringify(response));
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
    console.log("[GET] -- Response : " + JSON.stringify(response));
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
  // get(url: string, token: string, success: (response: any) => void, error: (error: any) => void) {
  //   console.log("get : " + url + '?token=' + token);
  //    this.http.get(url + '?token=' + token, { responseType: 'json' }).subscribe(async(data: any) => {
  //      console.log("[Get] - Success");
  //      await success(data);
  //      this.uiProvider.dismissLoadingDefault();
  //     },async (err:any) => {
  //      console.log("[Get] -Error : " + err);
  //      await error(err);
  //      this.uiProvider.dismissLoadingDefault();
  //    });
  // }


  public check_login(navCtrl, person_id) {
    if (this.ObjectUtils.isEmptyField(person_id)) {
      this.uiProvider.presentSingleAlert('注意', '請先登入帳戶', '登入', () => {
        this.router.navigateByUrl("");
      });
    }
  }
}
