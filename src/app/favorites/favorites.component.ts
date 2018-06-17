import { Component, OnInit } from '@angular/core';
import { MyfireService } from '../shared/myfire.service'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoritesList: any = []

  constructor(private myFireService: MyfireService) { }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid
    const favRef = firebase.database().ref('favourites').child(uid)
    favRef.once('value').then(snapshot => {
      const favouriteObj = snapshot.val()
      this.favoritesList = Object.values(favouriteObj)
      console.log(this.favoritesList)
    })
  }

}
