import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import companyLogo from "../images/agriflow_logo.png";
import ThemeSwitch from "./ThemeSwitch";
const Header = () => {
  return (
    <header >
      <div className="container mt-0 mb-0 ml-0 mr-0 flex items-center justify-between">
        <h1 className="ml-2 mt-1">
          <Link href="/">
            <Image src={companyLogo} alt="Agriflow" width="300" height="100" />
          </Link>
        </h1>
        <nav className="flex items-center">
          <ul className="flex gap-2 text-2xl font-semibold">
            <li className="mr-6 text-complementary">
              <Link href="/">
                <h3 className="relative text-lg text-lime-600 inline-block transition-all after:absolute after:bottom-0 after:left-1/2 after:block after:h-0.5 after:w-0 after:bg-neutral after:transition-all after:content-[''] hover:text-red hover:after:left-0 hover:after:w-full hover:text-blue-600 focus:outline-none">
                  Home
                </h3>
              </Link>
            </li>
            <li className="mr-6 text-complementary">
              <Link href="/producer">
                <h3 className="relative inline-block text-lg text-lime-600 text-complementary transition-all after:absolute after:bottom-0 after:left-1/2 after:block after:h-0.5 after:w-0 after:bg-neutral after:transition-all after:content-[''] hover:text-neutral hover:after:left-0 hover:after:w-full hover:text-blue-600 focus:outline-none">
                  Producer
                </h3>
              </Link>
            </li>
            <li className="mr-6 text-complementary">
              <Link href="/consumer">
                <h3 className="relative inline-block text-lg mr-0 text-lime-600 text-complementary transition-all after:absolute after:bottom-0 after:left-1/2 after:block after:h-0.5 after:w-0 after:bg-neutral after:transition-all after:content-[''] hover:text-neutral hover:after:left-0 hover:after:w-full hover:text-blue-600 focus:outline-none">
                  Consumer
                </h3>
              </Link>
            </li>
            <li className="mr-6 text-complementary">
              <Link href="/contactus">
                <h3 className="relative inline-block text-lg mr-0 text-lime-600 text-complementary transition-all after:absolute after:bottom-0 after:left-1/2 after:block after:h-0.5 after:w-0 after:bg-neutral after:transition-all after:content-[''] hover:text-neutral hover:after:left-0 hover:after:w-full hover:text-blue-600 focus:outline-none">
                  Contact Us
                </h3>
              </Link>
            </li>
            <li className="mr-6 text-complementary">
              <ConnectButton
                //showBalance={false}
                chainStatus="none"
              ></ConnectButton>
            </li>
            <li className="mr-6 mt-2 text-complementary">
              <ThemeSwitch/>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
