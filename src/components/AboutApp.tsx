import Image from "next/image";
import BlockChain from "../images/aboutApp.png";
import Dashboard from "./Dashboard";
import ImageSlideshow from "./ImageSlideshow";
import React from "react";


const AboutApp = () => {

  const imgs = ['aboutApp.png', 'agriflow_logo.png'];

 return (
   <>
     <div className = "w-full py-14 bg-gradient-to-b from-gray-800 to-black text-white">
       <h1 className = "text-4xl pt-8 pb-4 px-24 font-semibold max-md:text-center text-white"><Dashboard /> <span className='text-blue-500'></span></h1>
       <div className = "mx-auto flex flex-col-reverse items-center justify-center h-full px-4 md:px-8 my-3 md:flex-row">
         <div>
           <p className = "text-justify text-lg max-md:py-3 px-16 max-md:px-4 font-medium text-white">
           <span className='text-green-500'>Agriflow</span> is more than a supply chain management platform it&apos;s your dedicated partner in cultivating success within the agricultural industry. With a focus on the seamless flow of agricultural goods, Agriflow is committed to optimizing the supply chain for fruits vegetables rice and more. Our tagline encapsulates our mission we plant the seeds for your success and provide the nurturing support needed for sustained growth. Partner with Agriflow for a future where your agricultural ventures flourish through streamlined supply chain solutions.
           </p>
           <p className = "text-justify text-lg max-md:py-3 px-16 max-md:px-4 font-medium text-white py-10">
           <span className='text-green-500'></span> In addition to efficient supply chain management <span className='text-green-500'>Agriflow</span> integrates cutting-edge risk management through real-time tracking using Oracle for monitoring weather conditions and other critical factors. This innovative approach allows farmers and stakeholders to make informed decisions based on up-to-the-minute data, ensuring that your agricultural ventures are resilient to changing environmental conditions. Partner with Agriflow for a future where your agricultural endeavors not only flourish but also thrive through streamlined supply chain solutions and dynamic risk management strategies.
           </p>
         </div>
         {/* <div> */}
         
         {/* </div> */}
         {/* <div className = "max-md:py-3">
           <Image src = {BlockChain} alt = "blockchain" width = "1000" height = "550" />
         </div> */}
         <ImageSlideshow />
       </div>
     </div>
   </>
 )
}


export default AboutApp;

