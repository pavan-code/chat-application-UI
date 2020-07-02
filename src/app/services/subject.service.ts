import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private aliceMsgSource = new Subject<string>();
  aliceMsgsource$ = this.aliceMsgSource.asObservable();

  constructor() { }

  sendMsg(message: string) {
    this.aliceMsgSource.next(message);
  }
}
