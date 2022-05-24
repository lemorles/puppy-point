import React from "react";
import SidebarWithHeader from "../components/SideBar";

export default function Layout({ children }) {
  return (
    <>
      <SidebarWithHeader>
        <main>{children}</main>
      </SidebarWithHeader>
    </>
  );
}
