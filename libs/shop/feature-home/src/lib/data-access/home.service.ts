import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { HomeResponse, Product } from '@shop-workspace/shared-types';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@shop-workspace/shared-util';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
 private readonly httpClient = inject(HttpClient) 
 private readonly config = inject(APP_CONFIG);
private readonly baseUrl = this.config.apiUrl;

getHomeData():Observable<HomeResponse>{
  return this.httpClient.get<HomeResponse>(`${this.baseUrl}/home`) // return products / categories / bestSeller / occasions
  }

  
}


