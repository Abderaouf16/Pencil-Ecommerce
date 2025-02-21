"use client";

import { Session } from "next-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingsSchema } from "@/types/settings-schema";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { settings } from "@/server/actions/settings";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form.success";
import { UploadButton } from "@/app/api/uploadthing/upload";
import { Avatar } from "@/components/ui/avatar";


type SettingsForm = {
  session: Session;
};

export default function SettingsCard(session: SettingsForm) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [avatarUploading, setAvatarUploading] = useState(false);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: session.session.user.name || undefined,
      password: undefined,
      newPassword: undefined,
      email: session.session.user?.email || undefined,
      image: session.session.user?.image || undefined,
      isTwoFactorEnabled: session.session.user?.isTwoFactorEnabled || undefined,
    },
  });

  const { execute, status } = useAction(settings, {
    onSuccess(data) {
      if (data.data?.success !== undefined) {
        setSuccess(data.data.success);
      }
      if (data.data?.error !== undefined) {
        setError(data.data.error);
      }
    },
  });

  function onSubmit(values: z.infer<typeof SettingsSchema>) {
    execute(values);
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Your Settings</CardTitle>
          <CardDescription>Update your account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Abdou"
                        disabled={status === "executing"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <div className="flex items-center gap-4 ">
                      {!form.getValues("image") && (
                        <div className=" font-bold bg-primary/25 rounded-full w-5 h-5 flex items-center justify-center p-5  ">
                          {session.session.user?.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <Avatar>
                      {form.getValues("image") && (
                        <Image
                          className=" rounded-full"
                          src={form.getValues("image")!}
                          alt="userImg"
                          width={42}
                          height={42}
                        />
                      )}
                      </Avatar>

                      <UploadButton
                        className="scale-75 ut-button:ring-primary   ut-label:bg-red-50  ut-button:bg-primary/75  hover:ut-button:bg-primary/100 ut:button:transition-all ut-button:duration-500  ut-label:hidden ut-allowed-content:hidden"
                        endpoint="avatarUploader"
                        onUploadBegin={() => {
                          setAvatarUploading(true);
                        }}
                        onUploadError={(error) => {
                          form.setError("image", {
                            type: "validate",
                            message: error.message,
                          });
                          setAvatarUploading(false);
                          return;
                        }}
                        onClientUploadComplete={(res) => {
                          form.setValue("image", res[0].url!);
                          setAvatarUploading(false);
                          return;
                        }}
                        content={{
                          button({ ready }) {
                            if (ready) return <div>Change Avatar</div>;
                            return <div>Uploading...</div>;
                          },
                        }}
                      />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="User Image"
                        type="hidden"
                        disabled={status === "executing"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        disabled={
                          status === "executing" ||
                          session.session.user.isOAuth === true
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> New password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        disabled={
                          status === "executing" ||
                          session.session.user.isOAuth === true
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Two Factor Authentication</FormLabel>
                    <FormDescription>
                      Enable two factor authentication for your account
                    </FormDescription>
                    <FormControl>
                      <Switch
                        disabled={
                          status === "executing" ||
                          session.session.user.isOAuth === true
                        }
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />

              <Button
                type="submit"
                disabled={status === "executing" || avatarUploading}
              >
                Update your settings
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
