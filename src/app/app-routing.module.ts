import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListResolver } from './country-list.resolver';
import { ParcelFormComponent } from './parcel-form/parcel-form.component';
import { ParcelListComponent } from './parcel-list/parcel-list.component';


const routes: Routes = [
  {
    path: '',
    resolve: { countryList: CountryListResolver },
    children: [
      { path: '', component: ParcelListComponent },
      { path: 'add', component: ParcelFormComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
