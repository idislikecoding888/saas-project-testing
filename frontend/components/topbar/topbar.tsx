import SearchBar from "./search-bar";
import UserMenu from "./user-menu";

export default function Topbar() {
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
          <h2 className="font-semibold text-lg">
            IDProofPro Console
          </h2>

          <SearchBar />
        </div>

        <UserMenu />
      </div>
    </header>
  );
}