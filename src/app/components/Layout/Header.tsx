import Logo from "@/app/components/ui/Logo";
import NavBar from "@/app/components/Layout/Navbar";
import { Link } from "next-view-transitions";

export default function Header() {
  return (
    <header className="z-40 flex items-center justify-between relative px-6 md:px-12 py-6">
      <Link href="/">
        <Logo />
      </Link>
      <div className="spacer" />
      <NavBar />
    </header>
  );
}
