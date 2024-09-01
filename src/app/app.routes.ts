import { Routes } from '@angular/router';
import {brownHairUsersResolver} from "./api/resolvers/brown-hair-users.resolver";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/users-with-brown-hair/users-with-brown-hair.component').then(c => c.UsersWithBrownHairComponent),
    resolve: {
      brownHairUsersData: brownHairUsersResolver,
    },
  },
];
