import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopingHistories } from '../pages/history/history.component';
import { environment } from './Users.Servis';

@Injectable({
    providedIn: 'root'
})
export class HistoryService {
    /**
     *
     */
    baseURL = environment.baseUrl;

    constructor(private http:HttpClient )  {
    }

    getHistory(): Observable<any>{
        return this.http.get(`${this.baseURL}/api/shopingHistories`);
    }

    get(id: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/shopingHistories/${id}`);
    }

    add(shopingHistory: ShopingHistories): Observable<any>{
        return this.http.post<History>(`${this.baseURL}/api/shopingHistories`, shopingHistory);
    }

    
}