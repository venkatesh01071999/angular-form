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
    MatIcon
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
      languages: this._formBuilder.array([this.createLanguageField()], Validators.required)
    });
    regions = input.required<Array<Region>>();
    subregions = input.required<Array<SubRegion>>();
    getRegions = output<string>();
    getSubRegions = output<string>();

    // getter method to easily and safely access form array
    get languages(): FormArray {
      return this.thirdFormGroup.get('languages') as FormArray;
    }

    createLanguageField(): FormControl {
      return this._formBuilder.control('', Validators.required); // since one input we use control else we can use group
    }

    // creates a new language form field and adds it to the form array
    addLanguage() {
      if(this.languages.at(this.languages.length - 1)?.value){
        this.languages.push(this.createLanguageField());
      }
    }

    firstCompleted(){
      if(this.firstFormGroup.status === 'VALID'){
        this.getRegions.emit('GET_REGIONS');
      }
    }

    regionChanged(change: any){
      this.getSubRegions.emit(change.value);
    }
}
