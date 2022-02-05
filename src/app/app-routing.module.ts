import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'chatbox/:id', 
    loadChildren: () => import('./chatbox/chatbox.module').then( m => m.ChatboxPageModule)
  },
  {
    path: 'clubs',
    loadChildren: () => import('./clubs/clubs.module').then( m => m.ClubsPageModule)
  },
  {
    path: 'club/:id',
    loadChildren: () => import('./club/club.module').then( m => m.ClubPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'post-new',
    loadChildren: () => import('./post-new/post-new.module').then( m => m.PostNewPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'setup-profile',
    loadChildren: () => import('./setup-profile/setup-profile.module').then( m => m.SetupProfilePageModule)
  },
  {
    path: 'login-recover',
    loadChildren: () => import('./login-recover/login-recover.module').then( m => m.LoginRecoverPageModule)
  },
  {
    path: 'sudo',
    loadChildren: () => import('./sudo/sudo.module').then( m => m.SudoPageModule)
  },
  {
    path: 'cgu',
    loadChildren: () => import('./cgu/cgu.module').then( m => m.CguPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'new-video',
    loadChildren: () => import('./new-video/new-video.module').then( m => m.NewVideoPageModule)
  },
  {
    path: 'new-image',
    loadChildren: () => import('./new-image/new-image.module').then( m => m.NewImagePageModule)
  },
  {
    path: 'setup-profile',
    loadChildren: () => import('./setup-profile/setup-profile.module').then( m => m.SetupProfilePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
