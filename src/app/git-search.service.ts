import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    this.user = new User(0, '', '');
   }

  getUserInfo(searchTerm: string) {
    console.log(searchTerm);

    interface ApiResponse {
      id: number;
      login: string;
      avatar_url: string;
    }

    const searchPoint = 'https://api.github.com/users/' + searchTerm + '?access_token=' + environment.apiKey;

    const promise = new Promise((resolve, reject) => {

      this.http.get<ApiResponse>(searchPoint).toPromise().then(
        (results) => {

          console.log(results);
          this.user.id = results.id;
          this.user.login = results.login;
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
   created_at: Date;
  }

  // tslint:disable-next-line: prefer-const
  let searchEndPoint = 'https://api.github.com/users/' + searchTerm + '/repos?access_token=' + environment.apiKey;

  // tslint:disable-next-line: prefer-const
  let promise = new Promise((resolve, reject) => {
    this.http.get<ApiResponse[]>(searchEndPoint).toPromise().then(
      (repoResults) => {
        console.log(repoResults);

        this.repos = [];

        for (let i = 0; i < repoResults.length; i++) {
          const repo = new Repo(repoResults[i].name, repoResults[i].description, repoResults[i].html_url, repoResults[i].created_at);
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
