import { Ellipsis } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const PostCard = () => {
  return (
    <Card>
      <CardHeader>
        <p className="text-muted-foreground">@username</p>
        <div className="flex items-center justify-between">
          <CardTitle>The post's title</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem>Edit Post</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          odio aliquid! Accusamus harum suscipit earum modi nam inventore
          tenetur distinctio repudiandae tempore, quidem minima sapiente
          dignissimos ea repellat totam consequuntur voluptatum sunt laudantium
          illum id eligendi maxime cum a? Voluptate expedita sed, eveniet
          facilis sit assumenda quo tempora rem repudiandae.
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/post/#`} className="underline">
          See more
        </Link>
      </CardFooter>
    </Card>
  );
};
