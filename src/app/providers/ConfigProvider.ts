import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UIProvider } from '../providers/UIProvider';
import { ObjectUtils } from '../providers/ObjectUtils';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigProvider {

  public token: any = "";

  constructor(
    public storage: Storage,
    private router: Router,
    private http: HttpClient,
    private ui: UIProvider,
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




  public post(url: string, token: string, data: any, success: (response: any) => void, error: (error: any) => void) {
    console.log("post : " + url + '?token=' + token);
    const headers = {
      "Content-Type": "application/json",
      'Accept': 'application/json, text/plain',
    };
    // this.http.post(url, data, {headers : headers, responseType: 'json'}).subscribe((data:any) => {
    console.log("post : " + url + '?token=' + this.token);
    this.http.post(url + '?token=' + this.token, data, { headers: headers, responseType: 'json' }).subscribe((data: any) => {
      success(data);
    }, err => {
      error(err);
    });
  }

  public get(url: string, token: string, success: (response: any) => void, error: (error: any) => void) {
    console.log("get : " + url + '?token=' + token);
    this.http.get(url + '?token=' + token, { responseType: 'json' }).subscribe((data: any) => {
      success(data);
    }, err => {
      error(err);
    });
  }


  public check_login(navCtrl, person_id) {
    if (this.ObjectUtils.isEmptyField(person_id)) {
      this.ui.presentSingleAlert('注意', '請先登入帳戶', '登入', () => {
        this.router.navigateByUrl("");
      });
    }
  }
}
