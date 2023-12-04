import Image from "next/image";
import BlockChain from "../images/aboutApp.jpg";


const AboutApp = () => {
 return (
   <>
     <div className = "w-full py-14 bg-gradient-to-b from-gray-800 to-black text-white">
       <h1 className = "text-4xl pt-8 pb-4 px-24 font-semibold max-md:text-center text-white">About <span className='text-blue-500'>Us</span></h1>
       <div className = "mx-auto flex flex-col-reverse items-center justify-center h-full px-4 md:px-8 my-3 md:flex-row">
         <div>
           <p className = "text-justify text-lg max-md:py-3 px-16 max-md:px-4 font-medium text-white">
             A blockchain is a distributed ledger with growing lists of records (blocks) that are securely linked together via cryptographic hashes. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data (generally represented as a Merkle tree, where data nodes are represented by leaves). The timestamp proves that the transaction data existed when the block was created. Since each block contains information about the previous block, they effectively form a chain (compare linked list data structure), with each additional block linking to the ones before it. Consequently, blockchain transactions are irreversible in that, once they are recorded, the data in any given block cannot be altered retroactively without altering all subsequent blocks.
           </p>
         </div>
         <div className = "max-md:py-3">
           <Image src = {BlockChain} alt = "blockchain" width = "3000" height = "2500" />
         </div>
       </div>
     </div>
   </>
 )
}


export default AboutApp;

