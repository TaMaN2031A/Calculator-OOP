import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { catchError } from "rxjs";
@Injectable({
  providedIn: 'root'
})

export class calculatorServer {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public operate(equation: string): Observable<string>{
  return this.http.post<string>(`${this.apiServerUrl}/operate`, equation);
}
}


