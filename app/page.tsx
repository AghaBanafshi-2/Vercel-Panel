'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [quota, setQuota] = useState('0');
  const [expiry, setExpiry] = useState('');

  const load = async () => {
    const res = await fetch('/api/users');
    setUsers(await res.json());
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    const uuid = crypto.randomUUID();
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, uuid, quota: Number(quota), expiry }),
    });
    setName(''); setQuota('0'); setExpiry('');
    load();
  };

  const del = async (id: number) => {
    await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">پنل مدیریت پروکسی</h1>
      <div className="flex gap-2 mb-6">
        <input className="border p-2 rounded" placeholder="نام" value={name} onChange={e => setName(e.target.value)} />
        <input className="border p-2 rounded" placeholder="حجم" value={quota} onChange={e => setQuota(e.target.value)} />
        <input className="border p-2 rounded" type="date" value={expiry} onChange={e => setExpiry(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 rounded" onClick={add}>افزودن</button>
      </div>
      <table className="w-full border">
        <thead><tr className="bg-gray-100"><th className="p-2">نام</th><th className="p-2">UUID</th><th className="p-2">حجم</th><th className="p-2">انقضا</th><th className="p-2">لینک</th><th className="p-2">حذف</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-t text-center">
              <td className="p-2">{u.name}</td>
              <td className="p-2 text-xs">{u.uuid}</td>
              <td className="p-2">{u.quota}</td>
              <td className="p-2">{u.expiry ? new Date(u.expiry).toLocaleDateString('fa-IR') : '-'}</td>
              <td className="p-2"><a className="text-blue-600 underline" href={`/api/sub/${u.uuid}`} target="_blank">دریافت</a></td>
              <td className="p-2"><button className="text-red-600" onClick={() => del(u.id)}>حذف</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}