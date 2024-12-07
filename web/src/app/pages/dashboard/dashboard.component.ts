import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-dashboard',
	standalone: false,
	
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

	constructor(
		private router: Router,
		private accountService: AccountService
	) {

	}

	public logout(): void {
		this.accountService.logout();
		
		this.router.navigate(['login']);
	}
}
