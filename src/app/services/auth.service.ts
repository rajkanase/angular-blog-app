import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  domain="http://localhost:1000";
  authToken;
  user;
  options;
  headerOptions;
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(
    private http:HttpClient
  ) {
  }

  createAuthenticationHeaders(){
    this.loadToken();
    this.options = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':this.authToken}  );
  }

  loadToken(){
    this.authToken=localStorage.getItem('token');
  }

  registerUser(user){
    return this.http.post(this.domain + '/api/register',user, {headers: this.headers});
  }

  checkEmail(email){
    return this.http.get(this.domain + '/api/checkEmail' + email);
  }

  checkUsername(username){
    return this.http.get(this.domain + '/api/checkUsername' + username);
  }

  login(user){
    return this.http.post(this.domain + '/api/login', user, {headers:this.headers});
  }

  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }

  loggedIn() {
    return tokenNotExpired();
  }

  storeUserData(token,user){
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  }

  getProfile(){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/api/profile', {headers: this.options});
  }

}
