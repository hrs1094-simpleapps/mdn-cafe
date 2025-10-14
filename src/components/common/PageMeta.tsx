import { HelmetProvider, Helmet } from "react-helmet-async";

const PageMeta = ( ) => (
  <Helmet>
    <title>{"MDN Cafe"}</title>
    <meta name="description" content={"MDN Cafe, Food management"} />
  </Helmet>
);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
