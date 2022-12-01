import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country, Parcel, ShippingApiService } from '../shipping-api.service';
import { debounce as debounceDecorator } from '../debounce.decorator';

@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.css']
})

export class ParcelListComponent implements OnInit {
  countryList: Country[];
  loadedParcels: Parcel[];
  hasMoreItems = true;
  after = 0;
  selectedCountry: Country | null;
  descriptionInput?: string;
  displayedParcelColumns: string[] = ['sku', 'deliveryDate', 'country', 'town', 'streetAddress', 'description'];

  constructor(private activatedRoute: ActivatedRoute, private shippingApiService: ShippingApiService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ countryList }) => {
      this.countryList = countryList;
    });

    this.loadParcels();
  }

  loadParcels(presrveData = false) {
    if (!presrveData) {
      this.after = 0;
      this.hasMoreItems = true;
    }

    this.shippingApiService.getParcels({ after: this.after, term: this.descriptionInput, countryName: this.selectedCountry?.name }).subscribe((response) => {
      this.loadedParcels = this.loadedParcels && presrveData ? this.loadedParcels.concat(response.parcels) : response.parcels;
      this.hasMoreItems = response.hasMoreItems;
      this.after = response.after + response.first;
    });
  }

  onCountrySelected(country: Country | null) {
    this.selectedCountry = country;
    this.loadParcels();
  }

  @debounceDecorator(500)
  onDescriptionInputChange() {
    this.loadParcels();
  }

  @debounceDecorator(500)
  onScroll() {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && this.hasMoreItems) {
      this.loadParcels(true);
    }
  }

}
