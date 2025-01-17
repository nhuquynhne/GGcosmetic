import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClientService } from './httpClient.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient, private httpService: HttpClientService){}

  //#region CRUD
  search(data: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: httpParams
    };
    return this.http.get(`${environment.baseUrl}${environment.basePath}/user`, httpOptions);
  }

  create(data: any): Observable<any> {
    data = JSON.parse(data);
    return this.http.post(`${environment.baseUrl}${environment.basePath}/user`, data);
  }

  update(data: any): Observable<any> {
    const jsonData = JSON.stringify(data);
    return this.http.put(`${environment.baseUrl}${environment.basePath}/user/` + data.id, jsonData, this.httpOptions);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}${environment.basePath}/user/` + id);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}${environment.basePath}/user/` + id);
  }

  block(id: string): Observable<any> {
    return this.http.put(`${environment.baseUrl}${environment.basePath}/user/block/` + id, '');
  }

  recover(id: string): Observable<any> {
    return this.http.put(`${environment.baseUrl}${environment.basePath}/user/recover/` + id, '');
  }


  changePassword(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const params = new HttpParams({
      fromObject: {
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
        username: data.username,
      }
    });
    var urlencoded = new URLSearchParams();
    urlencoded.append("newPassword", data.newPassword);
    urlencoded.append("oldPassword", data.oldPassword);
    urlencoded.append("username", data.username);
    return this.http.put(`${environment.baseUrl}${environment.basePath}/me/change-password`, params, httpOptions);
  }

  getDiscount(id: string, data: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: httpParams
    };
    return this.http.get(`${environment.baseUrl}${environment.basePath}/user/discount/` + id, httpOptions);
  }

  getAddress(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}${environment.basePath}/address/user/` + id);
  }
  //#endregion

  //#region TOKEN
  getUserFromToken(token: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(token).forEach(function (key) {
      httpParams = httpParams.append(key, token[key]);
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: httpParams
    };
    return this.http.get(`${environment.baseUrl}${environment.basePath}/user/user-infor`, httpOptions);
  }

  getExpireTimeFromToken(token: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(token).forEach(function (key) {
      httpParams = httpParams.append(key, token[key]);
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: httpParams
    };
    return this.http.get(`${environment.baseUrl}${environment.basePath}/user/expireTime`, httpOptions);
  }
  //#endregion
}
