import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'ms-classification-project',
    templateUrl: './classification-project.component.html',
    styleUrls: ['./classification-project.component.scss']
})
export class ClassificationProjectComponent implements OnInit {

    data: any;

    constructor(public dialogRef: MatDialogRef<ClassificationProjectComponent>) {
    }

    ngOnInit() {
    }

    /**
     *onFormSubmit method is used to submit the edit new user dialaog form and close the dialog.
     */
    onFormSubmit() {
        this.dialogRef.close('OK');
    }
}
