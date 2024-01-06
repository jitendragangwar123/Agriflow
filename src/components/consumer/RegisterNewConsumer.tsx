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
      <table className="mt-2 min-w-md mx-auto rounded-md overflow-hidden shadow-md divide-gray-200">
        <thead className="bg-opacity-25 shadow-lg backdrop-filter backdrop-blur-[4.9px] border border-opacity-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-b border-white">
          <tr>
            <th className="px-5 py-3 text-left font-medium uppercase tracking-wider">
              Order ID#
            </th>
            <th className="px-5 py-3 text-left font-medium uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 text-left font-medium uppercase tracking-wider">
              Delivery Address
            </th>
          </tr>
        </thead>
        <tbody className="bg-opacity-25 bg-pink-300 shadow-lg backdrop-filter backdrop-blur-[4.9px] border border-opacity-20">
          {currentOrders.map((order: any, index: any) => (
            <tr key={index}>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                {parseInt(order.orderId)}
              </td>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                {order.status}
              </td>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                {order.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <button
          onClick={prevPage}
          className="bg-white join-item btn text-pink-600 text-lg font-medium border border-pink-600 py-0 px-2 rounded-l-lg cursor-pointer${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          } hover:bg-pink-600 hover:text-white hover:font-medium"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="bg-white join-item btn text-pink-500 text-lg font-medium border border-pink-500 py-0 px-4 rounded-r-lg cursor-pointer ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          } hover:bg-pink-600 hover:text-white hover:font-medium"
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
      <table className="mt-2 min-w-md mx-auto rounded-md overflow-hidden shadow-md divide-gray-200">
        <thead className="bg-opacity-25 shadow-lg backdrop-filter backdrop-blur-[4.9px] border border-opacity-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-b border-white">
          <tr>
            <th className="px-5 py-3 text-left font-medium uppercase tracking-wider">
              Product ID#
            </th>
            <th className="px-5 py-3 text-left font-medium uppercase tracking-wider">
              Product Name
            </th>
            <th className="px-5 py-3 text-left font-medium uppercase tracking-wider">
              Product Price
            </th>
            <th className="px-5 py-3 text-left font-medium uppercase tracking-wider">
              Product Quantity
            </th>
            <th className="px-5 py-3 text-left font-medium uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-opacity-25 bg-pink-300 shadow-lg backdrop-filter backdrop-blur-[4.9px] border border-opacity-20">
          {currentProducts.map((product: any, index: any) => (
            <tr key={index}>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                {parseInt(product.id)}
              </td>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                {product.name}
              </td>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                {parseInt(product.price, 10)}
              </td>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                {parseInt(product.quantity, 10)}
              </td>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                <button
                  onClick={() => onOrderPlace(product.id)}
                  className={`ml-2 mt-2 text-white py-1 px-1 rounded-md bg-gradient-to-r  from-green-500 to-blue-500 hover:from-blue-500 hover:to-purple-400`}
                >
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
          className="bg-white join-item btn text-pink-600 text-lg font-medium border border-pink-600 py-0 px-2 rounded-l-lg cursor-pointer${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          } hover:bg-pink-600 hover:text-white hover:font-medium"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="bg-white join-item btn text-pink-500 text-lg font-medium border border-pink-500 py-0 px-4 rounded-r-lg cursor-pointer ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          } hover:bg-pink-600 hover:text-white hover:font-medium"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default function RegisterNewConsumer() {
  const [activeTable, setActiveTable] = useState("products");
  const [buttonsClicked, setButtonsClicked] = useState<{
    [orderId: string]: boolean;
  }>({});

  const handleTableChange = (table: string) => {
    setActiveTable(table);
  };

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
      addToast(" Order Placed Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      window.location.reload();
      displyTotalProduct(); // Update the product list after changing the price
    } catch (error) {
      console.error(error);
      addToast("Error Placing the order", {
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
    <div className="w-full text-center p-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-4xl font-extrabold text-white">
        Welcome To The Platform
      </h1>
      <div className="flex flex-row items-center justify-center h-screen">
        {/* Display Tables if Consumer is Registered */}
        <div className="mt-5 inline-block p-5 bg-opacity-25 bg-white rounded-2xl shadow-lg backdrop-filter backdrop-blur-[4.9px] border border-opacity-20">
          {isRegisteredConsumer && (
            <div className="flex items-center justify-center">
              <div>
                <div className="flex flex-row justify-center mt-4">
                  <div
                    onClick={() => handleTableChange("products")}
                    className={`mt-1 py-1 px-2 rounded-l-lg ${
                      activeTable === "products"
                        ? "bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-green-400 text-white text-2xl font-bold"
                        : "bg-white text-blue-600 text-2xl font-bold border border-blue-600"
                    }`}
                  >
                    Products
                  </div>
                  <div
                    onClick={() => handleTableChange("orderstatus")}
                    className={`mt-1 py-1 px-4 rounded-r-lg ${
                      activeTable === "orderstatus"
                        ? "bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-green-400 text-white text-2xl font-bold"
                        : "bg-white text-blue-600 text-2xl font-bold border border-blue-600"
                    }`}
                  >
                    Order Status
                  </div>
                </div>

                {activeTable === "products" && (
                  <DisplayProductsTable
                    products={products}
                    onOrderPlace={setIdToChange}
                  />
                )}

                {activeTable === "orderstatus" && (
                  <DisplayOrdersStatusTable orders={orders} />
                )}
              </div>
            </div>
          )}

          {/* Display Registration Form if Consumer is not Registered */}
          {!isRegisteredConsumer && (
            <div className="m-5 inline-block p-5 bg-opacity-25 bg-pink-300 rounded-2xl shadow-lg backdrop-filter backdrop-blur-[4.9px] border border-opacity-20">
              <div className="p-5">
                <label
                  htmlFor="name"
                  className="block text-xl font-medium text-white"
                >
                  Enter Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3 p-2 text-black border rounded-md w-full focus:outline-none border-opacity-20"
                />
                <button
                  onClick={registerNewConsumer}
                  className={`mt-4 text-white  text-xl font-bold py-2 px-4 rounded-md bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-green-400 ${
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
