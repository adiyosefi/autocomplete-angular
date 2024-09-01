import {Component, EventEmitter, ElementRef, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {catchError, debounceTime, distinctUntilChanged, Observable, tap, of, switchMap} from "rxjs";

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  // suggestions callback
  @Input() getSuggestionsCallback!: (value: string) => Observable<string[]>;

  // selected value
  @Input() set selectedValue(selectedValue: string) {
    this.searchControl.setValue(selectedValue);
  }
  @Output() selectedValueChange: EventEmitter<string> = new EventEmitter<string>();

  // search input
  searchControl: FormControl = new FormControl('');

  // dropdown
  showSearches: boolean = false;
  suggestionsLoading: boolean = false;
  suggestions$: Observable<string[]> = of([]);

  @ViewChild('autocompleteWrapper', {static: true}) autocompleteWrapper!: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.getSuggestions();
    this.hideDropdownOnOutsideClick()
  }

  getSuggestions(): void {
    this.suggestions$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.suggestionsLoading = true;
        this.showSearches = true;
      }),
      switchMap((value) =>
        this.getSuggestionsCallback(value).pipe(
          catchError(() => of([])), // handle error and return empty array
        )
      ),
      tap(() => {
        this.suggestionsLoading = false;
        this.showSearches = true;
      })
    );
  }

  onSelect(suggestion: string): void {
    this.searchControl.setValue(suggestion, {emitEvent: false});
    this.selectedValueChange.emit(suggestion);
    this.showSearches = false;
  }

  /* dropdown outside click */
  private hideDropdownOnOutsideClick(): void {
    this.renderer.listen('document', 'click', (event: Event) => {
      this.onClickOutside(event);
    });
  }

  private onClickOutside(event: Event) {
    if (!this.autocompleteWrapper.nativeElement.contains(event.target)) {
      this.showSearches = false;
    }
  }

  /* dropdown outside click - end */
}
