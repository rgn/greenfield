import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PersonalWalletService } from './personalWallet.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-personal-wallet',
	templateUrl: './personalWallet.component.html',
	styleUrls: ['./personalWallet.component.css'],
  providers: [PersonalWalletService]
})
export class PersonalWalletComponent implements OnInit {

  myForm: FormGroup;

  public allAssets;
  private asset;
  private currentId;
  public errorMessage;

  walletId = new FormControl("", Validators.required);
  days = new FormControl("", Validators.required);
  owner = new FormControl("", Validators.required);

  constructor(private servicePersonalWallet:PersonalWalletService, fb: FormBuilder) {
    this.myForm = fb.group({
      walletId: this.walletId,
      days: this.days,
      owner: this.owner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    return this.servicePersonalWallet.getAll()
    .toPromise()
    .then((result) => {
      let tempList = [];
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
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

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'com.trivadis.greenfield.PersonalWallet',
        'walletId': this.walletId.value,
        'days': this.days.value,
        'owner': this.owner.value
    };

    this.myForm.setValue({
      'walletId': null,
      'days': null,
      'owner': null
    });

    return this.servicePersonalWallet.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
          'walletId': null,
          'days': null,
          'owner': null
      });
    })
    .catch((error) => {
        if (error === 'Server error') {
            this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else {
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'com.trivadis.greenfield.PersonalWallet',
      'days': this.days.value,
      'owner': this.owner.value
    };

    return this.servicePersonalWallet.updateAsset(form.get('walletId').value, this.asset)
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


  deleteAsset(): Promise<any> {

    return this.servicePersonalWallet.deleteAsset(this.currentId)
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

    return this.servicePersonalWallet.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "walletId":null,
          
        
          
            "days":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.walletId){
          
            formObject.walletId = result.walletId;
          
        }else{
          formObject.walletId = null;
        }
      
        if(result.days){
          
            formObject.days = result.days;
          
        }else{
          formObject.days = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
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
      
        
          "walletId":null,
        
      
        
          "days":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
