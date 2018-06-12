import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { NotificationService } from '../../shared/notification.service'
import { MyfireService } from '../../shared/myfire.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private notificationService: NotificationService,
              private myFireService: MyfireService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email
    const password = form.value.password
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userData => {
        if (userData.user.emailVerified) {
          return this.myFireService.getUserFromDatabase(userData.user.uid)
        } else {
          const message = 'Your email is not yet verified.'
          this.notificationService.display('error', message)
          firebase.auth().signOut()
        }
      })
      .then(userDataFromDataBase => {
        if (userDataFromDataBase) {
          // todo:
          console.log(userDataFromDataBase)
        }
      })
      .catch(err => {
        this.notificationService.display('error', err.message)
      })
  }
}
