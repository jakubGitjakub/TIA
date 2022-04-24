import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from '../pages/companies_admin/companies_admin/companies_admin.component';
import { environment } from './Users.Servis';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    /**
     *
     */
    baseURL = environment.baseUrl;

    constructor(private http:HttpClient )  {
    }

    getEvents(): Observable<any>{
        return this.http.get(`${this.baseURL}/api/events`);
    }

    get(id: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/events/${id}`);
    }

    getAll(): Observable<any> {
        return this.http.get<Events[]>(`${this.baseURL}/api/events/all`);
    }

    getNextNumber(): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/events/number`);
    }

    getSelection(): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/events/selection`);
    }

    getValidateNumber(number: any): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/events/validateNumber/?eventsNumber=${number}`);
    }

    save( id: any, event: Events): Observable<any>{
        return this.http.put<Event>(`${this.baseURL}/api/events/${id}`,event);
    }

    delete(id: any): Observable<any>{
        return this.http.delete(`${this.baseURL}/api/events/${id}`);
    }

    add(event: Events): Observable<any>{   
        return this.http.post<Event>(`${this.baseURL}/api/events`, event);
    }

    GetEventsByConfirm(verify: string): Observable<any>{
        return this.http.get(`${this.baseURL}/api/events/${verify}`);
    }

    confirmEvent( id: any, event: Events): Observable<any>{
        event.Verify_Status = true;
        return this.http.put<Event>(`${this.baseURL}/api/events/${id}`,event);
    }
    
    getEventsByUser( id: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/events/user/${id}`);
    }

    getEventsVerify(): Observable<any>{
        return this.http.get(`${this.baseURL}/api/events/verifyEvent/events`);
    }

    getEventByName(eventName: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/events/name/${eventName}`);
    }


}