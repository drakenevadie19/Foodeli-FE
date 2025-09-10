import { Injectable } from '@angular/core';
import { API_URL_FC } from '../../constants/url';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooditemService {
  private apiUrl = API_URL_FC + '/foodCatalogue/fetchRestaurantAndFoodItemsById';

  constructor(private http: HttpClient) { }

  // Get each restaurant's menu
  getFoodItemsByRestaurantId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error("An error occured:", error);
    return throwError(error.message || error);
  }
}
