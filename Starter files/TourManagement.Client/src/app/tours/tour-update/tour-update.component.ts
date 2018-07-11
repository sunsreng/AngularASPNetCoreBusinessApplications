import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { compare } from 'fast-json-patch';
import { Subscription } from 'rxjs/Subscription';

import { CustomValidators } from '../../shared/custom-validators';
import { MasterDataService } from '../../shared/master-data.service';
import { TourForUpdate } from '../shared/tour-for-update.model';
import { Tour } from '../shared/tour.model';
import { TourService } from '../shared/tour.service';

@Component({
  selector: 'app-tour-update',
  templateUrl: './tour-update.component.html',
  styleUrls: ['./tour-update.component.css']
})
export class TourUpdateComponent implements OnInit, OnDestroy {

  public tourForm: FormGroup;
  private tour: Tour;
  private tourId: string;
  private sub: Subscription;
  private originalTourForUpdate: TourForUpdate;

  constructor(private masterDataService: MasterDataService,
    private tourService: TourService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    // define the tourForm (with empty default values)
    this.tourForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: [''],
      startDate: [],
      endDate: []
    }, { validator: CustomValidators.StartDateBeforeEndDateValidator });

    // get route data (tourId)
    this.sub = this.route.params.subscribe(
      params => {
        this.tourId = params['tourId'];

        // load tour
        this.tourService.getTour(this.tourId)
          .subscribe(tour => {
            this.tour = tour;
            this.updateTourForm();

            this.originalTourForUpdate = automapper.map('TourFormModel', 'TourForUpdate', this.tourForm.value);
          });
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private updateTourForm(): void {
    const datePipe = new DatePipe(navigator.language);
    const dateFormat = 'yyyy-MM-dd';

    this.tourForm.patchValue({
      title: this.tour.title,
      description: this.tour.description,
      startDate: datePipe.transform(this.tour.startDate, dateFormat),
      endDate: datePipe.transform(this.tour.endDate, dateFormat),
    });
  }

  saveTour(): void {
    if (this.tourForm.dirty && this.tourForm.valid) {
      const changedTourForUpdate = automapper.map('TourFormModel', 'TourForUpdate', this.tourForm.value);

      const patchDocument = compare(this.originalTourForUpdate, changedTourForUpdate);

      this.tourService.partiallyUpdateTour(this.tourId, patchDocument)
      .subscribe(() => this.router.navigateByUrl('/tours'));
    }
  }
}
