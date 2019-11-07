import { User } from './user';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {

  user: User;
  repos: Repository[] = [];

  constructor(private http: HttpClient) {
    this.user = new User('', '', '');
   }

  getUserInfo(searchTerm: string) {
    console.log(searchTerm);

    interface ApiResponse {
      login: string;
      username: string;
      avatar_url: string;
    }

    // tslint:disable-next-line: prefer-const
    let searchPoint = 'https://api.github.com/users/' + searchTerm + '?access_token=' + environment.apiKey;

    // tslint:disable-next-line: prefer-const
    let promise = new Promise((resolve, reject) => {

      this.http.get<ApiResponse>(searchPoint).toPromise().then(
        (results) => {

          console.log(results);
          this.user.login = results.login;
          this.user.username = results.username;
          this.user.avatar_url = results.avatar_url;


          resolve();
        },
        (error) => {
          reject(error);
        });
    });
    return promise;

}
getRepos(searchTerm: string) {

  interface ApiResponse {
   name: string;
   description: string;
   html_url: string;
   }

  // tslint:disable-next-line: prefer-const
  let searchEndPoint = 'https://api.github.com/users/' + searchTerm + '/repos?access_token=' + environment.apiKey;

  // tslint:disable-next-line: prefer-const
  let promise = new Promise((resolve, reject) => {
    this.http.get<ApiResponse[]>(searchEndPoint).toPromise().then(
      (repoResults) => {
        console.log(repoResults);

        this.repos = [];

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < repoResults.length; i++) {
          const repo = new Repository(repoResults[i].name, repoResults[i].description, repoResults[i].html_url);
          this.repos.push(repo);
        }
        resolve();
      },
      (error) => {
        console.log(error);
        reject();
      }
    );
  });
  return promise;
}

}
