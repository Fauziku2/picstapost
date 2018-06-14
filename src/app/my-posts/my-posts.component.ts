import { Component, OnInit } from '@angular/core';
import { MyfireService } from '../shared/myfire.service'
import { NotificationService } from '../shared/notification.service'

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  constructor(private myFireService: MyfireService,
              private notificationService: NotificationService) { }

  ngOnInit() {
  }

  onFileSelection(event: any) {
    const fileList: FileList = event.target.files

    if (fileList.length > 0) {
      const file: File = fileList[0]
      this.myFireService.uploadFile(file)
        .then(data => {
          this.notificationService.display('success', 'Picture Successfully uploaded!!')
        })
        .catch(err => {
          this.notificationService.display('error', err.message)
        })
    }
  }
}
