import {Component, OnInit} from '@angular/core';
import {AutocompleteComponent} from "../../shared/autocomplete/autocomplete.component";
import {map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../api/models/user.model";
import {FilterBrownHairUsersService} from "./services/filter-brown-hair-users.service";

@Component({
  selector: 'app-users-with-brown-hair',
  standalone: true,
  imports: [
    AutocompleteComponent
  ],
  providers: [FilterBrownHairUsersService],
  templateUrl: './users-with-brown-hair.component.html',
  styleUrl: './users-with-brown-hair.component.scss'
})
export class UsersWithBrownHairComponent implements OnInit {
  selectedUser: string = '';

  brownHairUsers: User[] = [];

  getUsersNames!: (value: string) => Observable<string[]>;

  constructor(private filterBrownHairUsersService: FilterBrownHairUsersService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getRouteData();
    this.initGetUsersCallback();
  }

  getRouteData(): void {
    this.brownHairUsers = this.route.snapshot.data['brownHairUsersData'];
  }

  initGetUsersCallback(): void {
    this.getUsersNames = (value: string) => this.filterBrownHairUsersService.filterBrownHairUsersByName(this.brownHairUsers, value).pipe(
      map((users) => users.map(user => `${user.firstName} ${user.lastName}`)),
    );
  }
}
