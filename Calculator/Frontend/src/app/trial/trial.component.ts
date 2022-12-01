import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';



@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.css']
})

export class TrialComponent implements OnInit {
  tittle : string = "k";
  constructor() {
  }

  ngOnInit(): void {
    this.tittle = "Expense Entry";
  }

}
