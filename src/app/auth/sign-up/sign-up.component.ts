import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const fullName = form.value.fullName
    const email = form.value.email
    const password = form.value.password

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userData => {
        console.log(userData)
        userData.user.sendEmailVerification()
        return firebase.database().ref('users/' + userData.user.uid).set({
          email: email,
          uid: userData.user.uid,
          registrationDate: new Date().toString(),
          name: fullName
        })
          .then(() => firebase.auth().signOut())
      })
      .catch(err => {
        console.log(err)
      })
  }
}
