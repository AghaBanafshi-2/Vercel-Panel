import { NextResponse } from 'next/server';
import { initDb, getUsers, addUser, deleteUser } from '@/lib/db';

export async function GET() {
  await initDb();
  return NextResponse.json(await getUsers());
}

export async function POST(req: Request) {
  await initDb();
  const { name, uuid, quota, expiry } = await req.json();
  const user = await addUser(name, uuid, quota, expiry || null);
  return NextResponse.json(user);
}

export async function DELETE(req: Request) {
  const id = Number(new URL(req.url).searchParams.get('id'));
  await deleteUser(id);
  return NextResponse.json({ ok: true });
}