import { Injectable, Component } from "@angular/core";
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Observable } from 'rxjs';




@Injectable({
    providedIn: 'root'
})
export class MockDialogService extends DialogService {
    lastResult: Observable<any>;
    constructor() {
        super(null, null, null, null);
    }

    addDialog(component, data, options): Observable<any> {
       return null;
    }
}