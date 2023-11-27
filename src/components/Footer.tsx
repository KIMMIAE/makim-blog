const Footer = () => {
  return (
    <footer className="py-8">
      <div className="flex justify-center">
        <span>{`© ${new Date().getFullYear()}`}</span>
        <span className="ml-1">makim</span>
      </div>
    </footer>
  );
};

export default Footer;
