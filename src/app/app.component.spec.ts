import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>; // provides access to DOM to interact

  // runs before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([]), HeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent); // gives component fixture
    component = fixture.componentInstance; // access to DOM
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy(); // checks if header component is rendered
  });

  it('should have a main tag outside the router outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const mainElement = compiled.querySelector('main');
    expect(mainElement).toBeTruthy();
    expect(mainElement?.querySelector('router-outlet')).toBeTruthy();
  });
});