import Image from "next/image";
import Link from "next/link";
import logo from "../../public/applejam_logo.png";
import ModeToggle from "./ModeToggle";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" passHref>
          <div className="flex items-center">
            <Image
              src={logo}
              width={64}
              height={64}
              placeholder="blur"
              className="w-16 h-16"
              alt="logo"
            />
            <span className="text-xl font-semibold cursor-pointer md:text-3xl">
              개발이 재밌는 날
            </span>
          </div>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="hidden sm:block">
          <Link href="/posts/1" passHref>
            <span className="p-1 font-medium cursor-pointer sm:p-4">Posts</span>
          </Link>
          <Link
            href="https://substantial-celsius-cbb.notion.site/f6160283ae074dd698fe85873462701b?pvs=4"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 font-medium cursor-pointer sm:p-4"
          >
            About
          </Link>
        </div>
        <ModeToggle />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
