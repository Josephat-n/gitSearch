import { Repository } from './../repository';
import { GitSearchService } from './../git-search.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  user: User;
  repos: Repository[] = [];

  constructor( public gitSearch: GitSearchService ) { }

  getUserInfo(searchTerm) {

    this.gitSearch.getUserInfo(searchTerm).then(
      (success) => {
        this.user = this.gitSearch.user;
      },
      (error) => {
        alert('Cant find User name');
      }
    );
  }

  getRepos(searchTerm) {
    this.gitSearch.getRepos(searchTerm).then(
      (success) => {
        this.repos = this.gitSearch.repos;
        console.log(this.repos);
    },
    (error) => {
        console.log(error);
    }
    );
  }

 ngOnInit() {
   this.getUserInfo('Josephat-n');
   this.getRepos('Josephat-n');

  }
}
