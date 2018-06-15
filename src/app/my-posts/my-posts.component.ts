import { Component, OnInit } from '@angular/core';
import { MyfireService } from '../shared/myfire.service'
import { NotificationService } from '../shared/notification.service'
import * as firebase from 'firebase/app'
import 'firebase/auth'

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
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
