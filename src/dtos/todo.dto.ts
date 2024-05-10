export interface todoDto {
  description: string;
  status: StatusEnum;
}
export enum StatusEnum {
  Pending = "pending",
  Completed = "completed",
  InProgress = "in-progress",
}

export interface validatorDto {
  valid: boolean;
  message?: string;
}
