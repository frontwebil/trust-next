export async function POST(req: Request) {
  const data = await req.json();

  console.log("User Agent:", data.userAgent);
  console.log("In Trust:", data.isTrust);
  console.log("utm:", data.utm);
  console.log("injected", data.injected);

  return new Response(JSON.stringify({ message: "OK" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
