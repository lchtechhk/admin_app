import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UIProvider } from '../providers/UIProvider';
import { ObjectUtils } from '../providers/ObjectUtils';
import { Router } from '@angular/router';

@Injectable()
export class ConfigProvider {

    constructor(private router : Router, private http: HttpClient,private ui : UIProvider,private ObjectUtils : ObjectUtils) { };

    // public url : string = "http://127.0.0.1/app/api/";
    // public pdf_url : string = "http://127.0.0.1/app/api/";
    public url : string = "http://13.229.0.90/app/api/";
    public pdf_url : string = "http://13.229.0.90/app/";
    public img_url : string = "https://13.251.6.226/rainbow_icon/";
    

    
    
    public post(url:string,data:any,success:(response:any)=>void,error:(error:any)=>void){
      const headers = {
        "Content-Type": "application/json", 
        'Accept': 'application/json, text/plain',
        "cache-control": "no-cache", 
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Allow-Credentials" : "true",
        "Access-Control-Allow-Methods" : "GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT",  
        };
        this.http.post(url, data, {headers : headers, responseType: 'json'}).subscribe((data:any) => {
            success(data);
          }, err => {
            error(err);
          });
    }

    public get(url:string,success:(response:any)=>void,error:(error:any)=>void){
      this.http.get(url,{responseType: 'json'}).subscribe((data:any) => {
        this.ui.dismissLoadingDefault();
          success(data);
        }, err => {
          error(err);
          this.ui.dismissLoadingDefault();
        });
    }

    
    public check_login(navCtrl,person_id){
      if(this.ObjectUtils.isEmptyField(person_id)){
        this.ui.presentSingleAlert('注意','請先登入帳戶','登入',() => {
            this.router.navigateByUrl("");
        });
      }
    }
}
