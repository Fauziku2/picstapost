import { CanActivate } from '@angular/router'
import * as firebase from 'firebase/app'

export class RouteGuard implements CanActivate {
  canActivate() {
    // if we are logged in...return true....else return false
    if (firebase.auth().currentUser) {
      return true
    }
    return false
  }
}
