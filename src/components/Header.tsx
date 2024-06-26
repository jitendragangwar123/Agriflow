import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import companyLogo from "../images/agriflow_logo.png";
import ThemeSwitch from "./ThemeSwitch";
import { Providers } from "./providers";

const Header = () => {
  return (
    <header>
      <div className="bg-white w-full">
        <div className="container flex items-center justify-between mx-auto px-4 max-w-screen-xl">
          <Link href="/">
            <Image src={companyLogo} alt="Agriflow" width="220" height="100" />
          </Link>
          <nav className="flex items-center">
            <ul className="flex gap-2 text-2xl font-semibold">
              <li className="mr-6 text-complementary">
                <Link href="/">
                  <h3 className="relative text-2xl font-extrabold text-lime-600 inline-block transition-all after:absolute after:bottom-0 after:left-1/2 after:block after:h-0.5 after:w-0 after:bg-neutral after:transition-all after:content-[''] hover:text-red hover:after:left-0 hover:after:w-full hover:text-blue-400 focus:outline-none">
                    Home
                  </h3>
                </Link>
              </li>
              <li className="mr-6 text-complementary">
                <Link href="/producer">
                  <h3 className="relative inline-block text-2xl font-extrabold text-lime-600 text-complementary transition-all after:absolute after:bottom-0 after:left-1/2 after:block after:h-0.5 after:w-0 after:bg-neutral after:transition-all after:content-[''] hover:text-neutral hover:after:left-0 hover:after:w-full hover:text-blue-400 focus:outline-none">
                    Producer
                  </h3>
                </Link>
              </li>
              <li className="mr-6 text-complementary">
                <Link href="/consumer">
                  <h3 className="relative inline-block text-2xl font-extrabold mr-0 text-lime-600 text-complementary transition-all after:absolute after:bottom-0 after:left-1/2 after:block after:h-0.5 after:w-0 after:bg-neutral after:transition-all after:content-[''] hover:text-neutral hover:after:left-0 hover:after:w-full hover:text-blue-400 focus:outline-none">
                    Consumer
                  </h3>
                </Link>
              </li>
              <li className="mr-6 text-complementary">
                <Link href="/">
                  <h3 className="relative inline-block text-2xl font-extrabold mr-0 text-lime-600 text-complementary transition-all after:absolute after:bottom-0 after:left-1/2 after:block after:h-0.5 after:w-0 after:bg-neutral after:transition-all after:content-[''] hover:text-neutral hover:after:left-0 hover:after:w-full hover:text-blue-400 focus:outline-none">
                    Contact Us
                  </h3>
                </Link>
              </li>
              <li className="mr-6">
                <ConnectButton
                  showBalance={false}
                  chainStatus="none"
                ></ConnectButton>
              </li>
              <li className="mr-6 mt-2">
                <Providers>
                  <ThemeSwitch />
                </Providers>           
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
