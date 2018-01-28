import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IdeaService } from '../idea/idea.service';
import { PersonService } from '../person/person.service';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-dashoard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [IdeaService]
})

export class DashboardComponent implements OnInit {

    public errorMessage = '';
    public allIdeas: any;

    constructor(private ideaService: IdeaService) {
    };

    ngOnInit(): void {
        this.loadAllIdeas();
    }

    loadAllIdeas(): Promise<any>  {

        return this.ideaService.getAll()
        .toPromise()
        .then((result) => {
            let tempList = [];
            this.errorMessage = null;
            result.forEach(asset => {
                tempList.push(asset);
            });
            this.allIdeas = tempList;
        })
        .catch((error) => {
            if (error === 'Server error') {
                this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
            } else if (error === '404 - Not Found') {
                this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
            } else {
                this.errorMessage = error;
            }
        });
    }
}
