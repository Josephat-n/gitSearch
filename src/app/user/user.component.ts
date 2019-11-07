import { Repository } from './../repository';
import { HttpClient } from '@angular/common/http';
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
  // repos: Repository;
  repos: Repository[] = [];
  username: string;

  constructor(private gitSearch: GitSearchService , private http: HttpClient) {
    this.gitSearch = gitSearch;
   }

  findUser() {
    this.gitSearch.updateUser(this.username);
    this.gitSearch.getUserInfo();
      // .subscribe(user => {console.log(user );
      // });

    this.user = this.user;
    }


  ngOnInit() {
    interface ApiResponse {
      html_url: string;
      name: string;
      // repos: any [];
      avatar_url: string;
      username: string;
      login: string;
      id: number;
      image: string;
    }

    this.http.get<ApiResponse>('https://api.github.com/users/josephat-n').subscribe(data => {
      // Succesful API request
      this.user = new User(data.username, data.login, data.avatar_url);
     });

    this.http.get<ApiResponse>('https://api.github.com/users/josephat-n/repos').subscribe(data => {
      // Succesful API request
      this.repos = new Repository(data.name, data.html_url);
      console.log(this.repos);
     });
  }

}
