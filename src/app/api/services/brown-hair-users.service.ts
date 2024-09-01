import {Injectable} from '@angular/core';
import {catchError, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User, UsersWrapper} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class BrownHairUsersService {
  private readonly apiUrl = 'https://dummyjson.com/users/filter?key=hair.color&value=Brown';

  constructor(private http: HttpClient) {
  }

  getBrownHairUsers(): Observable<User[]> {
    return this.http.get<UsersWrapper>(this.apiUrl)
      .pipe(map(response => response?.users || []),
        catchError(() => []));
  }
}
