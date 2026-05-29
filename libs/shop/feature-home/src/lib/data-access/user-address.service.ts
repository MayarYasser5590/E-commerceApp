import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@shop-workspace/shared-util';
import {
  AddressResponse,
  BaseAddress,
  GetUserAddressesResponse,
  UserAddress,
} from '@shop-workspace/shared-types';

@Injectable({
  providedIn: 'root',
})
export class UserAddressService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly baseUrl = this.config.apiUrl;

  getLoggedUserAddresses(): Observable<GetUserAddressesResponse> {
    return this.http.get<GetUserAddressesResponse>(`${this.baseUrl}/addresses`);
  }

  addUserAddress(body: BaseAddress): Observable<AddressResponse> {
    return this.http.patch<{ message: string; address: UserAddress[] }>(
      `${this.baseUrl}/addresses`,
      body,
    );
  }

  updateUserAddress(
    addressId: string,
    body: Partial<BaseAddress>,
  ): Observable<GetUserAddressesResponse> {
    return this.http.patch<GetUserAddressesResponse>(
      `${this.baseUrl}/addresses/${addressId}`,
      body,
    );
  }

  deleteUserAddress(addressId: string): Observable<AddressResponse> {
    return this.http.delete<AddressResponse>(
      `${this.baseUrl}/addresses/${addressId}`,
    );
  }
}
