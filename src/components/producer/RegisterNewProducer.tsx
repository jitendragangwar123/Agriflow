import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { abi, AGRIMART_CONTRACT_ADDRESS } from "../../constants";
import { useAccount, useBalance, useContractRead } from "wagmi";
import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RegisterNewProducer() {
  //const router = useRouter();
  const { addToast } = useToasts();
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [loading, setLoading] = useState(false);

  async function registerNewUser() {
    setLoading(true);
    try {
      const tx = await writeContract({
        address: AGRIMART_CONTRACT_ADDRESS,
        abi: abi,
        functionName: "registerNewProducer",
        args: [name],
      });

      await waitForTransaction(tx);
      addToast("Registration successful", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      console.error(error);
      addToast("Error during registration", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md mx-auto bg-green-200 rounded-md overflow-hidden shadow-md">
        <div className="text-center bg-green-600 text-white py-2">
          <h1 className="text-3xl font-bold">Producer Registration</h1>
        </div>
        <div className="p-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={registerNewUser}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-800"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

// async function fetchProducerByAddr() {
//   try {
//     const pName = await readContract({
//       address: AGRIMART_CONTRACT_ADDRESS,
//       abi: abi,
//       functionName: "producers",
//       args: [addr],
//     });
//     addToast(`Producer Name: ${pName}`, {
//       appearance: "info",
//       autoDismiss: true,
//     });
//   } catch (error) {
//     console.error(error);
//     addToast("Error fetching producer name", {
//       appearance: "error",
//       autoDismiss: true,
//     });
//   }
// }
