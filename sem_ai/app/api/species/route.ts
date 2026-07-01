import { createClient } from "@/lib/server";

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  const supabase = await createClient()

  const { data } = await supabase.from('tree_species').select('*')

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
 
/*export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { name } = body;
 
  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), name };
 
  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}*/