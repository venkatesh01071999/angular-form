import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { Validators } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    // setting required inputs
    fixture.componentRef.setInput('regions', []);
    fixture.componentRef.setInput('subregions', []);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize firstFormGroup with required controls', () => {
    expect(component.firstFormGroup.contains('firstCtrl')).toBeTrue();
    expect(component.firstFormGroup.contains('secondCtrl')).toBeTrue();
    expect(component.firstFormGroup.get('firstCtrl')?.hasValidator(Validators.required)).toBeTrue();
    expect(component.firstFormGroup.get('secondCtrl')?.hasValidator(Validators.required)).toBeTrue();
  });

  it('should initialize SecondFormGroup with required controls', () => {
    expect(component.secondFormGroup.contains('thirdCtrl')).toBeTrue();
    expect(component.secondFormGroup.contains('fourthCtrl')).toBeTrue();
    expect(component.secondFormGroup.get('thirdCtrl')?.hasValidator(Validators.required)).toBeTrue();
    expect(component.secondFormGroup.get('fourthCtrl')?.hasValidator(Validators.required)).toBeTrue();
  });

  it('should initialize ThirdFormGroup with required controls', () => {
    expect(component.thirdFormGroup.contains('languages')).toBeTrue();
  });

  it('should be invalid with empty value for first form', () => {
    expect(component.firstFormGroup.invalid).toBeTrue();
  });

  it('should be valid with values for first form', () => {
    component.firstFormGroup.setValue({firstCtrl: 'Venkatesh', secondCtrl: 'Ravi'})
    expect(component.firstFormGroup.valid).toBeTrue();
  });

  
  it('should be invalid with empty value for second form', () => {
    expect(component.secondFormGroup.invalid).toBeTrue();
  });

  it('should be valid with values for second form', () => {
    component.secondFormGroup.setValue({thirdCtrl: 'Asia', fourthCtrl: 'Central Asia'})
    expect(component.secondFormGroup.valid).toBeTrue();
  });

  it('should be invalid with empty value for third form', () => {
    const native = fixture.nativeElement as HTMLElement;
    const forms = native.querySelectorAll('form')
    expect(forms[2][3].getAttribute('disabled')).toBe('true');
  });

  it('should be valid with array value for third form', () => {
    component.languageArray = ['English'];
    fixture.detectChanges();
    const native = fixture.nativeElement as HTMLElement;
    const forms = native.querySelectorAll('form');
    expect(forms[2][3].getAttribute('ng-reflect-disabled')).toBe('false');
  });

  it('should be empty after form reset', () => {
    component.submitForm();
    expect(component.firstFormGroup.get('firstCtrl')?.value).toBe('');
    expect(component.firstFormGroup.get('secondCtrl')?.value).toBe('');
    expect(component.secondFormGroup.get('thirdCtrl')?.value).toBe('');
    expect(component.secondFormGroup.get('fourthCtrl')?.value).toBe('');
    expect(component.thirdFormGroup.get('languages')?.value).toEqual(['']);
  });
});
