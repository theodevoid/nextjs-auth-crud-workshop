import { GetServerSideProps } from "next";
import Head from "next/head";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PostCard } from "~/features/post/components";
import { PostForm } from "~/features/post/components/PostForm";
import { db } from "~/server/db";
import { api } from "~/utils/api";

type UserPageProps = {
  id: string;
  username: string;
  name: string;
  image: string
}

const UserPage = (props: UserPageProps) => {
  const { data: posts } = api.post.getUserPosts.useQuery(props.id);

  return (
    <>
      <Head>
        <title>Ask</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen max-w-screen-md flex-col py-24">
        <div className="flex h-fit items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={props.image} />
            <AvatarFallback className="text-3xl font-bold">{props.username.charAt(0)}</AvatarFallback>
          </Avatar>

          <h3 className="text-3xl font-bold">{props.username}</h3>
        </div>

        <section className="mt-10">
          <Card>
            <CardHeader>
              <CardTitle>Post on {props.username}'s wall</CardTitle>
            </CardHeader>
            <CardContent>
              <PostForm body="" title="" recipientId={props.id} />
            </CardContent>
          </Card>
        </section>

        <section className="mt-10">
          <h3 className="mb-4 text-2xl font-semibold">{props.username}'s Feed</h3>

          <div className="flex flex-col gap-2">
            {
              posts?.map(post => {
                return <PostCard 
                body={post.body} 
                title={post.title} 
                username={post.author.username as string} 
                id={post.id}
                />
              })
            }
            
            <Button className="mt-8 self-center" variant="ghost">
              See More
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async ({ query }) => {
  const { username } = query;

  const user = await db.user.findFirst({
    where: {
      username: username as string,
    }
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      id: user.id,
      image: user.image as string,
      name: user.name as string,
      username: user.username || "",
    }
  }
}

export default UserPage;
