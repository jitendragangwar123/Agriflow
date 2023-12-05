export const AGRIMART_CONTRACT_ADDRESS="0xB63DE7a7CAaC4795dF847B8F2407B35e5bf55566";
export const abi=[
   {
       "inputs": [
         {
           "internalType": "string",
           "name": "_pname",
           "type": "string"
         },
         {
           "internalType": "uint256",
           "name": "_price",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "_quantity",
           "type": "uint256"
         }
       ],
       "name": "addNewProductsInList",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "",
           "type": "address"
         }
       ],
       "name": "consumers",
       "outputs": [
         {
           "internalType": "string",
           "name": "",
           "type": "string"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "_addr",
           "type": "address"
         }
       ],
       "name": "getMyTotalOrder",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "_addr",
           "type": "address"
         },
         {
           "internalType": "uint256",
           "name": "_oid",
           "type": "uint256"
         }
       ],
       "name": "getOrderByIdConsumer",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         },
         {
           "internalType": "string",
           "name": "",
           "type": "string"
         },
         {
           "internalType": "string",
           "name": "",
           "type": "string"
         },
         {
           "internalType": "bool",
           "name": "",
           "type": "bool"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "_addr",
           "type": "address"
         },
         {
           "internalType": "uint256",
           "name": "_oid",
           "type": "uint256"
         }
       ],
       "name": "getOrderByIdProducer",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         },
         {
           "internalType": "string",
           "name": "",
           "type": "string"
         },
         {
           "internalType": "string",
           "name": "",
           "type": "string"
         },
         {
           "internalType": "string",
           "name": "",
           "type": "string"
         },
         {
           "internalType": "bool",
           "name": "",
           "type": "bool"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "uint256",
           "name": "_pid",
           "type": "uint256"
         }
       ],
       "name": "getProductById",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         },
         {
           "internalType": "string",
           "name": "",
           "type": "string"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "_addr",
           "type": "address"
         },
         {
           "internalType": "uint256",
           "name": "_pid",
           "type": "uint256"
         }
       ],
       "name": "getProductbyId",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         },
         {
           "internalType": "string",
           "name": "",
           "type": "string"
         },
         {
           "internalType": "bool",
           "name": "",
           "type": "bool"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "_addr",
           "type": "address"
         }
       ],
       "name": "getTotalOrder",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [],
       "name": "getTotalOrder",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "_addr",
           "type": "address"
         }
       ],
       "name": "getTotalProduct",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [],
       "name": "getTotalProduct",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "uint256",
           "name": "_oid",
           "type": "uint256"
         },
         {
           "internalType": "string",
           "name": "_status",
           "type": "string"
         }
       ],
       "name": "giveOrderItsStatus",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "_addr",
           "type": "address"
         }
       ],
       "name": "isConsumerRegistered",
       "outputs": [
         {
           "internalType": "bool",
           "name": "",
           "type": "bool"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "_addr",
           "type": "address"
         }
       ],
       "name": "isProducerRegistered",
       "outputs": [
         {
           "internalType": "bool",
           "name": "",
           "type": "bool"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "uint256",
           "name": "_pid",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "_newPrice",
           "type": "uint256"
         }
       ],
       "name": "newPrice",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         }
       ],
       "name": "orders",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "id",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "product_id",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "quantity",
           "type": "uint256"
         },
         {
           "internalType": "string",
           "name": "customer_name",
           "type": "string"
         },
         {
           "internalType": "string",
           "name": "status",
           "type": "string"
         },
         {
           "internalType": "string",
           "name": "delivery_address",
           "type": "string"
         },
         {
           "internalType": "address",
           "name": "customer_address",
           "type": "address"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "uint256",
           "name": "_pid",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "_quantity",
           "type": "uint256"
         },
         {
           "internalType": "string",
           "name": "_cname",
           "type": "string"
         },
         {
           "internalType": "string",
           "name": "_daddress",
           "type": "string"
         }
       ],
       "name": "placeAnOrder",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "",
           "type": "address"
         }
       ],
       "name": "producers",
       "outputs": [
         {
           "internalType": "string",
           "name": "",
           "type": "string"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         }
       ],
       "name": "products",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "id",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "price",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "quantity",
           "type": "uint256"
         },
         {
           "internalType": "string",
           "name": "product_name",
           "type": "string"
         },
         {
           "internalType": "address",
           "name": "producer_address",
           "type": "address"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "string",
           "name": "_name",
           "type": "string"
         }
       ],
       "name": "registerNewConsumer",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "string",
           "name": "_name",
           "type": "string"
         }
       ],
       "name": "registerNewProducer",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
     },
     {
       "inputs": [],
       "name": "totalOrder",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [],
       "name": "totalProduct",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         }
       ],
       "stateMutability": "view",
       "type": "function"
   }
];