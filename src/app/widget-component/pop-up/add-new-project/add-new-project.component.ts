import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'ms-add-new-project',
    templateUrl: './add-new-project.component.html',
    styleUrls: ['./add-new-project.component.scss']
})
export class AddNewProjectComponent implements OnInit {

    addNewProjectForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<AddNewProjectComponent>) {
    }

    ngOnInit() {
        this.addNewProjectForm = this.formBuilder.group({
            projectName: ['', [Validators.required]]
        })
    }

    // onFormSubmit method is submit a add new project form.
    onFormSubmit() {
        this.dialogRef.close(this.addNewProjectForm.value);
    }

}
