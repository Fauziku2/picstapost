import { Component, OnDestroy, OnInit } from '@angular/core'
import { MyfireService } from '../shared/myfire.service'
import { NotificationService } from '../shared/notification.service'
import * as firebase from 'firebase/app'
import 'firebase/auth'

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit, OnDestroy {
  personalPostsRef: any
  postLists: any = []

  constructor(private myFireService: MyfireService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid
    this.personalPostsRef = this.myFireService.getUserPostsRef(uid)
    this.personalPostsRef.on('child_added', data => {
      this.postLists.push({
        key: data.key,
        data: data.val()
      })
    })
  }

  // ensure that when i navigate away from my-post section, the listener is off, otherwise add to memory
  // prevent app from freezing, always turn a child_added listener off
  ngOnDestroy(): void {
    this.personalPostsRef.off()
  }

  onFileSelection(event: any) {
    const fileList: FileList = event.target.files

    if (fileList.length > 0) {
      const file: File = fileList[0]
      this.myFireService.uploadFile(file)
        .then(data => {
          this.notificationService.display('success', 'Picture Successfully uploaded!!')
          this.myFireService.handleImageUpload(data)
        })
        .catch(err => {
          this.notificationService.display('error', err.message)
        })
    }
  }
}
