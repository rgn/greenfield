import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

	@Input()
	public boardName = '';

	@Input()
	public ideas: any;

	restrictedDrop1: any = null;
	simpleDrop: any = null;
	
    ngOnInit(): void {
    }
}
