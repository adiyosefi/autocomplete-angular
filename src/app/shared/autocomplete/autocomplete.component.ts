import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {catchError, debounceTime, distinctUntilChanged, finalize, Observable, of, switchMap, tap} from "rxjs";

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
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements OnInit {
  // suggestions callback
  @Input() getSuggestionsCallback!: (value: string) => Observable<string[]>;

  // selected value
  @Input() set selectedValue(selectedValue: string) {
    this.searchControl.setValue(selectedValue);
  }
  @Output() selectedValueChange: EventEmitter<string> = new EventEmitter<string>();

  // config inputs
  @Output() debounceTime: number = 500;

  // search input
  searchControl: FormControl = new FormControl('');

  // dropdown
  showSearches: boolean = false;
  suggestionsLoading: boolean = false;
  suggestions$!: Observable<string[]>;

  @ViewChild('autocompleteWrapper', {static: true}) autocompleteWrapper!: ElementRef;

  constructor(private renderer: Renderer2, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getSuggestions();
    this.hideDropdownOnOutsideClick()
  }

  getSuggestions(): void {
    this.suggestions$ = this.searchControl.valueChanges.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      tap(() => {
        this.suggestionsLoading = true;
        this.showSearches = true;
        this.cdRef.markForCheck();
      }),
      switchMap(value =>
        this.getSuggestionsCallback(value).pipe(
          catchError(() => of([])), // handle error and return empty array
          finalize(() => this.suggestionsLoading = false)
        )
      ),
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
      this.cdRef.markForCheck();
    }
  }

  /* dropdown outside click - end */
}
