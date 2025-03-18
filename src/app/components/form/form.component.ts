import { Component, inject, input, output, signal } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray, FormControl} from '@angular/forms';
import { Region } from '../../model/region';
import { CommonModule } from '@angular/common';
import { SubRegion } from '../../model/subregion';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-form',
  imports: [
    MatStepperModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatSelectModule,
    CommonModule,
    MatIcon,
    MatChipsModule,
    MatCard,
    MatCardContent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
    private _formBuilder = inject(FormBuilder);
    firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
    });
    thirdFormGroup = this._formBuilder.group({
      languages: this._formBuilder.array([this.createLanguageField()]),
    });
    regions = input.required<Array<Region>>();
    subregions = input.required<Array<SubRegion>>();
    getRegions = output<string>();
    getSubRegions = output<string>();
    languageArray: string[] = []; // we are creating an array to store the entered language by user we neednt track eah char
    formoutput = output<object>();

    // getter method to easily and safely access form array
    get languages(): FormArray {
      return this.thirdFormGroup.get('languages') as FormArray;
    }

    // creates a language form field
    createLanguageField(): FormControl {
      return this._formBuilder.control(''); // since one input we use control else we can use group
    }

    // creates a new language form field and adds it to the form array
    addLanguage() {
      const langValue = this.languages.at(this.languages.length - 1)
      if(langValue?.value ){
        langValue?.disable();
        this.languages.push(this.createLanguageField());
        this.languageArray.push(langValue?.value);
      }
    }

    // removes a language form field.
    removeLanguage(index: number) {
      this.languages.removeAt(index);
      this.languageArray.splice(index, 1);
    }

    // all the api calls are handled in the parent component
    // once first form is completed we emit an event and get the regions from api.
    // optimization technique simply needn't call api unless first form is completed.
    firstCompleted(){
      if(this.firstFormGroup.status === 'VALID'){
        this.getRegions.emit('GET_REGIONS'); // emit event to get regions
      }
    }

    // once user selects a region we emit the region to get subregions from api.
    regionChanged(change: any){
      this.secondFormGroup.controls['fourthCtrl'].setValue('');
      this.getSubRegions.emit(change.value);
    }

    // submit form to dummy api
    submitForm(){
      if(
        this.firstFormGroup.status === 'VALID' 
        && this.secondFormGroup.status === 'VALID' 
        && this.languageArray.length > 0
      ){
        const formData = {
          'firstName': this.firstFormGroup.value.firstCtrl,
          'lastName': this.firstFormGroup.value.secondCtrl,
          'region': this.secondFormGroup.value.thirdCtrl,
          'subRegion': this.secondFormGroup.value.fourthCtrl,
          'languages': this.languageArray
        };

        this.formoutput.emit(formData);
      }
    }
}
