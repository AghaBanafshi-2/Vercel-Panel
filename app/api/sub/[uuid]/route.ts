import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: Request, { params }: { params: { uuid: string } }) {
  const { rows } = await sql`SELECT * FROM users WHERE uuid = ${params.uuid}`;
  if (rows.length === 0) return new NextResponse('Not found', { status: 404 });
  const user = rows[0];

  const WORKER_HOST = process.env.WORKER_HOST || 'your-worker.workers.dev';
  const config = `vless://${user.uuid}@${WORKER_HOST}:443?encryption=none&security=tls&sni=${WORKER_HOST}&type=ws&host=${WORKER_HOST}&path=%2F#${user.name}`;

  const base64 = Buffer.from(config).toString('base64');
  return new NextResponse(base64, {
    headers: {
      'Content-Type': 'text/plain',
      'Subscription-Userinfo': `upload=0; download=0; total=${user.quota}; expire=${user.expiry ? new Date(user.expiry).getTime() / 1000 : 0}`,
    },
  });
}