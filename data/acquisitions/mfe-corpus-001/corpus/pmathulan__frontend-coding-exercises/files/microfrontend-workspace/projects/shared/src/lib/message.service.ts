import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    private messageSource = new BehaviorSubject<string>('Initial Message');
    message$ = this.messageSource.asObservable();

    setMessage(message: string) {
        this.messageSource.next(message);
    }
}
