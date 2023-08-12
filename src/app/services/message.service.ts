import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private message$$ = new Subject<string>();

  message$ = this.message$$.asObservable();

  constructor() { }

  showMessage(text: string) {
    this.message$$.next(text);
  }
}
