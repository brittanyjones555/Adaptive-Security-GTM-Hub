export const dynamic = 'force-dynamic';

export async function GET() {
  const key = process.env.ANTHROPIC_API_KEY;
  return Response.json({
    has_key: !!key,
    key_length: key ? key.length : 0,
    key_prefix: key ? key.substring(0, 7) : null,
    key_suffix: key ? key.substring(key.length - 4) : null,
    starts_with_sk_ant: key ? key.startsWith('sk-ant-') : false,
    has_whitespace: key ? (key !== key.trim()) : false,
    has_quotes: key ? (key.includes('"') || key.includes("'")) : false,
    node_env: process.env.NODE_ENV,
    vercel_env: process.env.VERCEL_ENV || 'not-vercel',
    all_anthropic_keys: Object.keys(process.env).filter(k => k.toLowerCase().includes('anthropic')),
  });
}
