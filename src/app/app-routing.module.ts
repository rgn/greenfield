import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { IdeaComponent } from './Idea/Idea.component';
import { PersonComponent } from './Person/Person.component';
import { PersonalWalletComponent } from './PersonalWallet/PersonalWallet.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
    
    { path: 'Person', component: PersonComponent},
		{ path: 'Idea', component: IdeaComponent},
		
		{ path: 'PersonalWallet', component: PersonalWalletComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
