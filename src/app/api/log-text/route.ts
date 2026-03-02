export async function POST(req: Request) {
  const data = await req.json();

  console.log("User Agent:", data.userAgent);
  console.log("In Trust:", data.window);

  return new Response(JSON.stringify({ message: "OK" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
