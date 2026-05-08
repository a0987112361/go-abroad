"use client";

import { useMemo, useState } from "react";
import {
  computeBalances,
  computeSettlements,
  type Expense,
  type Member,
} from "@/lib/splitbill";

const CURRENCIES = ["NT$", "$", "¥", "₩", "฿", "€", "£", "RM", "S$"];

export default function SplitBillClient() {
  const [currency, setCurrency] = useState("NT$");
  const [members, setMembers] = useState<Member[]>([
    { id: "m1", name: "我" },
    { id: "m2", name: "成員 2" },
  ]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [newMemberName, setNewMemberName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newPayer, setNewPayer] = useState("m1");
  const [newSplit, setNewSplit] = useState<string[]>(["m1", "m2"]);

  const balances = useMemo(() => computeBalances(members, expenses), [members, expenses]);
  const settlements = useMemo(() => computeSettlements(balances), [balances]);
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const memberName = (id: string) => members.find((m) => m.id === id)?.name ?? "?";

  const addMember = () => {
    const name = newMemberName.trim();
    if (!name) return;
    const id = `m${Date.now()}`;
    setMembers((prev) => [...prev, { id, name }]);
    setNewSplit((prev) => [...prev, id]);
    setNewMemberName("");
  };

  const removeMember = (id: string) => {
    if (members.length <= 1) return;
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setExpenses((prev) =>
      prev
        .filter((e) => e.payerId !== id)
        .map((e) => ({ ...e, splitWith: e.splitWith.filter((s) => s !== id) }))
        .filter((e) => e.splitWith.length > 0),
    );
    setNewSplit((prev) => prev.filter((s) => s !== id));
    if (newPayer === id) setNewPayer(members[0]?.id ?? "");
  };

  const addExpense = () => {
    const amount = parseFloat(newAmount);
    if (!newDesc.trim() || isNaN(amount) || amount <= 0) return;
    if (newSplit.length === 0) return;
    setExpenses((prev) => [
      ...prev,
      {
        id: `e${Date.now()}`,
        description: newDesc.trim(),
        payerId: newPayer,
        amount,
        splitWith: [...newSplit],
      },
    ]);
    setNewDesc("");
    setNewAmount("");
  };

  const removeExpense = (id: string) =>
    setExpenses((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold mb-2">幣別</h2>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border border-slate-300 rounded px-3 py-1.5 text-sm"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">成員</h2>
          <div className="space-y-2">
            {members.map((m) => (
              <div key={m.id} className="flex items-center gap-2 text-sm">
                <span className="flex-1 px-3 py-2 bg-slate-50 rounded border border-slate-200">
                  {m.name}
                </span>
                {members.length > 1 && (
                  <button
                    onClick={() => removeMember(m.id)}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-xs"
                  >
                    刪除
                  </button>
                )}
              </div>
            ))}
            <div className="flex gap-2">
              <input
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addMember()}
                placeholder="新增成員姓名"
                className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm"
              />
              <button
                onClick={addMember}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                加入
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">新增支出</h2>
          <div className="space-y-2 p-4 border border-slate-200 rounded-lg bg-slate-50">
            <input
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="描述（例：晚餐、計程車）"
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="金額"
                className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm"
              />
              <select
                value={newPayer}
                onChange={(e) => setNewPayer(e.target.value)}
                className="border border-slate-300 rounded px-3 py-2 text-sm"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} 付
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">分攤對象（可複選）</p>
              <div className="flex flex-wrap gap-2">
                {members.map((m) => {
                  const on = newSplit.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      onClick={() =>
                        setNewSplit((prev) =>
                          prev.includes(m.id)
                            ? prev.filter((x) => x !== m.id)
                            : [...prev, m.id],
                        )
                      }
                      className={`px-3 py-1.5 rounded text-xs border ${
                        on
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-slate-300 hover:border-blue-400"
                      }`}
                    >
                      {m.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              onClick={addExpense}
              className="w-full bg-slate-900 text-white py-2 rounded text-sm hover:bg-slate-700"
            >
              新增此筆
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">
            支出明細（共 {currency}{total.toLocaleString()}）
          </h2>
          {expenses.length === 0 ? (
            <p className="text-sm text-slate-500">尚未輸入任何支出</p>
          ) : (
            <ul className="space-y-2">
              {expenses.map((e) => (
                <li
                  key={e.id}
                  className="flex items-start gap-2 p-3 border border-slate-200 rounded text-sm"
                >
                  <div className="flex-1">
                    <div className="font-medium">{e.description}</div>
                    <div className="text-xs text-slate-500">
                      {memberName(e.payerId)} 付 · 分攤：
                      {e.splitWith.map(memberName).join(", ")}
                    </div>
                  </div>
                  <div className="font-mono text-sm">
                    {currency}
                    {e.amount.toLocaleString()}
                  </div>
                  <button
                    onClick={() => removeExpense(e.id)}
                    className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-xs"
                  >
                    刪除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="space-y-4 lg:sticky lg:top-4 self-start">
        <div className="p-5 border border-slate-200 rounded-lg bg-slate-50">
          <h2 className="text-lg font-bold mb-3">每人收支</h2>
          {members.length === 0 ? (
            <p className="text-sm text-slate-500">先加入成員</p>
          ) : (
            <ul className="space-y-1.5">
              {members.map((m) => {
                const bal = balances.get(m.id) ?? 0;
                const positive = bal > 0.01;
                const negative = bal < -0.01;
                return (
                  <li
                    key={m.id}
                    className="flex justify-between text-sm border-b border-slate-200 pb-1.5"
                  >
                    <span>{m.name}</span>
                    <span
                      className={`font-mono ${
                        positive
                          ? "text-emerald-700"
                          : negative
                            ? "text-red-700"
                            : "text-slate-500"
                      }`}
                    >
                      {positive ? "+" : ""}
                      {currency}
                      {bal.toFixed(0)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="text-xs text-slate-500 mt-2">
            正數 = 應收，負數 = 應付
          </p>
        </div>

        <div className="p-5 border border-blue-200 rounded-lg bg-blue-50">
          <h2 className="text-lg font-bold mb-3">最少轉帳次數</h2>
          {settlements.length === 0 ? (
            <p className="text-sm text-slate-600">
              {expenses.length === 0 ? "輸入支出後此處會顯示如何結帳" : "已平衡，不需轉帳"}
            </p>
          ) : (
            <ul className="space-y-2">
              {settlements.map((s, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 p-3 bg-white border border-blue-200 rounded text-sm"
                >
                  <span className="font-medium">{memberName(s.from)}</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-medium">{memberName(s.to)}</span>
                  <span className="ml-auto font-mono font-semibold text-blue-700">
                    {currency}
                    {s.amount.toFixed(0)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
