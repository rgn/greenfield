import { Component, OnInit, Input } from '@angular/core';

import { Idea } from '../com.trivadis.greenfield';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  public idea: Idea;

  constructor() { }

  ngOnInit() {
  }

}
