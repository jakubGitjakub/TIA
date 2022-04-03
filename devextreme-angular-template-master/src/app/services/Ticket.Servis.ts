import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../pages/companies_admin/companies_admin/companies_admin.component';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    /**
     *
     */
    constructor(private http:HttpClient )  {
    }

    getTickets(): Observable<any>{
        return this.http.get("https://localhost:7007/api/tickets");
    }

    get(id: any): Observable<any>{
        return this.http.get(`https://localhost:7007/api/tickets/${id}`);
    }

    getAll(): Observable<any> {
        return this.http.get<Ticket>('https://localhost:7007/api/tickets/all');
    }

    getNextNumber(): Observable<number> {
        return this.http.get<number>('https://localhost:7007/api/tickets/number');
    }

    getSelection(): Observable<number> {
        return this.http.get<number>('https://localhost:7007/api/tickets/selection');
    }

    getValidateNumber(number: any): Observable<number> {
        return this.http.get<number>(`https://localhost:7007/api/tickets/validateNumber/?ticketsNumber=${number}`);
    }

    save( id: any, ticket: Ticket): Observable<any>{
        return this.http.put<Ticket>(`https://localhost:7007/api/tickets/${id}`,ticket);
    }

    delete(id: any): Observable<any>{
        return this.http.delete(`https://localhost:7007/api/tickets/${id}`);
    }

    add(ticket: Ticket): Observable<any>{
        return this.http.post<Ticket>(`https://localhost:7007/api/tickets`, ticket);
    }
    
}