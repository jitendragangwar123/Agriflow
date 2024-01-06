import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { abi, AGRIFLOW_CONTRACT_ADDRESS } from "../../constants";
import { useAccount, useContractRead } from "wagmi";
import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const DisplayOrdersTable = ({ orders, onOrderAccept, onOrderReject }: any) => {
  const [buttonsClicked, setButtonsClicked] = useState<{
    [orderId: string]: boolean;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const handleOrderAccept = (orderId: string) => {
    if (!buttonsClicked[orderId]) {
      setButtonsClicked((prev) => ({ ...prev, [orderId]: true }));
      onOrderAccept(orderId);
    }
  };

  const handleOrderReject = (orderId: string) => {
    if (!buttonsClicked[orderId]) {
      setButtonsClicked((prev) => ({ ...prev, [orderId]: true }));
      onOrderReject(orderId);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = orders.slice(indexOfFirstRow, indexOfLastRow);

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
              Product ID#
            </th>
            <th className="px-5 py-3 text-left font-medium uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-5 py-3 text-left font-medium uppercase tracking-wider">
              Name
            </th>
            <th className="px-5 py-3 text-left font-medium uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 text-left font-medium uppercase tracking-wider">
              Address
            </th>
            <th className="px-5 py-3 text-left font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-opacity-25 bg-pink-300 shadow-lg backdrop-filter backdrop-blur-[4.9px] border border-opacity-20">
          {currentRows.map((order: any, index: any) => (
            <tr key={index}>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                {parseInt(order.orderId)}
              </td>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                {parseInt(order.productId)}
              </td>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                {parseInt(order.quantity)}
              </td>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                {order.name}
              </td>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                {order.status}
              </td>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                {order.address}
              </td>
              <td className="px-5 py-3 whitespace-nowrap border-b border-white">
                <div className="flex items-center">
                  <button
                    onClick={() => handleOrderAccept(order.orderId)}
                    className={`ml-2 mt-2 text-white py-1 px-1 rounded-md bg-gradient-to-r  from-green-500 to-blue-500 hover:from-blue-500 hover:to-purple-400`}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleOrderReject(order.orderId)}
                    className={`ml-2 mt-2 text-white py-1 px-1 rounded-md bg-gradient-to-r  from-red-500 to-pink-500 hover:from-pink-500 hover:to-blue-400`}
                  >
                    Reject
                  </button>
                </div>
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

const DisplayProductsTable = ({ products, onPriceChange }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

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
      <table className="mt-2 min-w-md divide-y mx-auto rounded-md overflow-hidden shadow-md divide-gray-200">
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
              Actions
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
                  onClick={() => onPriceChange(product.id)}
                  className={`ml-2 mt-2 text-white py-1 px-1 rounded-md bg-gradient-to-r  from-green-500 to-blue-500 hover:from-blue-500 hover:to-purple-400`}
                >
                  Change Price
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

export default function RegisterNewProducer() {
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
      displyTotalProduct(); 
    } catch (error) {
      console.error(error);
      addToast("Error while adding new products", {
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

      let productsData: any = [];
      for (let i = 1; i <= totalProduct; i++) {
        const product: any = await readContract({
          address: AGRIFLOW_CONTRACT_ADDRESS,
          abi: abi,
          functionName: "getProductbyId",
          args: [address, i],
        });
        
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
     
      setProducts(productsData);
    } catch (error) {
      console.error(error);
      addToast("Error while fetching new products", {
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
      addToast("Price Changed successful", {
        appearance: "success",
        autoDismiss: true,
      });
      displyTotalProduct(); 
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

  return (
    <div className="w-full text-center p-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-4xl font-extrabold text-white">
        Welcome To The Platform
      </h1>

      <div className="flex flex-row items-center justify-center h-screen">
        <div className="mt-5 inline-block p-5 bg-opacity-25 bg-white rounded-2xl shadow-lg backdrop-filter backdrop-blur-[4.9px] border border-opacity-20">
          {!isRegistered && (
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
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3 p-2 text-black border rounded-md w-full focus:outline-none border-opacity-20"
                />
                <button
                  onClick={registerNewUser}
                  className={`mt-4 text-white  text-xl font-bold py-2 px-4 rounded-md bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-green-400 ${
                    isRegistered ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading || isRegistered}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </div>
          )}

          <div className="m-5 inline-block p-5 bg-opacity-25 bg-pink-300 rounded-2xl shadow-lg backdrop-filter backdrop-blur-[4.9px] border border-opacity-20">
            <div className="p-5">
              <label
                htmlFor="pName"
                className="block text-xl font-medium text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                id="pName"
                placeholder="Enter Product Name"
                value={pName}
                onChange={(e) => setPName(e.target.value)}
                className="mt-3 p-2 text-black border rounded-md w-full focus:outline-none border-opacity-20"
              />
              <label
                htmlFor="pPrice"
                className="block text-xl font-medium text-white mt-2"
              >
                Product Price
              </label>
              <input
                type="text"
                id="pPrice"
                placeholder="Enter Product Price"
                value={pPrice}
                onChange={(e) => setpPrice(e.target.value)}
                className="mt-3 p-2 text-black border rounded-md w-full focus:outline-none border-opacity-20"
              />
              <label
                htmlFor="pQuantity"
                className="block text-xl font-medium text-white mt-2"
              >
                Product Quantity
              </label>
              <input
                type="text"
                id="pQuantity"
                placeholder="Enter Product Quantity"
                value={pQuantity}
                onChange={(e) => setpQuantity(e.target.value)}
                className="mt-3 p-2 text-black border rounded-md w-full focus:outline-none border-opacity-20"
              />
              <button
                onClick={addNewProducts}
                className={`mt-4 text-white  text-xl font-bold py-2 px-4 rounded-md bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-green-400 ${
                  isRegistered ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={loading || !isRegistered}
              >
                {loading ? "Adding Products..." : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Display Products Table */}
      <div>
        <div className="flex items-center justify-center h-screen">
          <div className="inline-block p-5 bg-opacity-25 bg-white rounded-2xl shadow-lg backdrop-filter backdrop-blur-[4.9px] border border-opacity-20">
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
                onClick={() => handleTableChange("orders")}
                className={`mt-1 py-1 px-4 rounded-r-lg ${
                  activeTable === "orders"
                    ? "bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-green-400 text-white text-2xl font-bold"
                    : "bg-white text-blue-600 text-2xl font-bold border border-blue-600"
                }`}
              >
                Orders
              </div>
            </div>

            {activeTable === "products" && (
              <DisplayProductsTable
                products={products}
                onPriceChange={setIdToChange}
              />
            )}

            {activeTable === "orders" && (
              <DisplayOrdersTable
                orders={orders}
                onOrderAccept={orderStatusAccepted}
                onOrderReject={orderStatusRejected}
                buttonsClicked={buttonsClicked}
              />
            )}
          </div>
        </div>
      </div>
      {/* Modal or Form for Price Change */}
      {idToChange && (
        <div className="fixed inset-0 backdrop-filter backdrop-blur-[4.9px] bg-opacity-40 flex items-center justify-center">
          <div className="m-5 inline-block p-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-lg backdrop-filter backdrop-blur-[4.9px] border border-opacity-20">
            <label
              htmlFor="newPrice"
              className="block text-xl font-medium text-white"
            >
              Enter New Price{idToChange}
            </label>
            <input
              type="text"
              id="newPrice"
              placeholder="Enter new price"
              value={newpPrice}
              onChange={(e) => setNewpPrice(e.target.value)}
              className="mt-3 p-2 text-black border rounded-md w-full focus:outline-none border-opacity-20"
            />
            <button
              onClick={changePrice}
              className="ml-2 mt-2 text-white py-1 px-1 rounded-md bg-gradient-to-r  from-green-500 to-blue-500 hover:from-blue-500 hover:to-purple-400"
            >
              Change Price
            </button>
            <button
              onClick={() => setIdToChange("")}
              className="ml-2 mt-2 text-white py-1 px-1 rounded-md bg-gradient-to-r  from-red-500 to-pink-500 hover:from-pink-500 hover:to-blue-400 "
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
