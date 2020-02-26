import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { SharedDataProvider } from '../providers/shared-data';
import { ObjectUtils } from '../providers/ObjectUtils';
import { ConfigProvider } from '../providers/ConfigProvider';
import { UIProvider } from '../providers/UIProvider';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public uiProvider: UIProvider,
    public config : ConfigProvider,
    private sharedDataProvider : SharedDataProvider,
    private router: Router,
    public ob: ObjectUtils) {
    console.log("AuthGuardService");
  }

  canActivate(route: ActivatedRouteSnapshot, ): boolean {
    let token = this.sharedDataProvider.token;
    console.log("canActivate : " + token);
    // return true;
    
    this.config.get(this.config.url+"authenticate",'',(data:any)=>{
      console.log("data : " + JSON.stringify(data));
    }, (error:any) => {
    });
    return true;
    // if(!this.ob.isEmptyField(this.sharedDataProvider.person_id) && this.sharedDataProvider.person_id >0 ){
    //   console.log('success auth : ' + this.sharedDataProvider.person_id);
    //   return true;
    // }
    // console.log('fail auth');
    // this.router.navigateByUrl("", { replaceUrl: true });
    // return false;
  }
}
