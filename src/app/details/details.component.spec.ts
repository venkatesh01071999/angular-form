import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RegionsService } from '../services/regions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let regionsService: jasmine.SpyObj<RegionsService>;

  beforeEach(async () => {
    const regionsSpy = jasmine.createSpyObj('RegionsService', ['getRegions', 'getSubRegions', 'submitFormData']); // region services mocking

    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RegionsService, useValue: regionsSpy }
     ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    regionsService = TestBed.inject(RegionsService) as jasmine.SpyObj<RegionsService>; // already mocked above
    fixture.detectChanges();
  });

  it('should create Details Component', () => {
    expect(component).toBeTruthy();
  });

  it('should have app form component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-form')).toBeTruthy();
  });

  it('should fetch the regions correctly', () => {
    regionsService.getRegions.and.returnValue(of([{region: 'Asia'}, {region: 'Asia'}, {region: 'Europe'}])); // since mocked
    component.getRegions('GET_REGIONS');
    expect(component.region()).toEqual([{region: 'Asia'}, {region: 'Europe'}]);
  });

  it('should fetch the subregions correctly', () => {
    regionsService.getSubRegions.and.returnValue(of([{subregion: 'Northern Asia'}, {subregion: 'Northern Asia'}, {subregion: 'Eastern Asia'}])); // since mocked
    component.getSubRegions('Asia');
    expect(component.subregion()).toEqual([{subregion: 'Northern Asia'}, {subregion: 'Eastern Asia'}]);
  });
});
