import { Document } from "mongoose";

export type AccountType = {
  _id: string;
  name: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

// and use it in your service:
export type AccountFilterType = Partial<Pick<AccountType, "username" | "name">>;

export type AccountDocumentType = AccountType & Document;
