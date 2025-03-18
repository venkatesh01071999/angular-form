import { Component, inject, signal } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { FormComponent } from '../components/form/form.component';
import { Region } from '../model/region';
import { RegionsService } from '../services/regions.service';
import { SubRegion } from '../model/subregion';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  imports: [
    FormComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
    region = signal<Array<Region>>([]);
    subregion = signal<Array<SubRegion>>([]);
    regionsService = inject(RegionsService);
    private _snackBar = inject(MatSnackBar);

    // Common function to retrieve unique data from both region and sub-region datas
    getUnqiueData(datas: any, type: number){
      // Key-value storage for O(1) lookup
      const unique_data: { [key: string]: number } = {};
      datas.forEach((data: any, i: number) => {
        const key = type === 1 ? 'region' : 'subregion';
        // data not in object and data is not empty
        if((!(data[key] in unique_data)) && data[key]){
          unique_data[data[key]] = i;
        }
      });
      return unique_data;
    }
    
    // all the api calls are handled in the parent component
    // Functionality to handle emitted event from form component to get regions
    getRegions(event: string) {
      if(event === 'GET_REGIONS') {
        this.regionsService.getRegions().pipe(
          catchError((error: any) => {
            this._snackBar.open(error.message, 'close');
            return [];
          })
        ).subscribe((regions) => {
            const unique_region = Object.keys(this.getUnqiueData(regions, 1));
            if(unique_region.length > 0){
              this.region.set(unique_region.map((region) => {
                return {region: region};
              }));
            } else {
              this.region.set([{region: 'None'}]);
            }
          }
        )
      } else{
        this.region.set([]);
      }
    }

    // Functionality to handle emitted event from form component to get sub-regions
    getSubRegions(region: string){  
      this.regionsService.getSubRegions(region).pipe(
        catchError((error: any) => {
          this._snackBar.open(error.message, 'close');
          return [];
        })
      ).subscribe((subregions) => {
        const unique_sub = Object.keys(this.getUnqiueData(subregions,2))
        if(unique_sub.length > 0){
          this.subregion.set(unique_sub.map((subregion) => {
            return {subregion: subregion};
          }));
        } else {
          this.subregion.set([{subregion: 'None'}]);
        }
      })
    }
    
    // Functionality to handle emitted event from form component to submit form data
    submitForm(data: object){
      this.regionsService.submitFormData(data).pipe(
        catchError((error: any) => {
          this._snackBar.open(error.message, 'close');
          return [];
        })
      ).subscribe((response) => { 
        console.log(response);
      })
    }
}
