export class UserService {

  public set(userFromDatabase) {
    localStorage.setItem('user', JSON.stringify(userFromDatabase))
  }

  public destroy() {
    localStorage.removeItem('user')
  }

}
