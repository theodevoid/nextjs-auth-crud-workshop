import Head from "next/head";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PostCard } from "~/features/post/components";
import { PostForm } from "~/features/post/components/PostForm";

const UserPage = () => {
  return (
    <>
      <Head>
        <title>Ask</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen max-w-screen-md flex-col py-24">
        <div className="flex h-fit items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={""} />
            <AvatarFallback className="text-3xl font-bold">VF</AvatarFallback>
          </Avatar>

          <h3 className="text-3xl font-bold">username</h3>
        </div>

        <section className="mt-10">
          <Card>
            <CardHeader>
              <CardTitle>Post on username's wall</CardTitle>
            </CardHeader>
            <CardContent>
              <PostForm body="" title="" />
            </CardContent>
          </Card>
        </section>

        <section className="mt-10">
          <h3 className="mb-4 text-2xl font-semibold">username's Feed</h3>

          <div className="flex flex-col gap-2">
            <PostCard />

            <Button className="mt-8 self-center" variant="ghost">
              See More
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserPage;
