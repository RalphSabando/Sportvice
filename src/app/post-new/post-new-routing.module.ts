import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostNewPage } from './post-new.page';

const routes: Routes = [
  {
    path: '',
    component: PostNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostNewPageRoutingModule {}
