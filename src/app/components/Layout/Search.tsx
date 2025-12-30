"use client";
import { DocSearch } from "@docsearch/react";

import "@docsearch/css";

function Search() {
  return (
    <DocSearch
      appId="fb7a9a76-dafa-48c4-a5d4-d167af9b5dfa"
      apiKey="8e6f53c88fe532760456280b58d44671"
      indexName="docsearch"
    />
  );
}

export default Search;
