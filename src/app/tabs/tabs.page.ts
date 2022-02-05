import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ScreensizeService } from '../screensize.service'; 
import { ActionSheetController, IonTabs } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    
    isDesktop: boolean; 
     public progress = false;
    public log = false; 
  userId: string;
  @ViewChild('tabs', { static: false }) tabs: IonTabs;

  constructor(
      private router: Router, 
      public actionSheetController: ActionSheetController,
      public afAuth: AngularFireAuth, private screensizeService: ScreensizeService) {
          this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
      this.progress = true; 
          this.afAuth.authState.subscribe(auth => {
        if(auth){
            this.log = true;  
            this.progress = false;
          this.userId = auth.uid; 
        } else {
            this.log = false;
            this.progress = false;
        }
      });
  }
  
  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [ { 
        text: 'Video',
        icon: 'videocam',
        handler: () => {
          this.router.navigateByUrl('/new-video');
          
        }
      }, {
        text: 'Image', 
        icon: 'image',
        handler: () => {
          this.router.navigateByUrl('/new-image');
        }
      }, {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        } 
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  
  selectedTab: string = 'tab1';
  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
  }
 

}
