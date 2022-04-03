import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from '../pages/companies_admin/companies_admin/companies_admin.component';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    /**
     *
     */
    constructor(private http:HttpClient )  {
    }

    getEvents(): Observable<any>{
        return this.http.get("https://localhost:7007/api/events");
    }

    get(id: any): Observable<any>{
        return this.http.get(`https://localhost:7007/api/events/${id}`);
    }

    getAll(): Observable<any> {
        return this.http.get<Events[]>('https://localhost:7007/api/events/all');
    }

    getNextNumber(): Observable<number> {
        return this.http.get<number>('https://localhost:7007/api/events/number');
    }

    getSelection(): Observable<number> {
        return this.http.get<number>('https://localhost:7007/api/events/selection');
    }

    getValidateNumber(number: any): Observable<number> {
        return this.http.get<number>(`https://localhost:7007/api/events/validateNumber/?eventsNumber=${number}`);
    }

    save( id: any, event: Events): Observable<any>{
        return this.http.put<Event>(`https://localhost:7007/api/events/${id}`,event);
    }

    delete(id: any): Observable<any>{
        return this.http.delete(`https://localhost:7007/api/events/${id}`);
    }

    add(event: Events): Observable<any>{
        event.user_id = 1; //osetrit pridat ID prihlaseneho usera
        return this.http.post<Event>(`https://localhost:7007/api/events`, event);
    }
    
}