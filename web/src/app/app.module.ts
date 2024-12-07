import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './services/account.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AuthorizationGuard } from './services/authorization.guard';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		RegisterComponent,
		LoginComponent,
		DashboardComponent,
		HomeComponent
	],
	imports: [
		ReactiveFormsModule,
		FormsModule,
		BrowserModule,
		AppRoutingModule,
		CommonModule
	],
	providers: [
		AccountService,
		AuthorizationGuard,
		provideHttpClient()
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
