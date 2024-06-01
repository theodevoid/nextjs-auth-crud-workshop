import Link from "next/link";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import { signIn, useSession, signOut } from "next-auth/react";

export const Header = () => {
  const { data } = useSession();

  return (
    <header className="flex h-16 items-center justify-between border-b-2 px-4 md:h-20 md:px-8">
      <Link
        href={"/"}
        className="text-2xl font-bold hover:cursor-pointer md:text-3xl"
      >
        Ask
      </Link>

      <div className="flex gap-4 items-center">
        {
          data?.user ? <span>Welcome, {data.user.username}</span> : <Button onClick={() => signIn("github")}>Sign In</Button>
        }

        {
          data?.user ? 
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={data.user.image || ""} />
                <AvatarFallback className="font-bold">{data.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <Link href={`/`}>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> My Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> : null
        }
      </div>
    </header>
  );
};
