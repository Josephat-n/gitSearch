import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() emitSearch = new EventEmitter<any>();
  @Output() emitRepo = new EventEmitter<any>();

  searchTerm: string;
  constructor() { }

  search() {
    this.emitSearch.emit(this.searchTerm);

  }
  getRepos(){
    this.emitRepo.emit(this.searchTerm);
  }

  ngOnInit() {
  }

}
