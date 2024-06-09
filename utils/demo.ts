export function addDemoData() {
  const transactionStore = useTransactionStore();

  transactionStore.setIncomes([
    [{ month: 0, description: "Salary", amount: 1000 }],
    [{ month: 1, description: "Salary", amount: 1000 }],
    [{ month: 2, description: "Salary", amount: 1000 }],
    [{ month: 3, description: "Salary", amount: 1000 }],
    [{ month: 4, description: "Salary", amount: 1000 }],
    [{ month: 5, description: "Salary", amount: 1000 }],
    [{ month: 6, description: "Salary", amount: 1000 }],
    [{ month: 7, description: "Salary", amount: 1000 }],
    [{ month: 8, description: "Salary", amount: 1000 }],
    [{ month: 9, description: "Salary", amount: 1000 }],
    [{ month: 10, description: "Salary", amount: 1000 }],
    [{ month: 11, description: "Salary", amount: 1000 }],
  ]);

  transactionStore.setExpenditures([
    [{ month: 0, description: "Rent", amount: 400 }],
    [{ month: 1, description: "Rent", amount: 400 }],
    [{ month: 2, description: "Rent", amount: 400 }],
    [{ month: 3, description: "Rent", amount: 400 }],
    [{ month: 4, description: "Rent", amount: 400 }],
    [{ month: 5, description: "Rent", amount: 400 }],
    [{ month: 6, description: "Rent", amount: 400 }],
    [{ month: 7, description: "Rent", amount: 400 }],
    [{ month: 8, description: "Rent", amount: 400 }],
    [{ month: 9, description: "Rent", amount: 400 }],
    [{ month: 10, description: "Rent", amount: 400 }],
    [{ month: 11, description: "Rent", amount: 400 }],
  ]);
}
