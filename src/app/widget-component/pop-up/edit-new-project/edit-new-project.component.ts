import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {MatDialogRef, MatDialog} from '@angular/material';

@Component({
    selector: 'ms-edit-new-project',
    templateUrl: './edit-new-project.component.html',
    styleUrls: ['./edit-new-project.component.scss']
})
export class EditNewProjectComponent implements OnInit {

    form: FormGroup;
    data: any;

    constructor(public formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<EditNewProjectComponent>) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            projectName: []
        });
        console.log(this.data);
        if (this.data) {
            this.form.patchValue({
                projectName: this.data.name
            });
        }
    }

    /**
     *onFormSubmit method is used to submit the edit new project dialaog form and close the dialog.
     */
    onFormSubmit() {
        this.dialogRef.close(this.form.value);
    }
}
