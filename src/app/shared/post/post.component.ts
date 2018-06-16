import { Component, Input, OnInit } from '@angular/core'
import * as firebase from 'firebase/app'
import 'firebase/database'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() imageName: string
  @Input() displayPostedBy: boolean = true

  imageData: any = {}
  defaultImage: string = 'http://via.placeholder.com/150x150'

  constructor() { }

  ngOnInit() {
    firebase.database().ref('images').child(this.imageName)
      .once('value')
      .then(snapshot => {
        this.imageData = snapshot.val()
        this.defaultImage = this.imageData.fileUrl
      })
  }

}
