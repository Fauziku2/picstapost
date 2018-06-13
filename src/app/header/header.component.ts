import { Component, OnInit } from '@angular/core'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { UserService } from '../shared/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false

  constructor(private userService: UserService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(userData => {
      // we are logged in
      if (userData && userData.emailVerified) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    })
  }

  onLogout() {
    firebase.auth().signOut()
      .then(() => {

      })
  }

}
