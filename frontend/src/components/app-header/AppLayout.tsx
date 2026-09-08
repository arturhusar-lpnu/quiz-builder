import type { FC, PropsWithChildren } from "react";
import { AppHeader } from "./AppHeader";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="app-layout">
      <AppHeader />
      <main className="app-layout__content">{children}</main>
    </div>
  );
};
