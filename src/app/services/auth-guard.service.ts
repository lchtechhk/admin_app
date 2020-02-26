import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { SharedDataProvider } from '../providers/shared-data';
import { ObjectUtils } from '../providers/ObjectUtils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private sharedDataProvider : SharedDataProvider,
    private router: Router,
    public ob: ObjectUtils) {
    console.log("AuthGuardService");
  }

  canActivate(route: ActivatedRouteSnapshot, ): boolean {
    if(!this.ob.isEmptyField(this.sharedDataProvider.person_id) && this.sharedDataProvider.person_id >0 ){
      console.log('success auth : ' + this.sharedDataProvider.person_id);
      return true;
    }
    console.log('fail auth');
    this.router.navigateByUrl("", { replaceUrl: true });
    return false;
  }
}
