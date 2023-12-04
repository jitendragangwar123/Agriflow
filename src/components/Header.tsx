import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";


const Header = () => {
 return (
   <header className="bg-green-500">
     <div className="container mx-auto flex items-center justify-between p-4">
       <h1 className="rounded-xl py-1 px-3 text-4xl font-bold text-complementary shadow-neutral [transition:color_.5s_ease-in-out,box-shadow_.5s_ease-in-out] hover:text-highlight-300 hover:shadow-hover">
         <Link href="/">AgriMartX</Link>
       </h1>
       <nav className="flex items-center gap-10">
         <ul className="flex gap-6 text-2xl font-semibold">
           <li className="mr-6 text-complementary ">
             <Link href="/">
               <h3 className="relative inline-block transition-all after:absolute after:bottom-0 after:left-1/2 after:block after:h-0.5 after:w-0 after:bg-neutral after:transition-all after:content-[''] hover:text-neutral hover:after:left-0 hover:after:w-full">
                 Consumer
               </h3>
             </Link>
           </li>
           <li className=" mr-6 text-complementary ">
             <Link href="/">
               <h3 className="relative inline-block text-complementary transition-all after:absolute after:bottom-0 after:left-1/2 after:block after:h-0.5 after:w-0 after:bg-neutral after:transition-all after:content-[''] hover:text-neutral hover:after:left-0 hover:after:w-full">
                 Producer
               </h3>
             </Link>
           </li>
           <li className=" mr-6 text-complementary ">
             <Link href="/">
               <h3 className="relative inline-block text-complementary transition-all after:absolute after:bottom-0 after:left-1/2 after:block after:h-0.5 after:w-0 after:bg-neutral after:transition-all after:content-[''] hover:text-neutral hover:after:left-0 hover:after:w-full">
                 MarketPlace
               </h3>
             </Link>
           </li>
         </ul>
         <ConnectButton
             //showBalance={false}
             chainStatus="none"
           ></ConnectButton>
       </nav>
     </div>
   </header>
 );
};


export default Header;





