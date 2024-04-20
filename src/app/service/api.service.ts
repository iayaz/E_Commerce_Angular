import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BASE_URL,
  GET_ALL_PRODUCTS,
  GET_ALL_USERS,
} from './constants/constant';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<any>(BASE_URL + GET_ALL_USERS);
  }

  getAllProducts() {
    return this.http.get<any>(BASE_URL + GET_ALL_PRODUCTS);
  }
}
