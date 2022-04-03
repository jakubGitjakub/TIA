import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../pages/users/users/users.component';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    /**
     *
     */
    constructor(private http:HttpClient )  {
    }

    getUsers(): Observable<any>{
        return this.http.get("https://localhost:7007/api/users");
    }

    get(id: any): Observable<any>{
        return this.http.get(`https://localhost:7007/api/users/${id}`);
    }

    getAll(): Observable<any> {
        return this.http.get<User[]>('https://localhost:7007/api/users/all');
    }

    getNextNumber(): Observable<number> {
        return this.http.get<number>('https://localhost:7007/api/users/number');
    }

    getSelection(): Observable<number> {
        return this.http.get<number>('https://localhost:7007/api/users/selection');
    }

    getValidateNumber(number: any): Observable<number> {
        return this.http.get<number>(`https://localhost:7007/api/users/validateNumber/?customerNumber=${number}`);
    }

    save( id: any, user: User): Observable<any>{
        return this.http.put<User>(`https://localhost:7007/api/users/${id}`,user);
    }

    delete(id: any): Observable<any>{
        return this.http.delete(`https://localhost:7007/api/users/${id}`);
    }

    add(user: User): Observable<any>{
        user.Password = "noveHeslo";
        return this.http.post<User>(`https://localhost:7007/api/users`, user);
    }
    
}