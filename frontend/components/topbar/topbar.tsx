"use client";

import { usePathname } from "next/navigation";
import SearchBar from "./search-bar";
import UserMenu from "./user-menu";
import NotificationsMenu from "./notifications-menu";

export default function Topbar() {
  const pathname = usePathname() ?? "";
  const portalTitle = pathname.startsWith("/admin")
    ? "Admin Portal"
    : pathname.startsWith("/staff")
    ? "Staff Portal"
    : "Developer Portal";

  return (
    <header
      className="
      sticky
      top-0
      z-40
      h-16

      border-b
      border-[var(--border)]

      bg-[rgba(5,20,36,0.75)]

      backdrop-blur-xl
      "
    >
      <div
        className="
        h-full

        px-6

        flex
        items-center
        justify-between
        "
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">


  <h2 className="font-semibold text-lg">
    {portalTitle}
  </h2>
</div>

          {/* <SearchBar /> */}
        </div>

        <div className="flex items-center gap-3">

          <NotificationsMenu />

          <UserMenu />

        </div>
      </div>
    </header>
  );
}