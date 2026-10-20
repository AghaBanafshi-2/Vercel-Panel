'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [pass, setPass] = useState('');
  const router = useRouter();

  const submit = async () => {
    document.cookie = `auth=${pass}; path=/; max-age=86400`;
    router.push('/');
  };

  return (
    <div className="p-8 max-w-sm mx-auto">
      <h1 className="text-xl mb-4">ورود به پنل</h1>
      <input className="border p-2 w-full mb-2" type="password" value={pass} onChange={e => setPass(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full" onClick={submit}>ورود</button>
    </div>
  );
}