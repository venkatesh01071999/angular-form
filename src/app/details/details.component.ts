import { Component, inject, signal } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { FormComponent } from '../components/form/form.component';
import { Region } from '../model/region';
import { RegionsService } from '../services/regions.service';
import { SubRegion } from '../model/subregion';

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

    getUnqiueData(datas: any, type: number){
      const unique_data: { [key: string]: number } = {};
      datas.forEach((data: any, i: number) => {
        const key = type === 1 ? 'region' : 'subregion';
        if((!(data[key] in unique_data)) && data[key]){
          unique_data[data[key]] = i;
        }
      });
      return unique_data;
    }

    getRegions(event: string) {
      if(event === 'GET_REGIONS') {
        this.regionsService.getRegions().pipe(
          catchError((error: any) => {
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

    getSubRegions(region: string){  
      this.regionsService.getSubRegions(region).pipe(
        catchError((error: any) => {
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
}
