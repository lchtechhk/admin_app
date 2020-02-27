import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { SharedDataProvider } from '../providers/shared-data';
import { ObjectUtils } from '../providers/ObjectUtils';
import { ConfigProvider } from '../providers/ConfigProvider';
import { UIProvider } from '../providers/UIProvider';
import { AuthService } from '../services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public uiProvider: UIProvider,
    public config : ConfigProvider,
    private sharedDataProvider : SharedDataProvider,
    private authService : AuthService,
    private router: Router,
    public ob: ObjectUtils) {
    console.log("AuthGuardService");
  }

  async canActivate(route: ActivatedRouteSnapshot, ): Promise<boolean> {
    console.log("canActivate");
    const a = await this.authService.authenticate();
    console.log("canActivate end");
    if(a.status){
      return true; 
    }else {
      this.router.navigateByUrl("", { replaceUrl: true });
      return false;
    }
  }
}
