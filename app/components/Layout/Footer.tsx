const Footer = () => {
  return (
    <footer className="m-4">
      <div className="w-full max-w-screen-xl mx-auto px-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
          © {new Date().getFullYear()} -{' '}
          <a
            href="https://shafirayhan.me/"
            className="text-red-500 hover:underline"
          >
            Shafi Rayhan
          </a>
          {' - '}All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
          <li>
            <a href="mailto:rayhanshafi7@gmail.com" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
