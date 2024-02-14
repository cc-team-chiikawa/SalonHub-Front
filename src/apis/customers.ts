export const getCustomers = async () => {
  const data = await fetch("/api/customers");
  const customers = await data.json();
  return customers;
};
