import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

export default function AppLayout() {
  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  );
}
