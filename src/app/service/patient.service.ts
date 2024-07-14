import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,Subject,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'http://localhost:3000/';
  private editdata = new Subject<any>();
  renderNewForm = new EventEmitter<any>();
  constructor(private http: HttpClient) {}

  sendEditData(data: any) {
    this.editdata.next(data);
  }

  getEditData() {
    return this.editdata.asObservable();
  }

  reRenderForm(formData: any, value: any, funtonality: any) {
    this.renderNewForm.emit({ formData, value, funtonality });
  }
  
  getData(api:any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+api)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(api:any, id:number): Observable<any>{
    const url = `${this.apiUrl+api}/${id}`
    return this.http.get<any[]>(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  postData(api:any, data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+api, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateData(api:any, id: number, data: any): Observable<any> {
    const url = `${this.apiUrl+api}/${id}`;
    return this.http.put<any>(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteData(api:any, id: number): Observable<any> {
    const url = `${this.apiUrl+api}/${id}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
