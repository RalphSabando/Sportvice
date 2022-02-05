import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {

  profileImg: string = `assets/profile_avatar_placeholder.png`;
  @Input() post: any;
  constructor() { }

  ngOnInit() {}

}
