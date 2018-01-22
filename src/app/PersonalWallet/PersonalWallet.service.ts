import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { PersonalWallet } from '../com.trivadis.greenfield';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class PersonalWalletService {

	
		private NAMESPACE: string = 'com.trivadis.greenfield.PersonalWallet';
	



    constructor(private dataService: DataService<PersonalWallet>) {
    };

    public getAll(): Observable<PersonalWallet[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<PersonalWallet> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<PersonalWallet> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<PersonalWallet> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<PersonalWallet> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
