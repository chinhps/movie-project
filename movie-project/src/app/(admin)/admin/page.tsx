import { auth } from "@/auth";
import CardCollection from "@/components/Global/CardCollection";

export default async function AdminPage() {
  const session = await auth();
  return (
    <>
      <CardCollection title="Trang chủ">
        {JSON.stringify(session)}
      </CardCollection>
    </>
  );
}
