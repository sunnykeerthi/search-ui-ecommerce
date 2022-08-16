import PageRouter from "./PageRouter";
import StandardLayout from "./pages/StandardLayout";
import { SearchHeadlessProvider } from "@yext/search-headless-react";

import { routeConfig } from "./config/routeConfig";
import { PageViewContextProvider } from "./context/PageViewContext";
import { createContext } from "react";
import { answersHeadlessConfig } from "./config/answersHeadlessConfig";
import { CartProvider } from "./context/CartContext";
export type ScreenSize = "sm" | "md" | "lg" | "xl";

export const ResponsiveContext = createContext<ScreenSize>("xl");
export default function App() {
  return (
    <SearchHeadlessProvider {...answersHeadlessConfig}>
      <CartProvider>
        <PageViewContextProvider>
          <PageRouter Layout={StandardLayout} routes={routeConfig} />
        </PageViewContextProvider>
      </CartProvider>
    </SearchHeadlessProvider>
  );
}
