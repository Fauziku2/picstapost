import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { UserService } from '../shared/user.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false
  name: string
  uid: string
  email: string
  test: any

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    // can be deleted
    this.userService.statusChange.subscribe(userData => {
      if (userData) {
        this.name = userData.name
        this.email = userData.email
        this.uid = userData.uid
      } else {
        this.name = null
        this.email = null
        this.uid = null
      }
    })

    firebase.auth().onAuthStateChanged(userData => {
      // we are logged in
      if (userData && userData.emailVerified) {
        this.isLoggedIn = true
        const user = this.userService.getProfile()
        if (user) {
          this.name = user.name
          this.email = user.email
          this.uid = user.uid
        }
        this.router.navigate(['/allposts'])
      } else {
        this.isLoggedIn = false
      }
    })
  }

  onLogout() {
    firebase.auth().signOut()
      .then(() => {
        this.userService.destroy()
        this.isLoggedIn = false
      })
  }
}
