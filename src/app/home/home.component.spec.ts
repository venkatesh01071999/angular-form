import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterModule.forRoot([])] //  since routerlink is used in code
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Home Component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the Home Component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')).toBeTruthy();
    expect(compiled.querySelector('h1')?.textContent).toContain('angular-forms');
  });

  it('should have /details in routerlink', ()=>{
    const button = fixture.debugElement.query(By.css('button'));
    const routerLink = button.attributes['ng-reflect-router-link'];
    expect(routerLink).toBe('/details');
  })
});
