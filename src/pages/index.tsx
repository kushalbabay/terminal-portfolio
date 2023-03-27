import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Homepage from "./homepage/homepage";

const IndexPage: React.FC<PageProps> = () => {
  return <Homepage />;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Kushal's</title>;
