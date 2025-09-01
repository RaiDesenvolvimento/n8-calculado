export interface Property {
  id: number;
  name: string;
  type: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  floor: string;
}

export interface FinancingCalculation {
  downPayment: number;
  financedAmount: number;
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  iof: number;
}