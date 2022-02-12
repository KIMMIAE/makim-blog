const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <a href="#">
          {/* TODO: 블로그 로고 추가*/}
          <span className="text-2xl font-semibold">개발이 재밌는 날</span>
        </a>
      </div>
      <div className="flex items-center">
        <a href="#" className="p-1 font-medium sm:p-4">Posts</a>
        <a href="#" className="p-1 font-medium sm:p-4">Tags</a>
        <a href="#" className="p-1 font-medium sm:p-4">About</a>
        {/* 다크모드 버튼 추가 */}
      </div>
    </header>
  );
}

export default Header;