import { redirect } from "next/navigation";

export default async function FleetIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/admin/fleet/${id}/edit`);
}
