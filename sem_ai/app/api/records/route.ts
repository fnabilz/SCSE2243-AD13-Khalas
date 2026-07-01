import { NextResponse } from 'next/server'
import { createClient } from "@/lib/server";

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  const supabase = await createClient()
  const { data } = await supabase
  .from('tree_plantation_records')
  .select('*')

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
 
export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from('tree_plantation_records')
    .insert(body)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}