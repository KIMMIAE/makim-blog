import Image from "next/image";
import Link from "next/link";
import logo from "../../public/applejam_logo.png";

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
            <span className="text-3xl font-semibold cursor-pointer">
              개발이 재밌는 날
            </span>
          </div>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/posts/1" passHref>
          <span  className="p-1 font-medium cursor-pointer sm:p-4">Posts</span>
        </Link>
        <Link
          href="https://substantial-celsius-cbb.notion.site/f6160283ae074dd698fe85873462701b?pvs=4"
          passHref
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 font-medium cursor-pointer sm:p-4"
          >
            About
          </a>
        </Link>
        {/* 다크모드 버튼 추가 */}
      </div>
    </header>
  );
};

export default Header;
