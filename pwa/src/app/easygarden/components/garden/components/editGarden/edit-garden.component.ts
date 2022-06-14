import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { GardenService } from '../../garden.service';
import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { GardenModel } from '../../gardenModel';

@Component({
  selector: 'app-edit-garden',
  templateUrl: './edit-garden.component.html',
  styleUrls: ['./edit-garden.component.scss']
})

export class EditGardenComponent implements OnInit {

  title = 'Easy Garden';
  faCircleXmark = faCircleXmark;

  // EditGardenForm Group
  editGardenForm = new FormGroup({
    name: new FormControl('')
  });
  submitted = false;
  success = '';
  value = '';
  garden!: GardenModel;

  constructor(private formBuilder: FormBuilder,
              private customValidator : FormValidationService,
              private location: Location,
              private activated: ActivatedRoute,
              private gardenService: GardenService) {
    this.editGardenForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          this.customValidator.validEquipmentName()
        ]
      ]
    })
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    let gid = this.activated.snapshot.paramMap.get('id')
    this.gardenService.getGarden(gid).subscribe(
      data => {
        this.garden = data
        this.value = this.garden.name;
      }
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editGardenForm.controls;
  }

  // Submit button
  onSubmit() {
    this.submitted = true;
    if (this.editGardenForm.invalid) {
      return;
    } else {
      const typedEditGardenForm: GardenModel = this.editGardenForm.value;
      this.success = JSON.stringify(typedEditGardenForm);
      let gid = this.activated.snapshot.paramMap.get('id')
      this.gardenService.updateGarden(typedEditGardenForm, gid).subscribe()
      this.location.back()
    } 
  }

  // Cancel button
  onReset(): void {
    this.submitted = false;
    this.editGardenForm.reset();
  }

  // Close editGardenComponent
  goBack(): void {
    this.location.back()
  }

}
