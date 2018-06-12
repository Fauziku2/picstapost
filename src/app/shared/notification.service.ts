import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'


@Injectable()
export class NotificationService {
  private _sub: Subject<{type: string, message: string}> = new BehaviorSubject(null)
  public emitter: Observable<{type: string, message: string}> = this._sub.asObservable()

  public display(type: string, message: string) {
    this._sub.next({type, message})
  }
}
