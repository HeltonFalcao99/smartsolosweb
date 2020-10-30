import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import {CoreService} from "../../../service/core/core.service";

@Component({
  selector: 'ms-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {

	addNewUserForm    : FormGroup;
	emailPattern 		: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
	profilelist                           : any;
	constructor( private formBuilder : FormBuilder,
					 public dialogRef    : MatDialogRef<AddNewUserComponent>

	) { }

	ngOnInit() {
		this.addNewUserForm = this.formBuilder.group({
			firstName	 : ['',[Validators.required]],
			login 	 : ['',[Validators.required]],
			password 	 : ['',[Validators.required]],
			emailAddress : ['',[Validators.required,Validators.pattern(this.emailPattern)]],
			profile  : ['',[Validators.required]]
		});


		// this.coreService.getProfileList().
		// subscribe( res => {
			// this.profilelist = res
			// console.log(res.toString());

			// },
			// err => console.log(err)
			// ,
			// ()  => this.getProfileList(this.profilelist)
		// );
	}

	// onFormSubmit method is submit a add new user form.
	onFormSubmit(){
		this.dialogRef.close(this.addNewUserForm.value);
	}
}
