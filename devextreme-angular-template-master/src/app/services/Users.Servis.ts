import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, User } from '../pages/users/users/users.component';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    /**
     *
     */
    baseURL = environment.baseUrl;

    constructor(private http:HttpClient )  {
    }

    getUsers(): Observable<any>{
        return this.http.get(`${this.baseURL}/api/users`);
    }

    get(id: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/users/${id}`);
    }

    getAll(): Observable<any> {
        return this.http.get<User[]>(`${this.baseURL}/api/users/all`);
    }

    getNextNumber(): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/users/number`);
    }

    getSelection(): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/users/selection`);
    }

    getValidateNumber(number: any): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/users/validateNumber/?customerNumber=${number}`);
    }

    save( id: any, user: User): Observable<any>{
        return this.http.put<User>(`${this.baseURL}/api/users/${id}`,user);
    }

    delete(id: any): Observable<any>{
        return this.http.delete(`${this.baseURL}/api/users/${id}`);
    }

    add(user: User): Observable<any>{
        user.password = "noveHeslo";
        return this.http.post<User>(`${this.baseURL}/api/users`, user);
    }

    GetUsersByConfirm(verify: string): Observable<any>{
        return this.http.get(`${this.baseURL}/api/users/${verify}`);
    }

    confirmUser( id: any, user: User): Observable<any>{
        user.verify_Status = true;
        return this.http.put<User>(`${this.baseURL}/api/users/${id}`,user);
    }

    saveAdress(id: any, address: Address): Observable<any>{
        return this.http.put<Address>(`${this.baseURL}/api/address/${id}`,address);
    }

    getUsersLogin(login: string, password: string): Observable<any>{
        return this.http.get(`${this.baseURL}/api/users/logVerify/${login}/${password}`);
    }
    
}

export const environment = {
    production: false,
    baseUrl: 'https://localhost:7007'  
    //http://jakubtest.westeurope.cloudapp.azure.com/
    //https://localhost:7007
};