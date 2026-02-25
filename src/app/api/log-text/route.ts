export async function POST(req: Request) {
  const data = await req.json();

  console.log("Повідомлення:", data.text);

  return new Response(JSON.stringify({ message: "Текст виведено в консоль" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
