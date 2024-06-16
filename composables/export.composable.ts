import { useTransactionStore, useAccountStore, useTaxesStore } from "#imports";

export function useExport() {
  const transactionStore = useTransactionStore();
  const accountStore = useAccountStore();
  const taxesStore = useTaxesStore();

  const data = {
    transactions: transactionStore.transcations,
    accounts: accountStore.accounts,
    taxes: taxesStore.taxes,
    version: 1,
  };

  function exportAsJson() {
    const jsonString = JSON.stringify(data, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element and set its href attribute to the Blob URL
    const a = document.createElement("a");
    a.href = url;
    a.download = "prosperpredictions.json";
    document.body.appendChild(a);
    a.click();

    // Remove the anchor element from the DOM
    document.body.removeChild(a);

    // Revoke the Blob URL
    URL.revokeObjectURL(url);
  }

  function importFromJson(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonString = event.target?.result as string;
      const data = JSON.parse(jsonString);

      const transactionStore = useTransactionStore();
      const accountStore = useAccountStore();
      const taxesStore = useTaxesStore();

      transactionStore.setTransactions(data.transactions);
      accountStore.setAccounts(data.accounts);
      taxesStore.setTaxes(data.taxes);
    };
    reader.readAsText(file);
  }

  return { exportAsJson, importFromJson };
}
