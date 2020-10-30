import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'ms-add-new-examination',
    templateUrl: './add-new-examination.component.html',
    styleUrls: ['./add-new-examination.component.scss']
})
export class AddNewExaminationComponent implements OnInit {

    addNewExaminationForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<AddNewExaminationComponent>) {
    }

    ngOnInit() {
        this.addNewExaminationForm = this.formBuilder.group({
            examinationName: ['', [Validators.required]]
        })
    }

    // onFormSubmit method is submit a add new examination form.
    onFormSubmit() {
        this.dialogRef.close(this.addNewExaminationForm.value);
    }

}
