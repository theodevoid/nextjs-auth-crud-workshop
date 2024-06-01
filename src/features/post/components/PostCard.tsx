import { Ellipsis } from "lucide-react";
import { useSession } from "next-auth/react";
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
import { api } from "~/utils/api";

type PostCardProps = {
  username: string;
  title: string;
  body: string;
  id: string
}

export const PostCard = (props: PostCardProps) => {
  const { data } = useSession();

  const { mutate: deletePost } = api.post.deletePost.useMutation({
    onSuccess: () => {
      alert("Post deleted")
    }
  })

  const onDelete = () => {
    deletePost(props.id)
  }

  return (
    <Card>
      <CardHeader>
        <p className="text-muted-foreground">@{props.username}</p>
        <div className="flex items-center justify-between">
          <CardTitle>{props.title}</CardTitle>

          {
            data?.user?.username === props.username ? 
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem>Edit Post</DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-destructive">
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> : null
          }
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">
          {props.body}
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
