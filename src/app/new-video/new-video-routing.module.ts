import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewVideoPage } from './new-video.page';

const routes: Routes = [
  {
    path: '',
    component: NewVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewVideoPageRoutingModule {}
