import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afDB: AngularFireDatabase,) { }

  saveUser(userId: string, obj: any) {
    return this.afDB.object('Users/' + userId).set({...obj}); 
  }
}
