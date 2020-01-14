import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  sendFile(file: FormData): Observable<any> {
    return this.http.post('server/', file);
    /*  // Esta opcion se puede si quiere el progreso.
    return this.http.request(
      new HttpRequest('POST', 'server/', file,
        {reportProgress: true})
    );
    */
  }
}
