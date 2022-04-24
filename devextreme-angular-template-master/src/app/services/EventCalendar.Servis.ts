import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventCalendar } from '../pages/companies_admin/companies_admin/companies_admin.component';
import { environment } from './Users.Servis';


@Injectable({
    providedIn: 'root'
})
export class EventCalendarService {
    /**
     *
     */
    baseURL = environment.baseUrl;

    constructor(private http:HttpClient )  {
    }

    getEventCalendar(): Observable<any>{
        return this.http.get(`${this.baseURL}/api/eventCalendars`);
    }

    get(id: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/eventCalendars/${id}`);
    }

    getAll(): Observable<any> {
        return this.http.get<EventCalendar[]>(`${this.baseURL}/api/eventCalendars/all`);
    }

    getNextNumber(): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/eventCalendars/number`);
    }

    getSelection(): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/eventCalendars/selection`);
    }

    getValidateNumber(number: any): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/eventCalendars/validateNumber/?eventCalendarsNumber=${number}`);
    }

    save( id: any, eventCalendar: EventCalendar): Observable<any>{
        return this.http.put<EventCalendar>(`${this.baseURL}/api/eventCalendars/${id}`,eventCalendar);
    }

    delete(id: any): Observable<any>{
        return this.http.delete(`${this.baseURL}/api/eventCalendars/${id}`);
    }

    add(eventC: EventCalendar): Observable<any>{
        return this.http.post<EventCalendar>(`${this.baseURL}/api/eventCalendars`, eventC);
    }

    getByCompanyId( id: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/eventCalendars/company/${id}`);
    }

    getEventCalendarByName(ticketName: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/eventCalendars/name/${ticketName}`);
    }
    
}