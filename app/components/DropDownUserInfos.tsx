import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";

export default async function DropDownUserInfos() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
      <p className="text-xs leading-none text-muted-foreground">
        {session?.user?.email}
      </p>
    </div>
  );
}
