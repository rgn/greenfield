import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PersonService } from './Person.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Person',
	templateUrl: './Person.component.html',
	styleUrls: ['./Person.component.css'],
  providers: [PersonService]
})
export class PersonComponent implements OnInit {

  myForm: FormGroup;

  private allPersons;
  private person;
  private currentId;
  private errorMessage;

    personId = new FormControl("", Validators.required);
    firstName = new FormControl("", Validators.required);
    lastName = new FormControl("", Validators.required);

  constructor(private servicePerson:PersonService, fb: FormBuilder) {
    this.myForm = fb.group({
    personId:this.personId,
    firstName:this.firstName,
    lastName:this.lastName
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicePerson.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allPersons = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addPerson(form: any): Promise<any> {
    this.person = {
      $class: "com.trivadis.greenfield.Person",
        "personId":this.personId.value,
        "firstName":this.firstName.value,
        "lastName":this.lastName.value
    };

    this.myForm.setValue({
        "personId":null,
        "firstName":null,
        "lastName":null
    });

    return this.servicePerson.addAsset(this.person)
    .toPromise()
    .then(() => {
	  this.errorMessage = null;
      this.myForm.setValue({
        "personId":null,
        "firstName":null,
        "lastName":null
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updatePerson(form: any): Promise<any> {
       console.log('fo');
    this.person = {
      $class: "com.trivadis.greenfield.Person",
        "firstName":this.firstName.value,
        "lastName":this.lastName.value,
    };

    console.log('update');
    return this.servicePerson.updateAsset(form.get("personId").value,this.person)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deletePerson(): Promise<any> {

    return this.servicePerson.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.servicePerson.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        "personId":null,
        "firstName":null,
        "lastName":null
      };
      
        if(result.personId){
          
            formObject.personId = result.personId;
          
        }else{
          formObject.personId = null;
        }
      
        if(result.firstName){
          
            formObject.firstName = result.firstName;
          
        }else{
          formObject.firstName = null;
        }
      
        if(result.lastName){
          
            formObject.lastName = result.lastName;
          
        }else{
          formObject.lastName = null;
        }
      
      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
          "personId":null,
          "firstName":null,
          "lastName":null
      });
  }

}
