import { Component } from '@angular/core';
import { TranslationService } from './shared/services/translation.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslationService) {
    this.translate.setLanguage(this.translate.lang);
    this.showSplashSCreen();
  }

  async showSplashSCreen() {
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true
    });
  }
}
