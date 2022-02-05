import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SudoPage } from './sudo.page';

const routes: Routes = [
  {
    path: '',
    component: SudoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SudoPageRoutingModule {}
