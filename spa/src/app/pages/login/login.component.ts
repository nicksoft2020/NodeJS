import { Component, OnDestroy, OnInit } from '@angular/core';
import { Login } from './models/login.model';
import { AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TOKEN_KEY, USER_DATA_KEY } from '../../shared/common.constants';

@Component({
	selector: 'app-login',
	standalone: false,
	
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
	public name: string = '';
	public email: string = '';
	public password: string = '';
	public confirmPassword: string = '';

	private readonly subs: Subscription[] = [];

	constructor(
		private router: Router,
		private accountService: AccountService
	) {}

	public ngOnInit(): void {
		
	}

	public ngOnDestroy(): void {
		this.subs.forEach(x => x.unsubscribe());
	}

	public login(): void {
		const user: Login = {
			email: this.email,
			password: this.password
		};

		this.subs.push(this.accountService.login(user).subscribe(response => {
			localStorage.setItem(TOKEN_KEY, response.token);
			localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.user));

			this.router.navigate(['dashboard']);
		}, () => {
			
		}));
	}
}
