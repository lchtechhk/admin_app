import { Injectable } from '@angular/core';
import { ActionSheetController, Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';


@Injectable()
export class UIProvider {
  isLoading = false;

  constructor(private actionSheetController: ActionSheetController, private alertCtrl: AlertController,private loadingCtrl: LoadingController) { 
  };

  public async presentAlert(title,message,left_action_name,left_action,right_action_name,right_action) {
      if(left_action_name == null) left_action_name = '取消';
      if(right_action_name == null) right_action_name = '確定';
      const  alert = await this.alertCtrl.create({
        header: title,
        message: message,
        buttons: [
          {
            text: left_action_name,
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: right_action_name,
            handler: right_action
          }
        ]
      });
      await alert.present();
    }
    public async presentSingleAlert(title,message,left_action_name,left_action) {
      if(left_action_name == null) left_action_name = '確定';
      let alert = await this.alertCtrl.create({
        header: title,
        message: message,
        buttons: [
          {
            text: left_action_name,
            role: 'cancel',
            handler: left_action
          }
        ]
      });
      await alert.present();
    }

    public async presentLoadingDefault() {
      this.isLoading = true;

      return await this.loadingCtrl.create({
        duration: 5000,
      }).then(a => {
          a.present().then(() => {
            if (!this.isLoading) {
              a.dismiss().then(() => console.log('abort presenting'));
            }
          });
      });
    }

    public async dismissLoadingDefault() {
      this.isLoading = false;
      return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
    }


}

