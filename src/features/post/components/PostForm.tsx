import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { CreatePostFormSchema } from "../forms/create-post";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "~/components/ui/form";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";

type PostFormProps = CreatePostFormSchema & {
  recipientId: string
};

export const PostForm: React.FC<PostFormProps> = ({ body, title, recipientId }) => {
  const form = useForm<CreatePostFormSchema>({
    defaultValues: {
      body: body ?? "",
      title: title ?? "",
    },
  });

  const { mutate } = api.post.create.useMutation({
    onSuccess: () => {
      alert("Post submitted!")
      form.reset()
    }
  });

  const submitPost = (values: CreatePostFormSchema) => {
    mutate({
      body: values.body,
      title: values.title,
      recipientId,
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitPost)}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Post title" />
                </FormControl>
                <FormDescription
                  className={cn(
                    fieldState.error &&
                      field.value.length > 1 &&
                      "text-destructive",
                  )}
                >
                  {field.value.length}/80
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field, fieldState, formState }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="The rest of your post.."
                    rows={3}
                    className="resize-none"
                  />
                </FormControl>
                <FormDescription
                  className={cn(
                    fieldState.error &&
                      field.value.length > 1 &&
                      "text-destructive",
                  )}
                >
                  {field.value.length}/280
                </FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-2 w-fit">
            Submit Post
          </Button>
        </div>
      </form>
    </Form>
  );
};
