import { CalculatorInputs, CalculationResult } from '../types';

export const calculateProfit = (inputs: CalculatorInputs): CalculationResult => {
  const {
    salesPrice,
    costOfGoods,
    shippingCost,
    marketingCost,
    commissionRate,
    vatRate,
    incomeTaxRate,
    discountRate,
  } = inputs;

  // 1. Apply Discount
  const effectiveSalesPrice = salesPrice * (1 - discountRate / 100);

  // Helper to strip VAT
  const getExVat = (amount: number) => amount / (1 + vatRate / 100);

  // 2. VAT Separation (Step 1 & 2)
  const salesPriceExVat = getExVat(effectiveSalesPrice);
  const outputVat = effectiveSalesPrice - salesPriceExVat;

  const costOfGoodsExVat = getExVat(costOfGoods);
  const inputVatGoods = costOfGoods - costOfGoodsExVat;

  const shippingExVat = getExVat(shippingCost);
  const inputVatShipping = shippingCost - shippingExVat;

  const marketingExVat = getExVat(marketingCost);
  const inputVatMarketing = marketingCost - marketingExVat;

  // Commission Calculation
  // Commission is calculated on the Gross Sales Price (VAT Inc).
  // The commission invoice itself includes VAT, so we must strip it for expense calculation.
  const commissionAmountVatInc = effectiveSalesPrice * (commissionRate / 100);
  const commissionExVat = getExVat(commissionAmountVatInc);
  const inputVatCommission = commissionAmountVatInc - commissionExVat;

  // 3. VAT Payable Calculation (Step 3)
  const totalInputVat = inputVatGoods + inputVatShipping + inputVatMarketing + inputVatCommission;
  const vatBalance = outputVat - totalInputVat;
  const vatPayable = vatBalance > 0 ? vatBalance : 0;
  const vatCarryForward = vatBalance < 0 ? Math.abs(vatBalance) : 0;

  // 4. Tax Base (Vergi Matrahı) (Step 4)
  const totalExpensesExVat = costOfGoodsExVat + shippingExVat + marketingExVat + commissionExVat;
  const grossProfit = salesPriceExVat - totalExpensesExVat;

  // 5. Income Tax (Step 5)
  const incomeTax = grossProfit > 0 ? grossProfit * (incomeTaxRate / 100) : 0;

  // 6. Net Profit (Step 6)
  // Note: If Gross Profit is negative, income tax is 0, and Net Profit equals Gross Profit (Loss).
  const netProfit = grossProfit - incomeTax;

  // Margin
  const profitMargin = effectiveSalesPrice > 0 ? (netProfit / effectiveSalesPrice) * 100 : 0;

  return {
    effectiveSalesPrice,
    grossIncome: effectiveSalesPrice,
    costOfGoodsExVat,
    shippingExVat,
    marketingExVat,
    commissionExVat,
    totalExpensesExVat,
    outputVat,
    totalInputVat,
    vatPayable,
    vatCarryForward,
    grossProfit,
    incomeTax,
    netProfit,
    profitMargin,
  };
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value) + ' TL';
};

export const formatPercent = (value: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};