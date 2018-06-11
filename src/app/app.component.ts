import { Component, OnInit } from '@angular/core'
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app'

  ngOnInit(): void {
    const config = {
      apiKey: 'AIzaSyAGo7BMNPlUaHzY1NuBlgNKu3WjO8uRmJo',
      authDomain: 'picstapost.firebaseapp.com',
      databaseURL: 'https://picstapost.firebaseio.com',
      projectId: 'picstapost',
      storageBucket: 'picstapost.appspot.com',
      messagingSenderId: '1043765887040'
    }
    firebase.initializeApp(config)
  }
}
