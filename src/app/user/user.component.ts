import { HttpClientModule } from '@angular/common/http';
import { GitSearchService } from './../git-search.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // user: User;
  user: any[];

  // constructor(private gitSearch: GitSearchService, private http: HttpClientModule) {
  //   this.user = gitSearch.getUserInfo();
  //  }

    constructor(private gitSearch: GitSearchService) {
      this.gitSearch.getUserInfo();
      // .subscribe(user => {console.log(user );
      // });

      this.user = this.user;
    }


  ngOnInit() {
  }

}
