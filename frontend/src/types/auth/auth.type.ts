import type { AccountType } from "../account/account.type";

export type AuthStateType = {
  loading: boolean;
  register: (data: Partial<AccountType>) => Promise<boolean>;
};
