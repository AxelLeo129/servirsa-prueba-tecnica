export interface Donation {
  id: number;
  date: string;
  donor: string;
  amount: string;
  budget_item_id: number;
  project_id: number;
};

export interface DonationList {
  donations: Donation[],
  totalItems: number;
};
