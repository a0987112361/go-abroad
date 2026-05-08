export type Member = { id: string; name: string };

export type Expense = {
  id: string;
  description: string;
  payerId: string;
  amount: number;
  splitWith: string[];
};

export type Settlement = { from: string; to: string; amount: number };

export function computeBalances(
  members: Member[],
  expenses: Expense[],
): Map<string, number> {
  const balance = new Map<string, number>();
  members.forEach((m) => balance.set(m.id, 0));

  for (const exp of expenses) {
    if (!balance.has(exp.payerId) || exp.splitWith.length === 0) continue;
    const share = exp.amount / exp.splitWith.length;
    balance.set(exp.payerId, (balance.get(exp.payerId) ?? 0) + exp.amount);
    for (const debtorId of exp.splitWith) {
      if (!balance.has(debtorId)) continue;
      balance.set(debtorId, (balance.get(debtorId) ?? 0) - share);
    }
  }

  return balance;
}

export function computeSettlements(balances: Map<string, number>): Settlement[] {
  const creditors: { id: string; amount: number }[] = [];
  const debtors: { id: string; amount: number }[] = [];

  for (const [id, amt] of balances) {
    const rounded = Math.round(amt * 100) / 100;
    if (rounded > 0.01) creditors.push({ id, amount: rounded });
    else if (rounded < -0.01) debtors.push({ id, amount: -rounded });
  }

  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const settlements: Settlement[] = [];
  let i = 0;
  let j = 0;
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amount, creditors[j].amount);
    settlements.push({
      from: debtors[i].id,
      to: creditors[j].id,
      amount: Math.round(pay * 100) / 100,
    });
    debtors[i].amount -= pay;
    creditors[j].amount -= pay;
    if (debtors[i].amount < 0.01) i++;
    if (creditors[j].amount < 0.01) j++;
  }
  return settlements;
}
