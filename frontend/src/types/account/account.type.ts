export type AccountType = {
  _id: string;
  name: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type AccountStoreType = {
  account: AccountType | null;
  loading: boolean;
  verify: () => Promise<boolean>;
};
