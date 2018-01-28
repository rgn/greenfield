import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IdeaComponent } from './idea/idea.component';
import { PersonComponent } from './person/person.component';
import { PersonalWalletComponent } from './personalWallet/personalWallet.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'person', component: PersonComponent},
		{ path: 'idea', component: IdeaComponent},
		
		{ path: 'wallet', component: PersonalWalletComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
