import { Component, OnDestroy, OnInit } from '@angular/core'
import * as firebase from 'firebase/app'
import 'firebase/database'
import _ from 'lodash'
import { MyfireService } from '../shared/myfire.service'
import { NotificationService } from '../shared/notification.service'

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnDestroy {
  allPosts: any = []
  allPostsref: any
  loadMoreRef: any

  constructor(private myFireService: MyfireService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.allPostsref = firebase.database().ref('allposts').limitToFirst(3)
    this.allPostsref.on('child_added', data => {
      this.allPosts.push({
        key: data.key,
        data: data.val()
      })
    })
  }

  // ensure that when i navigate away from all-post section, the listener is off, otherwise add to memory
  // prevent app from freezing, always turn a child_added listener off
  ngOnDestroy(): void {
    this.allPostsref.off()
    if (this.loadMoreRef) {
      this.loadMoreRef.off()
    }
  }

  onLoadMore() {
    if (this.allPosts.length > 0) {

      // using lodash to capture the last element in the allPosts array
      const lastLoadedPost = _.last(this.allPosts)
      const lastLoadedPostKey = lastLoadedPost.key
      this.loadMoreRef = firebase.database().ref('allposts').startAt(null, lastLoadedPostKey).limitToFirst(3 + 1)
      this.loadMoreRef.on('child_added', data => {
        if (data.key === lastLoadedPostKey) {
          return
        }
        this.allPosts.push({
          key: data.key,
          data: data.val()
        })
      })
    }
  }

  onFavoritesClicked(imageData) {
    this.myFireService.handleFavouriteClicked(imageData)
      .then(data => {
        this.notificationService.display('success', 'Image added to favourites')
      })
      .catch(err => {
        this.notificationService.display('error', 'Error adding image image to favourites')
      })
  }
}
