import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {BrownHairUsersService} from "../services/brown-hair-users.service";
import {User} from "../models/user.model";
import {catchError, of} from "rxjs";

export const brownHairUsersResolver: ResolveFn<User[]> = (_route, _state) => {
  return inject(BrownHairUsersService).getBrownHairUsers().pipe(catchError(() => of([])));
};
