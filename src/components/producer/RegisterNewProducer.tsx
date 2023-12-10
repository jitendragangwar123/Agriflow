import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { abi, AGRIFLOW_CONTRACT_ADDRESS } from "../../constants";
import { useAccount, useContractRead } from "wagmi";
import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useSpring, animated } from "react-spring";

const inter = Inter({
 subsets: ["latin"],
 display: "swap",
});

const DisplayOrdersTable = ({ orders, onOrderAccept, onOrderReject }: any) => {
 const [buttonsClicked, setButtonsClicked] = useState<{
 [orderId: string]: boolean;
 }>({});
 const handleOrderAccept = (orderId: string) => {
 // Check if the button has been clicked
 if (!buttonsClicked[orderId]) {
 // Update state to disable the button
 setButtonsClicked((prev) => ({ ...prev, [orderId]: true }));

 // Call your onOrderAccept function
 onOrderAccept(orderId);
 }
 };

 const handleOrderReject = (orderId: string) => {
 // Check if the button has been clicked
 if (!buttonsClicked[orderId]) {
 // Update state to disable the button
 setButtonsClicked((prev) => ({ ...prev, [orderId]: true }));

 // Call your onOrderReject function
 onOrderReject(orderId);
 }
 };

 return (
 <div>
 <h2 className="text-2xl font-bold mt-4 mb-4">Order List</h2>
 <table className="min-w-md divide-y mx-auto rounded-md overflow-hidden shadow-md divide-gray-200">
 <thead className="bg-green-500">
 <tr>
 <th
 scope="col"
 className="px-5 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
 >
 Order ID#
 </th>
 <th
 scope="col"
 className="px-5 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
 >
 Product ID#
 </th>
 <th
 scope="col"
 className="px-5 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
 >
 Quantity
 </th>
 <th
 scope="col"
 className="px-5 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
 >
 Consumer Name
 </th>
 <th
 scope="col"
 className="px-5 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
 >
 Status
 </th>
 <th
 scope="col"
 className="px-5 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
 >
 Delivery Address
 </th>
 <th
 scope="col"
 className="px-5 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
 >
 Actions
 </th>
 </tr>
 </thead>
 <tbody className="bg-green-200 text-black divide-y divide-gray-200">
 {orders.map((order: any, index: any) => (
 <tr key={index}>
 <td className="px-5 py-3 whitespace-nowrap">
 {parseInt(order.orderId)}
 </td>
 <td className="px-5 py-3 whitespace-nowrap">
 {parseInt(order.productId)}
 </td>
 <td className="px-5 py-3 whitespace-nowrap">
 {parseInt(order.quantity)}
 </td>
 <td className="px-5 py-3 whitespace-nowrap">{order.name}</td>
 <td className="px-5 py-3 whitespace-nowrap">{order.status}</td>
 <td className="px-5 py-3 whitespace-nowrap">{order.address}</td>
 <td className="px-5 py-3 whitespace-nowrap">
 <div className="flex items-center">
 <button
 onClick={() => handleOrderAccept(order.orderId)}
 className={`mr-2 bg-green-500 text-white py-1 px-1 rounded-md cursor-pointer hover:bg-green-800 ${
 buttonsClicked[order.orderId]
 ? "opacity-50 cursor-not-allowed"
 : ""
 }`}
 disabled={buttonsClicked[order.orderId]}
 >
 Accept
 </button>
 <button
 onClick={() => handleOrderReject(order.orderId)}
 className={`bg-red-500 text-white py-1 px-1 rounded-md cursor-pointer hover:bg-red-800 ${
 buttonsClicked[order.orderId]
 ? "opacity-50 cursor-not-allowed"
 : ""
 }`}
 disabled={buttonsClicked[order.orderId]}
 >
 Reject
 </button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 );
};

const DisplayProductsTable = ({ products, onPriceChange }: any) => {
 return (
 <div>
 <h2 className="text-2xl font-bold mt-4 mb-4">Product List</h2>
 <table className="min-w-md divide-y mx-auto rounded-md overflow-hidden shadow-md divide-gray-200">
 <thead className="bg-green-500">
 <tr>
 <th
 scope="col"
 className="px-5 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
 >
 Product ID#
 </th>
 <th
 scope="col"
 className="px-5 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
 >
 Product Name
 </th>
 <th
 scope="col"
 className="px-5 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
 >
 Product Price
 </th>
 <th
 scope="col"
 className="px-5 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
 >
 Product Quantity
 </th>
 <th
 scope="col"
 className="px-5 py-3 text-left text-md font-medium text-black uppercase tracking-wider"
 >
 Actions
 </th>
 </tr>
 </thead>
 <tbody className="bg-green-200 text-black divide-y divide-gray-200">
 {products.map((product: any, index: any) => (
 <tr key={index}>
 <td className="px-5 py-3 whitespace-nowrap">
 {parseInt(product.id)}
 </td>
 <td className="px-5 py-3 whitespace-nowrap">{product.name}</td>
 <td className="px-5 py-3 whitespace-nowrap">
 {parseInt(product.price, 10)}
 </td>
 <td className="px-5 py-3 whitespace-nowrap">
 {parseInt(product.quantity, 10)}
 </td>
 <td className="mt-1 bg-green-500 text-white py-1 px-1 cursor-pointer hover:bg-green-800">
 <button onClick={() => onPriceChange(product.id)}>
 Change Price
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 );
};

export default function RegisterNewProducer() {
 const router = useRouter();
 const { addToast } = useToasts();
 const { isConnected, address } = useAccount();
 const [name, setName] = useState("");
 const [pName, setPName] = useState("");
 const [pPrice, setpPrice] = useState("");
 const [pQuantity, setpQuantity] = useState("");
 const [loading, setLoading] = useState(false);
 const [isRegistered, setIsRegistered] = useState(false);
 const [products, setProducts] = useState<any>([]);
 const [orders, setOrders] = useState<any>([]);
 const [idToChange, setIdToChange] = useState("");
 const [newpPrice, setNewpPrice] = useState("");

 const checkRegistrationStatus = async () => {
 if (isConnected) {
 const registrationStatus = await readContract({
 address: AGRIFLOW_CONTRACT_ADDRESS,
 abi: abi,
 functionName: "isProducerRegistered",
 args: [address],
 });

 setIsRegistered(!!registrationStatus);
 
 } else {
 addToast("Connect Your Wallet First", {
 appearance: "error",
 autoDismiss: true,
 });
 }
 };

 useEffect(() => {
 checkRegistrationStatus();
 displyTotalProduct();
 displyTotalOrder();
 }, [address, isConnected]);

 const registerNewUser = async () => {
 if (!isRegistered) {
 setLoading(true);
 try {
 const tx = await writeContract({
 address: AGRIFLOW_CONTRACT_ADDRESS,
 abi: abi,
 functionName: "registerNewProducer",
 args: [name],
 });

 await waitForTransaction(tx);
 
 addToast("Registration successful", {
 appearance: "success",
 autoDismiss: true,
 });
 window.location.reload();
 } catch (error) {
 console.error(error);
 addToast("Error during registration", {
 appearance: "error",
 autoDismiss: true,
 });
 }
 setLoading(false);
 }
 };

 const addNewProducts = async () => {
 setLoading(true);
 try {
 const tx = await writeContract({
 address: AGRIFLOW_CONTRACT_ADDRESS,
 abi: abi,
 functionName: "addNewProductsInList",
 args: [pName, pPrice, pQuantity],
 });


     await waitForTransaction(tx);
     addToast("Products added successfully", {
       appearance: "success",
       autoDismiss: true,
     });
     displyTotalProduct(); // Update the product list after adding new products
   } catch (error) {
     console.error(error);
     addToast("Error adding new products", {
       appearance: "error",
       autoDismiss: true,
     });
   }
   setLoading(false);
 };

 const displyTotalProduct = async () => {
 setLoading(true);
 try {
 const totalProduct: any = await readContract({
 address: AGRIFLOW_CONTRACT_ADDRESS,
 abi: abi,
 functionName: "totalProduct",
 args: [],
 });

 //console.log("totalProduct",totalProduct);
 
 let productsData: any = [];
 for (let i = 1; i <= totalProduct; i++) {
 const product: any = await readContract({
 address: AGRIFLOW_CONTRACT_ADDRESS,
 abi: abi,
 functionName: "getProductbyId",
 args: [address, i],
 });
 //console.log(product);
 if (
 product[3] !== "" &&
 product[1] !== 0 &&
 product[2] != 0 &&
 product[0] !== 0
 ) {
 productsData.push({
 id: product[0],
 name: product[3],
 price: product[1],
 quantity: product[2],
 });
 }
 }
 //console.log(productsData);
 setProducts(productsData);
 } catch (error) {
 console.error(error);
 addToast("Error fetching new products", {
 appearance: "error",
 autoDismiss: true,
 });
 }
 setLoading(false);
 };

 const changePrice = async () => {
 setLoading(true);
 try {
 const tx = await writeContract({
 address: AGRIFLOW_CONTRACT_ADDRESS,
 abi: abi,
 functionName: "newPrice",
 args: [idToChange, newpPrice],
 });


     await waitForTransaction(tx);
     addToast("Price Change successful", {
       appearance: "success",
       autoDismiss: true,
     });
     displyTotalProduct(); // Update the product list after changing the price
   } catch (error) {
     console.error(error);
     addToast("Error updating the new price", {
       appearance: "error",
       autoDismiss: true,
     });
   }
   setLoading(false);
 };

 const displyTotalOrder = async () => {
 setLoading(true);
 try {
 const totalOrder: any = await readContract({
 address: AGRIFLOW_CONTRACT_ADDRESS,
 abi: abi,
 functionName: "totalOrder",
 args: [],
 });

 let ordersData: any = [];
 for (let i = 1; i <= totalOrder; i++) {
 const order: any = await readContract({
 address: AGRIFLOW_CONTRACT_ADDRESS,
 abi: abi,
 functionName: "getOrderByIdProducer",
 args: [address, i],
 });
 if (
 order[0] !== 0 &&
 order[1] !== 0 &&
 order[2] !== 0 &&
 order[3] !== "" &&
 order[4] !== "" &&
 order[5] !== ""
 ) {
 ordersData.push({
 orderId: order[0],
 productId: order[1],
 quantity: order[2],
 name: order[3],
 status: order[4],
 address: order[5],
 });
 }
 }
 setOrders(ordersData);
 } catch (error) {
 console.error(error);
 addToast("Error fetching orders", {
 appearance: "error",
 autoDismiss: true,
 });
 }
 setLoading(false);
 };

 const orderStatusAccepted = async (orderId: string) => {
 setLoading(true);
 try {
 const status = "Accepted";
 const tx = await writeContract({
 address: AGRIFLOW_CONTRACT_ADDRESS,
 abi: abi,
 functionName: "giveOrderItsStatus",
 args: [orderId, status],
 });

 await waitForTransaction(tx);
 addToast("Order Accepted successfully", {
 appearance: "success",
 autoDismiss: true,
 });
 displyTotalOrder();
 } catch (error) {
 console.error(error);
 addToast("Error accepting the order", {
 appearance: "error",
 autoDismiss: true,
 });
 }
 setLoading(false);
 };
 const orderStatusRejected = async (orderId: string) => {
 setLoading(true);
 try {
 const status = "Rejected";
 const tx = await writeContract({
 address: AGRIFLOW_CONTRACT_ADDRESS,
 abi: abi,
 functionName: "giveOrderItsStatus",
 args: [orderId, status],
 });

 await waitForTransaction(tx);
 addToast("Order Rejected successfully", {
 appearance: "success",
 autoDismiss: true,
 });
 displyTotalOrder();
 } catch (error) {
 console.error(error);
 addToast("Error rejecting the order", {
 appearance: "error",
 autoDismiss: true,
 });
 }
 setLoading(false);
 };

 const formContainerAnimation = useSpring({
 opacity: 1,
 from: { opacity: 0 },
 delay: 200,
 });

 return (
 <animated.div
 style={formContainerAnimation}
 className="w-full text-center py-5 bg-gradient-to-b from-gray-800 to-black text-white"
 >
 <h1 className="text-4xl font-extrabold text-white">
 Welcome To The Platform
 </h1>
 <div className="flex flex-row items-center justify-center h-screen">
 <animated.div
 style={formContainerAnimation}
 className="max-h-md mx-auto bg-green-200 rounded-md overflow-hidden shadow-md mt-1 mb-1 ml-20 max-w-2xl"
 >
 {!isRegistered && (
 <div className="p-16">
 <label
 htmlFor="name"
 className="block text-xl font-medium text-gray-600"
 >
 Enter your name:
 </label>
 <input
 type="text"
 id="name"
 placeholder="Enter your name"
 value={name}
 onChange={(e) => setName(e.target.value)}
 className="mt-3 p-2 text-black border rounded-md w-full focus:outline-none focus:border-blue-500"
 />
 <button
 onClick={registerNewUser}
 className={`mt-4 bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-800 block mx-auto ${
 isRegistered ? "opacity-50 cursor-not-allowed" : ""
 }`}
 disabled={loading || isRegistered}
 >
 {loading ? "Registering..." : "Register"}
 </button>
 </div>
 )}
 </animated.div>

 <animated.div
 style={formContainerAnimation}
 className="max-h-md mx-auto bg-green-200 rounded-md overflow-hidden shadow-md mt-1 mb-1 mr-20 max-w-2xl"
 >
 <div className="p-16">
 <label
 htmlFor="pName"
 className="block text-xl font-medium text-gray-600"
 >
 Product Name:
 </label>
 <input
 type="text"
 id="pName"
 placeholder="Enter product name"
 value={pName}
 onChange={(e) => setPName(e.target.value)}
 className="mt-3 p-2 border text-black rounded-md w-full focus:outline-none focus:border-blue-500"
 />
 <label
 htmlFor="pPrice"
 className="block text-xl font-medium text-gray-600 mt-2"
 >
 Product Price:
 </label>
 <input
 type="text"
 id="pPrice"
 placeholder="Enter product price"
 value={pPrice}
 onChange={(e) => setpPrice(e.target.value)}
 className="mt-3 p-2 border text-black rounded-md w-full focus:outline-none focus:border-blue-500"
 />
 <label
 htmlFor="pQuantity"
 className="block text-xl font-medium text-gray-600 mt-2"
 >
 Product Quantity:
 </label>
 <input
 type="text"
 id="pQuantity"
 placeholder="Enter product quantity"
 value={pQuantity}
 onChange={(e) => setpQuantity(e.target.value)}
 className="mt-3 p-2 border text-black rounded-md w-full focus:outline-none focus:border-blue-500"
 />
 <button
 onClick={addNewProducts}
 className={`mt-4 bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-800 block mx-auto ${
 isRegistered ? "" : "opacity-50 cursor-not-allowed"
 }`}
 disabled={loading || !isRegistered}
 >
 {loading ? "Adding Products..." : "Add New Products"}
 </button>
 </div>
 </animated.div>
 </div>

 {/* Display Products Table */}
 <DisplayProductsTable products={products} onPriceChange={setIdToChange} />
 <DisplayOrdersTable
 orders={orders}
 onOrderAccept={orderStatusAccepted}
 onOrderReject={orderStatusRejected}
 />

 {/* Modal or Form for Price Change */}
 {idToChange && (
 <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
 <div className="bg-white p-4 rounded-md">
 <label
 htmlFor="newPrice"
 className="block text-xl font-medium text-gray-600"
 >
 Enter new price for product ID {idToChange}
 </label>
 <input
 type="text"
 id="newPrice"
 placeholder="Enter new price"
 value={newpPrice}
 onChange={(e) => setNewpPrice(e.target.value)}
 className="mt-3 p-2 border text-black rounded-md w-half focus:outline-none focus:border-blue-500"
 />
 <button
 onClick={changePrice}
 className="mt-4 ml-4 bg-green-600 text-white py-1 px-4 rounded-md cursor-pointer hover:bg-green-800"
 >
 Change Price
 </button>
 <button
 onClick={() => setIdToChange("")}
 className="mt-4 ml-1 bg-red-600 text-white py-1 px-4 rounded-md cursor-pointer hover:bg-red-800"
 >
 Cancel
 </button>
 </div>
 </div>
 )}
 </animated.div>
 );
}
