import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Register } from "../pages/register/models/register.model";
import { Login } from "../pages/login/models/login.model";
import { TOKEN_KEY, USER_DATA_KEY } from "../shared/common.constants";

@Injectable()
export class AccountService {
    private readonly url: string = 'http://localhost:3001/account';

    constructor(private http: HttpClient) { }

    public register(model: Register): Observable<any> {
        const headers = new HttpHeaders();

        headers.append('Content-type', 'application/json');
        
        return this.http.post(`${this.url}/register`, model);
    }

    public login(model: Login): Observable<any> {
        return this.http.post(`${this.url}/login`, model);
    }

    public logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
    }

    public isLoggedIn(): Observable<boolean> {
        const token: string = localStorage.getItem(TOKEN_KEY) ?? '';
        const tokenHeader = new HttpHeaders({ 'Authorization': token });

        return this.http.get<boolean>(`${this.url}/isLoggedIn`, { headers: tokenHeader });
    }
}