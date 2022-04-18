import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../pages/companies_admin/companies_admin/companies_admin.component';
import { environment } from './Users.Servis';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    /**
     *
     */
    baseURL = environment.baseUrl;  //http://jakubtest.westeurope.cloudapp.azure.com/api/tickets

    constructor(private http:HttpClient )  {
    }

    getTickets(): Observable<any>{      //       `${this.baseUrl}/api/tickets`
        return this.http.get(`${this.baseURL}/api/tickets`);
    }

    get(id: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/tickets/${id}`);
    }

    getAll(): Observable<any> {
        return this.http.get<Ticket>(`${this.baseURL}/api/tickets/all`);
    }

    getNextNumber(): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/tickets/number`);
    }

    getSelection(): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/tickets/selection`);
    }

    getValidateNumber(number: any): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/tickets/validateNumber/?ticketsNumber=${number}`);
    }

    save( id: any, ticket: Ticket): Observable<any>{
        return this.http.put<Ticket>(`${this.baseURL}/api/tickets/${id}`,ticket);
    }

    delete(id: any): Observable<any>{
        return this.http.delete(`${this.baseURL}/api/tickets/${id}`);
    }

    add(ticket: Ticket): Observable<any>{
        //ticket.event_name - nastavit ID eventu
        return this.http.post<Ticket>(`${this.baseURL}/api/tickets`, ticket);
    }

    getTicketByName(ticketName: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/tickets/name/${ticketName}`);
    }
    
    getTicketByUser( id: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/tickets/user/${id}`);
    }
}
