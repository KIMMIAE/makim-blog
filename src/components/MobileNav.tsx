"use client";

import Link from "next/link";
import { useState } from "react";

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false);
  function handleMenuClick() {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflowY = "auto";
      } else {
        document.body.style.overflowY = "hidden";
      }
      return !status;
    });
  }
  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label="Toggle Menu"
        className="flex items-center justify-center w-8 h-8 ml-2 mr-2 rounded"
        onClick={handleMenuClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {navShow ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          )}
        </svg>
      </button>
      <div
        className={`fixed right-0 z-10 w-full h-full duration-300 ease-in-out transform top-32 bg-zinc-200 dark:bg-zinc-700 opacity-90 ${
          navShow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full mt-8">
          <Link href="/posts/1" passHref>
            <span
              className="px-6 py-4 text-2xl font-semibold"
              onClick={handleMenuClick}
            >
              Posts
            </span>
          </Link>
          <Link href="/tags" passHref>
            <span
              className="px-6 py-4 text-2xl font-semibold"
              onClick={handleMenuClick}
            >
              Tags
            </span>
          </Link>
          <Link
            href="https://substantial-celsius-cbb.notion.site/f6160283ae074dd698fe85873462701b?pvs=4"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 text-2xl font-semibold"
            onClick={handleMenuClick}
          >
            About
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
