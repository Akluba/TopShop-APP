import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Headers, Response} from '@angular/http';
import {User} from '../user';


@Injectable()
export class AuthService {

    constructor(private http: Http) {
    }

    private oauthUrl = "http://localhost:8888/oauth/token";
    private usersUrl = "http://localhost:8888/api/users";

    getAccessToken() {
        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        let postData = {
            grant_type: "password",
            client_id: 2,
            client_secret: "hA7WQJVYl65dcoINH0GcwOvNhKe84le8yzF46dmR",
            username: "ak@gmail.com",
            password: "password",
            scope: ""
        }

        return this.http.post(this.oauthUrl, JSON.stringify(postData), {
            headers: headers
        })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUsers(accessToken: string): Observable<User[]> {

        var headers = new Headers({
            "Accept": "application/json",
            "Authorization": "Bearer " + accessToken,
        });

        return this.http.get(this.usersUrl, {
            headers: headers
        })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}