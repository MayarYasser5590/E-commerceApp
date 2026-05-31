export interface BaseAddress {
  street: string;
  city: string;
  phone: string;
  username: string;
  lat: string;
  long: string;
}

export interface UserAddress extends BaseAddress {
  _id: string;
}

export interface GetUserAddressesResponse {
  message: string;
  addresses: UserAddress[];
}

export interface AddressResponse {
  message: string;
  address: UserAddress[];
}

export interface ApiErrorResponse {
  error: string;
}
