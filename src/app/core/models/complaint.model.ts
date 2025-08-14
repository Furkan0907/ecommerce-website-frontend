import { DtoBase } from "./dto-base.model";

export interface Complaint extends DtoBase {
  user: number;
  subject: string;
  description: string;
  resolved: boolean;
}

export interface ComplaintRequest {
  userId?: number;
  subject: string;
  description: string;
}
