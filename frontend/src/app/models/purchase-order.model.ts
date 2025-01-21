export interface PurchaseOrder {
  id: number;
  date: string;
  supplier: string;
  amount: string;
  budget_item_id: number;
  project_id: number;
};

export interface PurchaseOrderList {
  purchaseOrders: PurchaseOrder[],
  totalItems: number;
};
