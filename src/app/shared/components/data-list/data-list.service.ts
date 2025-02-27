import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DataListService {
    private responseSubject = new ReplaySubject<any>(1);
    response$ = this.responseSubject.asObservable();

    private remoteFilterSubject = new BehaviorSubject<any>(null);
    remoteFilter$ = this.remoteFilterSubject.asObservable();

    remoteFilter(options: any): Promise<any> {
        this.responseSubject.next(null);
        this.remoteFilterSubject.next(options);

        return new Promise((resolve, reject) => {
            this.response$.subscribe({
            next: (response) => {
                if (response === null) return; // Ignore null values
                resolve(response);

                // Reset subject after handling
                this.remoteFilterSubject.next(null);
            },
            error: (err) => {
                reject(err);
            }
            });
        });
    }

    sendResponse(response) {
        this.responseSubject.next(response)
    }

}