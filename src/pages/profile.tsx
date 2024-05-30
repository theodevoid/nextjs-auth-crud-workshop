import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const profileFormSchema = z.object({
  username: z.string().min(3).max(20),
});

type ProfileFormSchema = z.infer<typeof profileFormSchema>;

const ProfilePage = () => {
  const form = useForm<ProfileFormSchema>({
    defaultValues: {
      username: "",
    },
  });

  return (
    <>
      <main className="mx-auto flex min-h-screen max-w-screen-md flex-col py-24">
        <h1 className="mb-4 text-4xl font-bold">Edit Profile</h1>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Username" />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="mt-4" type="submit">
              Save
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
};

export default ProfilePage;
