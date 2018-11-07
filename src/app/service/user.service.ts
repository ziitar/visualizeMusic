import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../class/user';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {
  userUrl = environment.baseUrl + 'user/';
  constructor(private http: Http ) { }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  getUser(): Promise<User> {
    return this.http.get(this.userUrl + 'user')
      .toPromise()
      .then(res => res.json() as User)
      .catch(this.handleError);
  }
  /*
  *  登录
  * */
  login(form: any): Promise<any> {
    return this.http.post(this.userUrl + 'login', form)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  /*
  *  注册
  * */
  register(form: any): Promise<any> {
    return this.http.post(this.userUrl + 'register', form)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  chickName(name: string): Promise<any> {
    return this.http.get(this.userUrl + 'name?username=' + name)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  signOut(): Promise<any> {
    return this.http.get(this.userUrl + 'login')
      .toPromise()
      .then(res => res['_body'])
      .catch(this.handleError);
  }
}
