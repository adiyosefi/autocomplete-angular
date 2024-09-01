import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../../../api/models/user.model";

@Injectable()
export class FilterBrownHairUsersService {
  filterBrownHairUsersByName(users: User[], fullNameQuery: string): Observable<User[]> {
    return of(users?.filter(user => {
        const queryArray = fullNameQuery.split(' ');
        const queryFirstName = queryArray[0] || '';
        const queryLastName = queryArray[1] || '';
        return user.firstName.toLowerCase().includes(queryFirstName.toLowerCase()) &&
          user.lastName.toLowerCase().includes(queryLastName.toLowerCase())
      }
    ) || []);
  }
}
