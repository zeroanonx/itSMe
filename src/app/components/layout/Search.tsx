"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearch } from "@/app/hooks";

export default function Search() {
  const { search, ready } = useSearch();
  const [q, setQ] = useState("");

  const results = search(q);

  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search..."
        className="border px-3 py-2 w-64"
      />

      {q && ready && results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border mt-1 z-50">
          {results.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="block px-3 py-2 hover:bg-gray-100 text-gray-600"
              prefetch
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
