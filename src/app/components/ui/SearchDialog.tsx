"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search } from "lucide-react";
import { Command } from "cmdk";
import { Dialog, DialogContent } from "./dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useSearch } from "@/app/hooks";
import { stripImagesAndTags } from "@/app/utils";

/* 高亮（安全） */
function highlight(text: string, query: string) {
  if (!query) return text;
  const words = query.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return text;

  const reg = new RegExp(`(${words.join("|")})`, "gi");
  return text.split(reg).map((part, i) =>
    reg.test(part) ? (
      <mark key={i} className="rounded bg-primary/20 px-1 text-primary">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export function SearchDialog() {
  const router = useRouter();
  const { search, ready } = useSearch();

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [value, setValue] = React.useState<string>("");

  const results = ready ? search(query) : [];

  /* ⌘K / Ctrl+K */
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((open) => !open);
      }
      // ESC 关闭
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  /* 打开时清空搜索 */
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setValue("");
    }
  }, [open]);

  /* 跳转 */
  const handleSelect = React.useCallback(
    (id: string) => {
      const item = results.find((r) => r.id === id);
      if (!item) return;
      setOpen(false);
      setQuery("");
      setValue("");
      router.push(item.url);
    },
    [results, router]
  );

  return (
    <div className="hidden md:block">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-accent/50 transition-colors"
      >
        <Search className="h-4 w-4" />
        Search
        <kbd className="ml-2 rounded border px-1.5 text-xs font-mono bg-muted">
          ⌘K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-2xl overflow-hidden rounded-xl border shadow-xl">
          <DialogTitle className="sr-only">Search Documentation</DialogTitle>

          <Command
            value={value}
            onValueChange={setValue}
            loop
            className="flex flex-col outline-none"
            shouldFilter={false} // 禁用 CMDK 内置过滤，我们用 search hook
          >
            {/* Input */}
            <div className="flex items-center gap-2 border-b px-4">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <Command.Input
                autoFocus
                value={query}
                onValueChange={setQuery}
                placeholder="Search documentation..."
                className="h-14 w-full bg-transparent outline-none placeholder:text-muted-foreground text-base flex-1"
              />
              <kbd className="rounded border px-2 py-1 text-xs font-mono bg-muted hidden md:inline-flex">
                ESC
              </kbd>
            </div>

            {/* List */}
            <Command.List className="max-h-[420px] overflow-y-auto py-2">
              {query && results.length === 0 && (
                <Command.Empty className="px-6 py-8 text-center text-sm text-muted-foreground">
                  <p className="font-medium mb-1">No results found</p>
                  <p className="text-xs">Try different keywords</p>
                </Command.Empty>
              )}

              {!query && (
                <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Start typing to search</p>
                  <p className="text-xs">
                    Search for topics, guides, and API references
                  </p>
                </div>
              )}

              {results.map((item) => (
                <Command.Item
                  key={item.id}
                  value={item.id}
                  onSelect={handleSelect}
                  className="group relative mx-2 my-1 cursor-pointer select-none rounded-lg px-4 py-3 transition-all duration-150 border border-transparent data-[selected=true]:bg-accent data-[selected=true]:border-primary/40 data-[selected=true]:border hover:bg-accent/50 outline-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {/* 选中指示器 */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-data-[selected=true]:bg-primary rounded-l-lg transition-colors" />

                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      {highlight(item.title, query)}
                    </span>
                    <span className="text-xs text-muted-foreground line-clamp-2">
                      {highlight(
                        stripImagesAndTags(item.content).slice(0, 90),
                        query
                      )}
                      …
                    </span>
                  </div>

                  {/* 选中时显示提示 */}
                  <div className="absolute right-1 -bottom-2 -translate-y-1/2 opacity-0 group-data-[selected=true]:opacity-100 transition-opacity">
                    <CornerDownLeft className="w-[18px]" />
                  </div>
                </Command.Item>
              ))}
            </Command.List>

            {/* Footer */}
            {results.length > 0 && (
              <div className="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground bg-accent/10">
                <span>
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </span>
                <span>
                  provider by{" "}
                  <span className="text-(--accent-primary)">zeroanon</span>
                </span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border px-1.5 py-0.5 font-mono bg-background">
                      ↑
                    </kbd>
                    <kbd className="rounded border px-1.5 py-0.5 font-mono bg-background">
                      ↓
                    </kbd>
                    <span>to navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border px-1.5 py-0.5 font-mono bg-background">
                      Enter
                    </kbd>
                    <span>to select</span>
                  </span>
                </div>
              </div>
            )}
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}
