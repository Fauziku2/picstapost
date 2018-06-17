import { Component, OnDestroy, OnInit } from '@angular/core'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import _ from 'lodash'
import { MyfireService } from '../shared/myfire.service'

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit, OnDestroy {
  refArray: any = []
  postList: any = []

  constructor(private myFireService: MyfireService) {
  }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid
    const followRef = firebase.database().ref('follow').child(uid)
    followRef.once('value', data => {
      const uidListOfOtherUsers = _.keys(data.val())
      this.getPostsFromOtherUsers(uidListOfOtherUsers)
    })
  }

  ngOnDestroy(): void {
    this.refArray.forEach(ref => {
      if (ref && typeof(ref) === 'object') {
        ref.off()
      }
      ref.off()
    })
  }

  getPostsFromOtherUsers(uidList) {
    uidList.forEach((uid, index) => {
      this.refArray[index] = this.myFireService.getUserPostsRef(uid)
      this.refArray[index].on('child_added', data => {
        this.postList.push({
          key: data.key,
          data: data.val()
        })
      })
    })
  }

}
