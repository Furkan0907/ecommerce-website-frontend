import { DtoBase } from './dto-base.model';

export interface Address extends DtoBase {
  city: string;
  district: string;
  fullAddress: string;
  phoneNumber: string;
}

export interface AddressRequest {
  userId: number;
  city: string;
  district: string;
  fullAddress: string;
  phoneNumber: string;
}
