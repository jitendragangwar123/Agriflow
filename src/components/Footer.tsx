import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaDribbble,
} from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="bg-gray-800 p-8 text-gray-200 mt-100">
        <div className="max-w-15xl mx-auto">
          <div className="flex gap-2 justify-between max-md:flex-col max-md:text-center">
            <div className="mb-5">
              <h4 className="text-3xl pb-4 font-bold font-title">
                agriflow
                <span className="text-blue-400">.com</span>
              </h4>
              <p className="text-gray-500 pb-2">
                Join 1000+ others and never miss out our Latest Updates.
              </p>
              <form
                action=""
                className="flex flex-row max-sm:flex-col max-sm:items-center"
              >
                <input
                  type="text"
                  className="text-gray-500 w-2/3 p-2 focus:border-blue-400 max-sm:mb-2"
                  placeholder="Enter your email"
                />
                <button className="bg-blue-500 hover:bg-blue-700 duration-300 w-1/3 p-2 font-semibold">
                  Subscribe
                </button>
              </form>
            </div>

            <div className="flex justify-between">
              <div className="mb-5 md:mx-40">
                <h4 className="pb-4 text-xl font-semibold">Resources</h4>
                <ul className="text-gray-500">
                  <li className="pb-2 flex">
                    <BiChevronRight
                      className="relative text-blue-400"
                      size={25}
                    />
                    <span className="hover:text-blue-400 cursor-pointer font-semibold duration-200">
                      Agriflow
                    </span>
                  </li>
                  <li className="pb-2 flex">
                    <BiChevronRight
                      className="relative text-blue-400"
                      size={25}
                    />
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-400 cursor-pointer font-semibold duration-200"
                    >
                      Blogs
                    </a>
                  </li>
                  <li className="pb-2 flex">
                    <BiChevronRight
                      className="relative text-blue-400"
                      size={25}
                    />
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-400 cursor-pointer font-semibold duration-200"
                    >
                      News
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <h4 className="pb-4 text-xl font-semibold">Legal</h4>
                <ul className="text-gray-500">
                  <li className="pb-2 flex">
                    <BiChevronRight
                      className="relative text-blue-400"
                      size={25}
                    />
                    <span className="hover:text-blue-400 cursor-pointer font-semibold duration-200">
                      Privacy Policy
                    </span>
                  </li>
                  <li className="pb-2 flex">
                    <BiChevronRight
                      className="relative text-blue-400"
                      size={25}
                    />
                    <span className="hover:text-blue-400 cursor-pointer font-semibold duration-200">
                      Terms & Conditions
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-600 text-gray-400 flex max-sm:flex-col justify-between items-center px-10 py-5 mb-auto font-semibold text-center">
        <div className="text-base">
          © 2022-2023 Agriflow™. All Rights Reserved.
        </div>
        <div className="flex justify-center items-center gap-4">
          <FaDribbble className="text-xl cursor-pointer" />
          <FaFacebook className="text-xl cursor-pointer" />
          <FaInstagram className="text-xl cursor-pointer" />
          <FaLinkedin className="text-xl cursor-pointer" />
          <FaTwitter className="text-xl cursor-pointer" />
          <FaYoutube className="text-xl cursor-pointer" />
        </div>
      </div>
    </>
  );
}
export default Footer;
