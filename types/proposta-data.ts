export interface ProposalData {
property: {
  id: number;
  name: string;
  type: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floor: string;
  price: number;
};
  calculation: {
    downPayment: number;
    financedAmount: number;
    iof: number;
    monthlyPayment: number;
    totalInterest: number;
    totalAmount: number;
  };
  interestRate: number;
  installments: number;
}
