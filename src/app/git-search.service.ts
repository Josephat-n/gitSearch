import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  getUser(): import('./user').User {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
