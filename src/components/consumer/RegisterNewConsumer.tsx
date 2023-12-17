import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { abi, AGRIFLOW_CONTRACT_ADDRESS } from "../../constants";
import { useAccount, useContractRead } from "wagmi";
import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
//import { useSpring, animated } from "react-spring";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const DisplayOrdersStatusTable = ({ orders }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentOrders = orders.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(orders.length / rowsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div>
      <h2 className="text-2xl text-black font-bold mt-4 mb-4">Order Status</h2>
      <table className="min-w-md divide-y mx-auto overflow-hidden shadow-md divide-gray-200">
        <thead className="bg-green-500">
          <tr>
            <th
              scope="col"
              className="px-5 py-5 text-left text-md font-medium text-black uppercase tracking-wider"
            >
              Order ID#
            </th>
            <th
              scope="col"
              className="px-5 py-5 text-left text-md font-medium text-black uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-5 py-5 text-left text-md font-medium text-black uppercase tracking-wider"
            >
              Delivery Address
            </th>
          </tr>
        </thead>
        <tbody className="bg-green-200 text-black divide-y divide-gray-200">
          {currentOrders.map((order: any, index: any) => (
            <tr key={index}>
              <td className="px-5 py-3 whitespace-nowrap">
                {parseInt(order.orderId)}
              </td>
              <td className="px-5 py-3 whitespace-nowrap">{order.status}</td>
              <td className="px-5 py-3 whitespace-nowrap">{order.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <button
          onClick={prevPage}
          className="bg-green-500 text-white py-1 px-2 rounded-md cursor-pointer mr-2 ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          } hover:bg-green-800"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="bg-green-500 text-white py-1 px-2 rounded-md cursor-pointer ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          } hover:bg-green-800"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const DisplayProductsTable = ({ products, onOrderPlace }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentProducts = products.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(products.length / rowsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div>
      <h2 className="text-2xl text-black font-bold mt-4 mb-4">Product List</h2>
      <table className="min-w-md divide-y mx-auto overflow-hidden shadow-md divide-gray-200">
        <thead className="bg-green-500">
          <tr>
            <th
              scope="col"
              className="px-5 py-5 text-left text-md font-medium text-black uppercase tracking-wider"
            >
              Product ID#
            </th>
            <th
              scope="col"
              className="px-5 py-5 text-left text-md font-medium text-black uppercase tracking-wider"
            >
              Product Name
            </th>
            <th
              scope="col"
              className="px-5 py-5 text-left text-md font-medium text-black uppercase tracking-wider"
            >
              Product Price
            </th>
            <th
              scope="col"
              className="px-5 py-5 text-left text-md font-medium text-black uppercase tracking-wider"
            >
              Product Quantity
            </th>
            <th
              scope="col"
              className="px-5 py-5 text-left text-md font-medium text-black uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-green-200 text-black divide-y divide-gray-200">
          {currentProducts.map((product: any, index: any) => (
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
              <td className="mt-1 bg-blue-500 text-white py-1 px-1 cursor-pointer hover:bg-blue-800">
                <button onClick={() => onOrderPlace(product.id)}>
                  Place Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <button
          onClick={prevPage}
          className="bg-green-500 text-white py-1 px-2 rounded-md cursor-pointer mr-2 ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          } hover:bg-green-800"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="bg-green-500 text-white py-1 px-2 rounded-md cursor-pointer ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          } hover:bg-green-800"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default function RegisterNewConsumer() {
  const router = useRouter();
  const { addToast } = useToasts();
  const { isConnected, address } = useAccount();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegisteredConsumer, setIsRegisteredConsumer] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const [idToChange, setIdToChange] = useState("");
  const [buyQuantity, setBuyQuantity] = useState("");
  const [cName, setCName] = useState("");
  const [cAddress, setcAddress] = useState("");

  const checkRegistrationStatusConsumer = async () => {
    if (isConnected) {
      const registrationStatusConsumer = await readContract({
        address: AGRIFLOW_CONTRACT_ADDRESS,
        abi: abi,
        functionName: "isConsumerRegistered",
        args: [address],
      });

      setIsRegisteredConsumer(!!registrationStatusConsumer);
    } else {
      addToast("Connect Your Wallet First", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    checkRegistrationStatusConsumer();
    displyTotalProduct();
    displyTotalOrder();
  }, [address, isConnected]);

  const registerNewConsumer = async () => {
    if (!isRegisteredConsumer) {
      setLoading(true);
      try {
        const tx = await writeContract({
          address: AGRIFLOW_CONTRACT_ADDRESS,
          abi: abi,
          functionName: "registerNewConsumer",
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
          functionName: "getProductById",
          args: [i],
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

  const placeOrder = async () => {
    setLoading(true);
    try {
      const tx = await writeContract({
        address: AGRIFLOW_CONTRACT_ADDRESS,
        abi: abi,
        functionName: "placeAnOrder",
        args: [idToChange, buyQuantity, cName, cAddress],
      });

      await waitForTransaction(tx);
      addToast(" Order placed successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      window.location.reload();
      displyTotalProduct(); // Update the product list after changing the price
    } catch (error) {
      console.error(error);
      addToast("Error placing the order", {
        appearance: "error",
        autoDismiss: true,
      });
      window.location.reload();
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
          functionName: "getOrderByIdConsumer",
          args: [address, i],
        });
        console.log("Order", order);
        if (order[0] !== 0 && order[1] !== "" && order[2] !== "") {
          ordersData.push({
            orderId: order[0],
            status: order[1],
            address: order[2],
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

  // const formContainerAnimation = useSpring({
  //   opacity: 1,
  //   from: { opacity: 0 },
  //   delay: 200,
  // });

  return (
    <div className="w-full text-center py-20 bg-gradient-to-b from-gray-600 to-black text-white">
      <h1 className="text-4xl font-extrabold text-white">
        Welcome To The Platform
      </h1>
      <div className="flex flex-row pt-2 items-center justify-center h-screen">
        {/* Display Tables if Consumer is Registered */}
        {isRegisteredConsumer && (
          <div className="flex mx-auto">
            <div className="max-h-md bg-green-200 rounded-md overflow-hidden shadow-md mt-1 ml-20 mr-20 max-w-2xl">
              <DisplayProductsTable
                products={products}
                onOrderPlace={setIdToChange}
              />
            </div>
            <div className="max-h-md bg-green-200 rounded-md overflow-hidden shadow-md mt-1 ml-10 mr-5 max-w-2xl">
              <DisplayOrdersStatusTable orders={orders} />
            </div>
          </div>
        )}

        {/* Display Registration Form if Consumer is not Registered */}
        {!isRegisteredConsumer && (
          <div className="max-h-md mx-auto bg-green-200 rounded-md overflow-hidden shadow-md mt-1 max-w-2xl">
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
                onClick={registerNewConsumer}
                className={`mt-4 bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-800 block mx-auto ${
                  isRegisteredConsumer ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading || isRegisteredConsumer}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal or Form for Price Change */}
      {idToChange && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-green-200 p-12 rounded-md">
            <label
              htmlFor="buyQuantity"
              className="block text-xl font-medium text-gray-600"
            >
              Enter Quantity To Buy: {idToChange}
            </label>
            <input
              type="text"
              id="buyQuantity"
              placeholder="Enter quantity"
              value={buyQuantity}
              onChange={(e) => setBuyQuantity(e.target.value)}
              className="mt-2 mb-2 p-2 border text-black rounded-md w-half focus:outline-none focus:border-blue-500"
            />

            <label
              htmlFor="cName"
              className="block text-xl font-medium text-gray-600"
            >
              Enter Your Name
            </label>
            <input
              type="text"
              id="cName"
              placeholder="Enter your name"
              value={cName}
              onChange={(e) => setCName(e.target.value)}
              className="mt-2 mb-2 p-2 border text-black rounded-md w-half focus:outline-none focus:border-blue-500"
            />

            <label
              htmlFor="cAddress"
              className="block text-xl font-medium text-gray-600"
            >
              Enter Delivery Address
            </label>
            <input
              type="text"
              id="cAddress"
              placeholder="Enter delivery address"
              value={cAddress}
              onChange={(e) => setcAddress(e.target.value)}
              className="mt-2 mb-2 p-2 border text-black rounded-md w-half focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={placeOrder}
              className={`mt-4 bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-800 block mx-auto ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
