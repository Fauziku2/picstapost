import { Component, OnInit } from '@angular/core'
import * as firebase from 'firebase/app'
import 'firebase/auth'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  isLoggenIn: boolean = false

  constructor() { }

  ngOnInit() {
    if (firebase.auth().currentUser) {
      this.isLoggenIn = true
    } else {
      this.isLoggenIn = false
    }
  }

}
