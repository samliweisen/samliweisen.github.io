import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  name: String;
  price: String;
  rating: String;
  constructor() { }

  ngOnInit() {
  }
  _console(value) {
    console.log(value);
  }

}
