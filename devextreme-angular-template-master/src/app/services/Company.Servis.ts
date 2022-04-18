import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../pages/companies_admin/companies_admin/companies_admin.component';
import { environment } from './Users.Servis';


@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    /**
     *
     */
    baseURL = environment.baseUrl;

    constructor(private http:HttpClient )  {
    }

    getCompanies(): Observable<any>{
        return this.http.get(`${this.baseURL}/api/companies`);
    }

    get(id: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/companies/${id}`);
    }

    getAll(): Observable<any> {
        return this.http.get<Company[]>(`${this.baseURL}/api/companies/all`);
    }

    getNextNumber(): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/companies/number`);
    }

    getSelection(): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/companies/selection`);
    }

    getValidateNumber(number: any): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/api/companies/validateNumber/?companiesNumber=${number}`);
    }

    save( id: any, company: Company): Observable<any>{
        return this.http.put<Company>(`${this.baseURL}/api/companies/${id}`,company);
    }

    delete(id: any): Observable<any>{
        return this.http.delete(`${this.baseURL}/api/companies/${id}`);
    }

    add(company: Company): Observable<any>{
        return this.http.post<Company>(`${this.baseURL}/api/companies`, company);
    }

    getCompanyByName(companyName: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/companies/name/${companyName}`);
    }

    getEventsByCompanyId( id: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/companies/company/${id}`);
    }

    getCompanyByName2(companyName: any): Observable<any>{
        return this.http.get(`${this.baseURL}/api/companies/getCompany/${companyName}`);
    }
    
}