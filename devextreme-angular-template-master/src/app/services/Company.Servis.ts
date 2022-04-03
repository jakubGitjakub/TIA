import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../pages/companies_admin/companies_admin/companies_admin.component';


@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    /**
     *
     */
    constructor(private http:HttpClient )  {
    }

    getCompanies(): Observable<any>{
        return this.http.get("https://localhost:7007/api/companies");
    }

    get(id: any): Observable<any>{
        return this.http.get(`https://localhost:7007/api/companies/${id}`);
    }

    getAll(): Observable<any> {
        return this.http.get<Company[]>('https://localhost:7007/api/companies/all');
    }

    getNextNumber(): Observable<number> {
        return this.http.get<number>('https://localhost:7007/api/companies/number');
    }

    getSelection(): Observable<number> {
        return this.http.get<number>('https://localhost:7007/api/companies/selection');
    }

    getValidateNumber(number: any): Observable<number> {
        return this.http.get<number>(`https://localhost:7007/api/companies/validateNumber/?companiesNumber=${number}`);
    }

    save( id: any, company: Company): Observable<any>{
        return this.http.put<Company>(`https://localhost:7007/api/companies/${id}`,company);
    }

    delete(id: any): Observable<any>{
        return this.http.delete(`https://localhost:7007/api/companies/${id}`);
    }

    add(company: Company): Observable<any>{
        return this.http.post<Company>(`https://localhost:7007/api/companies`, company);
    }
    
}