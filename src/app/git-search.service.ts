import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class GitSearchService {

  private username: string;


  constructor(private http: HttpHeaders) {
    console.log('service is now ready');
    this.username = 'Josephat-n';
   }

  getUserInfo() {
    // 'https://api.github.com/users/daneden?access_token=' + apiKey
    return this.http.get('https://api.github.com/users/' + this.username)
    .map(res => res.json());

  }
}
