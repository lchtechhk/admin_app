import { Component } from '@angular/core';
import { ConfigProvider } from '../providers/ConfigProvider';
import { UIProvider } from '../providers/UIProvider';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonProvider } from '../providers/CommonProvider';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common'
import { ObjectUtils } from '../providers/ObjectUtils';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { SharedDataProvider } from '../providers/shared-data';
import { AuthService } from '../services/AuthService';

import * as moment from 'moment';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['login.scss']
})
export class LoginPage {
  public todo : FormGroup;
  public email:string;
  public password:string;
  public errorMessage:string;
   //loading
  private load : any;

  constructor(
    private AuthService : AuthService,
    private sharedDataProvider : SharedDataProvider,
    private router : Router,
    private storage: Storage,
    private ObjectUtils : ObjectUtils,
    private navCtrl: NavController,
    private commonProvider: CommonProvider,
    public datepipe: DatePipe, 
    public uiProvider: UIProvider,
    public formBuilder: FormBuilder,
    public config : ConfigProvider) {
    this.email = 'customerA@gmail.com';
    this.password = '123123';

    this.todo = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]   
    });
  }
  
  
   async login() {
    this.uiProvider.presentLoadingDefault();
    let login_profile = {email:this.email, password:this.password};
    const result = await this.AuthService.login(login_profile);
    this.uiProvider.dismissLoadingDefault();
    if(result.status){
      this.router.navigateByUrl("/home/tab1", { replaceUrl: true });
    }else {
      this.errorMessage = result.message;
    }
  }

  // public login() {
  //   this.uiProvider.presentLoadingDefault();
  //   let login_profile = {email:this.email, password:this.password};
  //   this.config.post(this.config.url+'login','',login_profile,(data:any)=>{
  //     if(!this.ObjectUtils.isEmptyField(data)){
  //       switch(data.status){
  //         case true :
  //           if(!this.ObjectUtils.isEmptyField(data.data.token)){
  //             this.router.navigateByUrl("/home/tab1", { replaceUrl: true });
  //             // this.sharedDataProvider.login_token(data.data.token);
  //             // console.log("token : " + this.sharedDataProvider.token);

  //           }else {
  //             this.errorMessage = '用戶不存在';
  //           }
  //         break;

  //         case false :
  //           if(!this.ObjectUtils.isEmptyField(data.message) && data.message == 'This account is not exsiting'){
  //             this.errorMessage = '登入失敗,用戶不存在';
  //           }else {
  //             this.errorMessage = '登入失敗,請聯繫管理人員';
  //           }
  //         break;
  //       }
  //     }
  //   }, (error:any) => {
  //   });
  // }

}
