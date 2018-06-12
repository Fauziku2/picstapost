import * as firebase from 'firebase/app'
import 'firebase/database'

export class MyfireService {

  public getUserFromDatabase(uid) {
    const ref = firebase.database().ref('users/' + uid)
    return ref.once('value')
      .then(snapshot => snapshot.val())
  }
}
