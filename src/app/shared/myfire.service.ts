import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import { UserService } from './user.service'
import { Injectable } from '@angular/core'

@Injectable()
export class MyfireService {

  constructor(private userService: UserService) {}

  public getUserFromDatabase(uid) {
    const ref = firebase.database().ref('users/' + uid)
    return ref.once('value')
      .then(snapshot => snapshot.val())
  }

  private generateRandomName() {
    let text = ''
    const possible = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrltuvwxyz0123456789'

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  public uploadFile(file: File) {
    const fileName = this.generateRandomName()
    // get the file format (.png, .jpeg, .jpg)
    const fileType = file.type.split('/')[1]
    const fileRef = firebase.storage().ref().child('image/' + fileName + '.' + fileType)
    const uploadTask = fileRef.put(file)

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', () => {
      }, error => {
        reject(error)
      }, () => {
        fileRef.getDownloadURL()
          .then(url => {
            const fileUrl = url
            resolve({ fileName: fileName, fileUrl: fileUrl })
          })
      })
    })
  }

  public handleImageUpload(data) {

    const user = this.userService.getProfile()

    const newPersonalPostKey = firebase.database().ref().child('myposts').push().key
    const personalDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString()
    }

    const allPostKey = firebase.database().ref('allposts').push().key
    const allPostsDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString(),
      uploadedBy: user
    }

    const imageDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString(),
      uploadedBy: user,
      favouriteCount: 0
    }

    const updates = {}
    updates['/myposts/' + user.uid + '/' + newPersonalPostKey] = personalDetails
    updates['/allposts/' + allPostKey] = allPostsDetails
    updates['/images/' + data.fileName] = imageDetails

    // with one call to firebase, I send an object(updates) with consist of 3 diff nodes(mypost, allpost, images)
    return firebase.database().ref().update(updates)
  }

  public getUserPostsRef(uid: string) {
    return firebase.database().ref('myposts').child(uid)
  }

  public handleFavouriteClicked(imageData) {
    const uid = firebase.auth().currentUser.uid
    const updates = {}
    updates['/images/' + imageData.name + '/oldfavouriteCount'] = imageData.favouriteCount
    updates['/images/' + imageData.name + '/favouriteCount'] = imageData.favouriteCount + 1
    updates['/favourites/' + uid + '/' + imageData.name] = imageData
    return  firebase.database().ref().update(updates)
  }

  public followUser(uploadedByUser) {
    const uid = firebase.auth().currentUser.uid
    const updates = {}
    updates['/follow/' + uid + '/' + uploadedByUser.uid] = true
    return firebase.database().ref().update(updates)
  }
}
