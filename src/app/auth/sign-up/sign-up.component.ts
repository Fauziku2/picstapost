import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { NotificationService } from '../../shared/notification.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const fullName = form.value.fullName
    const email = form.value.email
    const password = form.value.password

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userData => {
        userData.user.sendEmailVerification()
        const message = `A verification email has been sent to ${email}. Kindly check your inbox and follow the steps.
        Once verification is completed, please login to the application.`
        this.notificationService.display('success', message)

        return firebase.database().ref('users/' + userData.user.uid).set({
          email: email,
          uid: userData.user.uid,
          registrationDate: new Date().toString(),
          name: fullName
        })
          .then(() => firebase.auth().signOut())
      })
      .catch(err => {
        this.notificationService.display('error', err.message)
      })
  }
}

