import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country, Parcel, ShippingApiService } from '../shipping-api.service';

@Component({
  selector: 'app-parcel-form',
  templateUrl: './parcel-form.component.html',
  styleUrls: ['./parcel-form.component.css']
})
export class ParcelFormComponent implements OnInit {
  countryList: Country[];
  formGroup = new FormGroup({
    sku: new FormControl(''),
    countryId: new FormControl(0),
    town: new FormControl(''),
    streetAddress: new FormControl(''),
    deliveryDate: new FormControl(''),
    description: new FormControl(''),
  });
  addingInProgress = false;
  errorMessage: string | null;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private shippingApiService: ShippingApiService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ countryList }) => {
      this.countryList = countryList;
    });
    this.formGroup.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  onCountrySelected(country: Country | null) {
    this.formGroup.patchValue({
      countryId: country?.id ?? null,
    })
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }

    if (!this.formGroup.getRawValue().countryId) {
      this.errorMessage = 'Please pick country that is available';
      return;
    }

    this.addingInProgress = true;

    this.shippingApiService.createParcel(this.formGroup.getRawValue() as any).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => {
        this.errorMessage = error.error.message;
        this.addingInProgress = false;
      }
    });
  }
}
