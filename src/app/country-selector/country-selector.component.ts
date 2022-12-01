import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Country } from '../shipping-api.service';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css']
})
export class CountrySelectorComponent implements OnInit  {
  @Input() countries: Country[];
  @Output() onSelected = new EventEmitter<Country | null>();
  countryControl = new FormControl<string | Country>('');
  filteredCountries: Observable<Country[]>;

  ngOnInit() {
    this.filteredCountries = this.countryControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.countries.slice();
      }),
    );
  }

  onInput() {
    if (this.countryControl.getRawValue() === '') {
      this.countrySelected(null);
    }
  }

  countrySelected(country: Country | null) {
    this.onSelected.emit(country);
  }

  displayFn(country: Country): string {
    return country?.name ?? '';
  }

  private _filter(name: string): Country[] {
    return this.countries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()));
  }

}
