import { Injectable } from '@angular/core';


@Injectable()
export class CommonProvider {
  constructor() { };

   public numberToDay(number:Number) {
      switch(number){
        case 0:
        return "日";
        case 1:
        return "一";
        case 2:
        return "二";
        case 3:
        return "三";
        case 4:
        return "四";
        case 5:
        return "五";
        case 6:
        return "六";
      }
  }

  public getWeekByDate(d : Date) {
    // var date = new Date(d);
    // date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // return date.getFullYear();
  }
}