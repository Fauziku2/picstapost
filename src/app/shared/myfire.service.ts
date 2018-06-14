import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

export class MyfireService {

  public getUserFromDatabase(uid) {
    const ref = firebase.database().ref('users/' + uid)
    return ref.once('value')
      .then(snapshot => snapshot.val())
  }

  generateRandomName() {
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
      uploadTask.on('state_changed', snapshot => {

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
}
