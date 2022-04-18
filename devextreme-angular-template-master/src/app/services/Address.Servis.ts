import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../pages/users/users/users.component';
import { environment } from './Users.Servis';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    /**
     *
     */
    baseURL = environment.baseUrl;

    constructor(private http:HttpClient )  {
    }

    getAddress(): Observable<any>{
        return this.http.get(`${this.baseURL}/api/addresses`);
    }

    get(id: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/addresses/${id}`);
    }

    getNextNumber(): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/addresses/number`);
    }

    add(address: Address): Observable<any>{
        return this.http.post<Address>(`${this.baseURL}/api/addresses`, address);
    }
}