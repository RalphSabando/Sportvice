import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController, private translationService: TranslateService) { }

  async showToast(message: string = this.translationService.instant('common.something_wrong')) {
    const toast = await this.toastController.create({ 
      message: message,
      duration: 3000,
      position: 'top'  
    });
    toast.present();
  }  
}
