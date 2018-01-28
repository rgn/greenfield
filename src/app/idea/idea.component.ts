import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IdeaService } from './idea.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-idea',
	templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css'],
  providers: [IdeaService]
})
export class IdeaComponent implements OnInit {

  myForm: FormGroup;

  public allAssets;
  private asset;
  private currentId;
  
	public errorMessage;

  
      
          ideaId = new FormControl("", Validators.required);
        
  
      
          description = new FormControl("", Validators.required);
        
  
      
          days = new FormControl("", Validators.required);
        
  
      
          state = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  
      
          adapter = new FormControl("", Validators.required);
        
  
      
          likedBy = new FormControl("", Validators.required);
        
  
      
          followedBy = new FormControl("", Validators.required);
        
  


  constructor(private serviceIdea:IdeaService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          ideaId:this.ideaId,
        
    
        
          description:this.description,
        
    
        
          days:this.days,
        
    
        
          state:this.state,
        
    
        
          owner:this.owner,
        
    
        
          adapter:this.adapter,
        
    
        
          likedBy:this.likedBy,
        
    
        
          followedBy:this.followedBy
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceIdea.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "com.trivadis.greenfield.Idea",
      
        
          "ideaId":this.ideaId.value,
        
      
        
          "description":this.description.value,
        
      
        
          "days":this.days.value,
        
      
        
          "state":this.state.value,
        
      
        
          "owner":this.owner.value,
        
      
        
          "adapter":this.adapter.value,
        
      
        
          "likedBy":this.likedBy.value,
        
      
        
          "followedBy":this.followedBy.value
        
      
    };

    this.myForm.setValue({
      
        
          "ideaId":null,
        
      
        
          "description":null,
        
      
        
          "days":null,
        
      
        
          "state":null,
        
      
        
          "owner":null,
        
      
        
          "adapter":null,
        
      
        
          "likedBy":null,
        
      
        
          "followedBy":null
        
      
    });

    return this.serviceIdea.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "ideaId":null,
        
      
        
          "description":null,
        
      
        
          "days":null,
        
      
        
          "state":null,
        
      
        
          "owner":null,
        
      
        
          "adapter":null,
        
      
        
          "likedBy":null,
        
      
        
          "followedBy":null 
        
      
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "com.trivadis.greenfield.Idea",
      
        
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "days":this.days.value,
          
        
    
        
          
            "state":this.state.value,
          
        
    
        
          
            "owner":this.owner.value,
          
        
    
        
          
            "adapter":this.adapter.value,
          
        
    
        
          
            "likedBy":this.likedBy.value,
          
        
    
        
          
            "followedBy":this.followedBy.value
          
        
    
    };

    return this.serviceIdea.updateAsset(form.get("ideaId").value,this.asset)
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

    return this.serviceIdea.deleteAsset(this.currentId)
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

    return this.serviceIdea.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "ideaId":null,
          
        
          
            "description":null,
          
        
          
            "days":null,
          
        
          
            "state":null,
          
        
          
            "owner":null,
          
        
          
            "adapter":null,
          
        
          
            "likedBy":null,
          
        
          
            "followedBy":null 
          
        
      };



      
        if(result.ideaId){
          
            formObject.ideaId = result.ideaId;
          
        }else{
          formObject.ideaId = null;
        }
      
        if(result.description){
          
            formObject.description = result.description;
          
        }else{
          formObject.description = null;
        }
      
        if(result.days){
          
            formObject.days = result.days;
          
        }else{
          formObject.days = null;
        }
      
        if(result.state){
          
            formObject.state = result.state;
          
        }else{
          formObject.state = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      
        if(result.adapter){
          
            formObject.adapter = result.adapter;
          
        }else{
          formObject.adapter = null;
        }
      
        if(result.likedBy){
          
            formObject.likedBy = result.likedBy;
          
        }else{
          formObject.likedBy = null;
        }
      
        if(result.followedBy){
          
            formObject.followedBy = result.followedBy;
          
        }else{
          formObject.followedBy = null;
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
      
        
          "ideaId":null,
        
      
        
          "description":null,
        
      
        
          "days":null,
        
      
        
          "state":null,
        
      
        
          "owner":null,
        
      
        
          "adapter":null,
        
      
        
          "likedBy":null,
        
      
        
          "followedBy":null 
        
      
      });
  }

}
