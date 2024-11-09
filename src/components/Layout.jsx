import AppBar from "./AppBar/AppBar";

import { Suspense } from "react";

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <main className="pages">
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </>
  );
};

export default Layout;
