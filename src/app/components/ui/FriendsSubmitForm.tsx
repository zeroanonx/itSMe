"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/shadcn/form";
import { Input } from "@/app/components/shadcn/input";
import { Textarea } from "@/app/components/shadcn/textarea";
import { Button } from "@/app/components/shadcn/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/shadcn/card";

const formSchema = z.object({
  name: z.string().min(1, "请输入名称"),
  link: z.string().url("请输入有效的 URL"),
  desc: z.string().min(4, "描述至少 4 个字"),
  icon: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function FriendsSubmitForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      link: "",
      desc: "",
      icon: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const payload = {
      name: values.name,
      link: values.link,
      desc: values.desc,
      icon: values.icon || undefined,
    };

    const res = await fetch("/api/friends/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      alert("提交成功，感谢你的分享！");
      form.reset();
    } else {
      alert("提交失败，请稍后再试");
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg">提交你的项目 / 友链</CardTitle>
        <p className="text-sm text-muted-foreground leading-relaxed">
          请先将本网站添加至你的友链
          <br />
          提交后不会立即展示，我会定期人工审核。
          <br />
          请确保链接可访问，描述尽量简短清晰。
        </p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名称 *</FormLabel>
                  <FormControl>
                    <Input placeholder="项目 / 网站名称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* link */}
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>访问链接 *</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* desc */}
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>简短描述 *</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="一句话介绍你的项目（10~50 字）"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* icon */}
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>头像链接</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入完整头像链接" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              提交申请
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
