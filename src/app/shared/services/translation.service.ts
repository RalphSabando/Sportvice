import { ResourceLoader } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  public lang = localStorage.getItem('appLanguage') || "en";
  constructor(
  private ts: TranslateService
  ) { }

  setLanguage(lang: string = "en"): void {
    this.ts.use(lang);
    this.lang = lang;
    localStorage.setItem('appLanguage', lang);
  }
}
