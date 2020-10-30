import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {MatDialogRef, MatDialog} from '@angular/material';

@Component({
    selector: 'ms-edit-new-examination',
    templateUrl: './edit-new-examination.component.html',
    styleUrls: ['./edit-new-examination.component.scss']
})
export class EditNewExaminationComponent implements OnInit {

    form: FormGroup
    data: any;

    constructor(public formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<EditNewExaminationComponent>) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            examinationName: []
        });

        if (this.data) {
            this.form.patchValue({
                examinationName: this.data.name
            });
        }
    }

    /**
     *onFormSubmit method is used to submit the edit new examination dialaog form and close the dialog.
     */
    onFormSubmit() {
        this.dialogRef.close(this.form.value);
    }
}
