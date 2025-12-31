"use client";
import { DocSearch } from "@docsearch/react";

import "@docsearch/css";

function Search() {
  return (
    <DocSearch
      appId="EOAV23QT8V"
      apiKey="9ef4f77dbe072f02c3f4196670958833"
      indexName="zeroanonBlog"
    />
  );
}

export default Search;
