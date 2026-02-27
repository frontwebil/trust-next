import prisma from "@/lib/prisma";
import AdminPage from "@/Pages/AdminPage/AdminPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Admin() {
  const cookieStore = cookies();
  const session = (await cookieStore).get("admin_session");

  if (!session || session.value !== process.env.ADMIN_SECRET) {
    redirect("/admin-logs/login");
  }

  const ipLogs = await prisma.ipGeo.findMany({
    orderBy: { createdAt: "desc" },
  });

  const hashes = await prisma.hashAddress.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AdminPage ipLogs={ipLogs} hashes={hashes} />;
}
