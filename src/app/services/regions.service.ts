import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from '../model/region';
import { SubRegion } from '../model/subregion';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  http = inject(HttpClient);
  constructor() { }

  getRegions() {
    return this.http.get<Array<Region>>('https://restcountries.com/v3.1/all?fields=region,area');
  }

  getSubRegions(region: string) {
    return this.http.get<Array<SubRegion>>(`https://restcountries.com/v3.1/region/${region}?fields=subregion`);
  }

  submitFormData(data: object) {
    return this.http.post('https://backend.api.com/v3/userDetails', data);
  }
}
