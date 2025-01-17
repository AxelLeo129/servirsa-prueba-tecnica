export interface BudgetItem {
  id: number;
  name: string;
}

export interface BudgetItemList {
  budgetItems: BudgetItem[],
  totalItems: number;
};
