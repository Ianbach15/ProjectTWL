import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl:any='https://gorest.co.in/public/v2/';
  constructor(
    public http:HttpClient
  ) { }

httpOptions:any;
 getToken()
 {
  this.httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer aa2d21fcb0424c3b604216065138a0e434923b6a5bff31a14af2d5407b745b98'
    })
  }
 }

  get(url: any)
 {
   this.getToken();
   return this.http.get(this.serverUrl+url,this.httpOptions);
 }

 post(url: any,data: any)
 {
  this.getToken();
  return this.http.post(this.serverUrl+url,data,this.httpOptions);
 }

 put(url: any,data: any)
 {
  this.getToken();
  return this.http.put(this.serverUrl+url,data,this.httpOptions);
 }

delete(url: any)
 {
  this.getToken();
  return this.http.delete(this.serverUrl+url,this.httpOptions);
 }
 

 //register
 register(email: any,password: any)
 {
   return this.http.post(this.serverUrl+'auth/register',{email:email,password:password});
 }

 login(email: any,password: any)
 {
   return this.http.post(this.serverUrl+'auth/login',{email:email,password:password});
 }

 
//upload file
upload(file: any)
{
   return this.http.post(this.serverUrl+'upload/book',file);
}




}