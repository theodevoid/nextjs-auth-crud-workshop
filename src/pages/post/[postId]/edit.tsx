import { PostForm } from "~/features/post/components";

const EditPostPage = () => {
  return (
    <>
      <main className="mx-auto flex min-h-screen max-w-screen-md flex-col py-24">
        <h1 className="mb-4 text-4xl font-bold">Edit Post</h1>
        <PostForm title="" body="" />
      </main>
    </>
  );
};

export default EditPostPage;
