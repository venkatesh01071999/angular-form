import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterModule.forRoot([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // whether component has following tags
  it('should create the navbar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const nav = compiled.querySelector('nav')
    expect(nav).toBeTruthy();
    expect(nav?.querySelector('li')).toBeTruthy();
    expect(nav?.querySelector('li')?.innerText).toContain('Employee');
  });

  it('should have routerLink Details', ()=>{
    const li = fixture.debugElement.query(By.css('li'));
    const routerLink = li.attributes['ng-reflect-router-link'];
    expect(routerLink).toBe('/details');
  })

  it('should have routerLink Details', ()=>{
    const li = fixture.debugElement.query(By.css('span'));
    const routerLink = li.attributes['ng-reflect-router-link'];
    expect(routerLink).toBe('');
  })
});
