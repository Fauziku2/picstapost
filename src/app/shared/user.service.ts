import { EventEmitter } from '@angular/core'

export class UserService {
  // can be deleted
  statusChange: any = new EventEmitter<any>()

  public set(userFromDatabase) {
    localStorage.setItem('user', JSON.stringify(userFromDatabase))
    // can be deleted
    this.statusChange.emit(userFromDatabase)
  }

  public getProfile() {
    const user = localStorage.getItem('user')
    return JSON.parse(user)
  }

  public destroy() {
    localStorage.removeItem('user')
    // can be deleted
    this.statusChange.emit(null)
  }
}
