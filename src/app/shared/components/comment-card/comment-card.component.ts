import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {

  @Input() comment: any;
  profileImg: string = `assets/profile_avatar_placeholder.png`;
  constructor( private domSanitize: DomSanitizer) { }

  ngOnInit() {}

  sanitizeHtml(content: string) {
    return this.domSanitize.bypassSecurityTrustHtml(content);
  }

  convertToTime(timeStamp): string {
    return moment(timeStamp).format('LT');
  }

}
