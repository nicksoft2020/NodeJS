import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';
import { Register } from './models/register.model';

@Component({
	selector: 'app-register',
	standalone: false,
	
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
	public name: string = '';
	public email: string = '';
	public password: string = '';
	public confirmPassword: string = '';

	private readonly subs: Subscription[] = [];

	constructor(
		private accountService: AccountService
	) {}

	public ngOnInit(): void {
		
	}

	public ngOnDestroy(): void {
		this.subs.forEach(x => x.unsubscribe());
	}

	public register(): void {
		const user: Register = {
			name: this.name,
			email: this.email,
			password: this.password,
			confirmPassword: this.confirmPassword
		};

		this.subs.push(this.accountService.register(user).subscribe(response => {
			console.log(response);
		}, (error) => {
			
		}));
	}
}
