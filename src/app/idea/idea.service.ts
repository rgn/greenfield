import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Idea } from '../com.trivadis.greenfield';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class IdeaService {

		private NAMESPACE: string = 'com.trivadis.greenfield.Idea';

    constructor(private dataService: DataService<Idea>) {
    };

    public getAll(): Observable<Idea[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Idea> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Idea> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Idea> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Idea> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
