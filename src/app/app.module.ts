import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatDialogModule,
        MatChipsModule,
        MatTooltipModule
        } from '@angular/material';
import { DndModule } from 'ng2-dnd';

import { AppRoutingModule } from './app-routing.module';
import { Configuration } from './configuration';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IdeaComponent } from './idea/idea.component';
import { PersonComponent } from './person/person.component';

import { PersonalWalletComponent } from './personalWallet/personalWallet.component';
import { IdeaStateFilterPipe } from './idea-state-filter.pipe';
import { IfEmptyPipe } from './if-empty.pipe';
import { CountPipe } from './count.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // TransactionComponent,
    BoardComponent,
    CardComponent,
    DashboardComponent,
    IdeaComponent,
    PersonComponent,
    PersonalWalletComponent,
    IdeaStateFilterPipe,
    IfEmptyPipe,
    CountPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    DndModule.forRoot(),
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
