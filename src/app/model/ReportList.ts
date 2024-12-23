export interface ReportList {
    transactionId: number;
    TranId: number;
    companyId: number;
    propertyId: number;
    tenantId: number;
    amount: number;
    complaintCharges: number;
    paymentDate: Date;
}

export interface ReportSummary {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
}