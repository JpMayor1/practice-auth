import { AccountDocumentType } from "@/types/models/account.type";
import { model, Model, Schema } from "mongoose";

const accountSchema = new Schema<AccountDocumentType>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Account: Model<AccountDocumentType> = model<
  AccountDocumentType,
  Model<AccountDocumentType>
>("Account", accountSchema);

export default Account;
