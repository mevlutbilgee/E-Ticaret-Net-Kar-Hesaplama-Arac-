export interface CalculatorInputs {
  salesPrice: number;
  costOfGoods: number;
  shippingCost: number;
  marketingCost: number;
  commissionRate: number;
  vatRate: number;
  incomeTaxRate: number;
  discountRate: number;
}

export interface CalculationResult {
  effectiveSalesPrice: number; // After discount
  grossIncome: number; // Total revenue
  
  // Expenses (Ex-VAT)
  costOfGoodsExVat: number;
  shippingExVat: number;
  marketingExVat: number;
  commissionExVat: number;
  totalExpensesExVat: number;
  
  // Taxes
  outputVat: number; // From Sales
  totalInputVat: number; // From Expenses
  vatPayable: number; // Ödenecek KDV
  vatCarryForward: number; // Devreden KDV
  
  grossProfit: number; // Vergi Öncesi Kâr (Matrah)
  incomeTax: number; // Gelir Vergisi
  netProfit: number; // Net Kâr
  profitMargin: number; // %
}

export const DEFAULT_INPUTS: CalculatorInputs = {
  salesPrice: 500,
  costOfGoods: 200,
  shippingCost: 40,
  marketingCost: 50,
  commissionRate: 20,
  vatRate: 20,
  incomeTaxRate: 20,
  discountRate: 0,
};