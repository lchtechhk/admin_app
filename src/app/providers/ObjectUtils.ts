import { Injectable } from '@angular/core';

@Injectable()
export class ObjectUtils {
  constructor() { };

    public isEmptyField(x): boolean {
        if (x == undefined || x == "") {
          return true
        }
        return false;
    }
}

