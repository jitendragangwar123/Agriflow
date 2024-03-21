// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

/*
                 $$$$$$\   $$$$$$\  $$$$$$$\  $$$$$$\ $$$$$$$$\ $$\       $$$$$$\  $$\      $$\ 
                $$  __$$\ $$  __$$\ $$  __$$\ \_$$  _|$$  _____|$$ |     $$  __$$\ $$ | $\  $$ |
                $$ /  $$ |$$ /  \__|$$ |  $$ |  $$ |  $$ |      $$ |     $$ /  $$ |$$ |$$$\ $$ |
                $$$$$$$$ |$$ |$$$$\ $$$$$$$  |  $$ |  $$$$$\    $$ |     $$ |  $$ |$$ $$ $$\$$ |
                $$  __$$ |$$ |\_$$ |$$  __$$<   $$ |  $$  __|   $$ |     $$ |  $$ |$$$$  _$$$$ |
                $$ |  $$ |$$ |  $$ |$$ |  $$ |  $$ |  $$ |      $$ |     $$ |  $$ |$$$  / \$$$ |
                $$ |  $$ |\$$$$$$  |$$ |  $$ |$$$$$$\ $$ |      $$$$$$$$\ $$$$$$  |$$  /   \$$ |
                \__|  \__| \______/ \__|  \__|\______|\__|      \________|\______/ \__/     \__|
*/

/**
 * @title A contract for Supply Chain Marketplace
 * @author Team AgriFlow
 * @notice for now, this contract just show how to Supply Chain Management System work for Consumer and Producer
 */
contract Agriflow {
    uint public totalProduct = 0;
    uint public totalOrder = 0;
    mapping(address => string) public producers;
    mapping(address => string) public consumers;
    mapping(uint => product) public products;
    mapping(uint => order) public orders;

    // authentication for Producers
    modifier registerNewProducerAuth() {
        require(bytes(producers[msg.sender]).length == 0);
        _;
    }
    
    modifier addNewProductAuth() {
        require(bytes(producers[msg.sender]).length > 0);
        _;
    }

    // authentication for Consumers
    modifier registerNewConsumerAuth() {
        require(bytes(consumers[msg.sender]).length == 0);
        _;
    }

    modifier purchaseProductAuth() {
        require(bytes(consumers[msg.sender]).length > 0);
        _;
    }

    // to store the product details
    struct product {
        uint id;
        uint price;
        uint quantity;
        string product_name;
        address producer_address;
    }

    // to store the order details
    struct order {
        uint id;
        uint product_id;
        uint quantity;
        string customer_name;
        string status;
        string delivery_address;
        address customer_address;
    }

    // function to return the total product for consumer and Producer
    function getTotalProduct() public view returns (uint) {
        return totalProduct;
    }

    // function to return the total order for consumer and Producer
    function getTotalOrder() public view returns (uint) {
        return totalOrder;
    }

    // function to check the producer is registered or not
    function isProducerRegistered(address _addr) public view returns (bool) {
        if (bytes(producers[_addr]).length == 0) {
            return (false);
        } else {
            return (true);
        }
    }

    // function to store the name of the producers
    function registerNewProducer(
        string memory _name
    ) public registerNewProducerAuth {
        producers[msg.sender] = _name;
    }

    // function to check the producer is registered or not
    function isConsumerRegistered(address _addr) public view returns (bool) {
        if (bytes(consumers[_addr]).length == 0) {
            return (false);
        } else {
            return (true);
        }
    }

    // function to store the name of the producers
    function registerNewConsumer(
        string memory _name
    ) public registerNewConsumerAuth {
        consumers[msg.sender] = _name;
    }

    // function to add new products by producer after registration
    function addNewProductsInList(
        string memory _pname,
        uint _price,
        uint _quantity
    ) public addNewProductAuth {
        totalProduct += 1;
        products[totalProduct] = product(
            totalProduct,
            _price,
            _quantity,
            _pname,
            msg.sender
        );
    }

    // function to counts the number of products
    function getTotalProduct(address _addr) public view returns (uint) {
        uint counter = 0;
        for (uint i = 1; i <= totalProduct; i++) {
            if (products[i].producer_address == _addr) {
                counter++;
            }
        }
        return (counter);
    }

    // function to get product details
    function getProductbyId(
        address _addr,
        uint _pid
    ) public view returns (uint, uint, uint, string memory, bool) {
        require(_pid <= totalProduct);
        if (products[_pid].producer_address == _addr) {
            return (
                products[_pid].id,
                products[_pid].price,
                products[_pid].quantity,
                products[_pid].product_name,
                true
            );
        }
        return (0, 0, 0, "", false);
    }

    // function to change the price of the listed products
    function newPrice(uint _pid, uint _newPrice) public addNewProductAuth {
        require(products[_pid].producer_address == msg.sender); //check if pid and producer address matched than
        products[_pid].price = _newPrice;
    }

    // function to count the number of total order
    function getMyTotalOrder(address _addr) public view returns (uint) {
        uint counter = 0;
        for (uint i = 1; i <= totalOrder; i++) {
            if (products[orders[i].product_id].producer_address == _addr) {
                counter++;
            }
        }
        return (counter);
    }

    // Producer Page : function to get order details
    function getOrderByIdProducer(
        address _addr,
        uint _oid
    )
        public
        view
        returns (
            uint,
            uint,
            uint,
            string memory,
            string memory,
            string memory,
            bool
        )
    {
        require(_oid <= totalOrder);
        if (products[orders[_oid].product_id].producer_address == _addr) {
            return (
                orders[_oid].id,
                orders[_oid].product_id,
                orders[_oid].quantity,
                orders[_oid].customer_name,
                orders[_oid].status,
                orders[_oid].delivery_address,
                true
            );
        }
        return (0, 0, 0, "", "", "", false);
    }

    // function to set the status of the order as Accepted or Rejected
    function giveOrderItsStatus(uint _oid, string memory _status) public {
        require(
            products[orders[_oid].product_id].producer_address == msg.sender
        );
        orders[_oid].status = _status;
    }

    // Consumer Side : function to get Product By Id
    function getProductById(
        uint _pid
    ) public view returns (uint, uint, uint, string memory) {
        require(_pid <= totalProduct);
        return (
            products[_pid].id,
            products[_pid].price,
            products[_pid].quantity,
            products[_pid].product_name
        );
    }

    // function to place the order by Consumer
    function placeAnOrder(
        uint _pid,
        uint _quantity,
        string memory _cname,
        string memory _daddress
    ) public purchaseProductAuth {
        require(products[_pid].quantity >= _quantity);
        totalOrder += 1;
        orders[totalOrder] = order(
            totalOrder,
            _pid,
            _quantity,
            _cname,
            "Placed",
            _daddress,
            msg.sender
        );
        products[_pid].quantity -= _quantity;
    }

    // function to counts the number of total orders of Consumer
    function getTotalOrder(address _addr) public view returns (uint) {
        uint counter = 0;
        for (uint i = 1; i <= totalOrder; i++) {
            if (_addr == orders[i].customer_address) {
                counter++;
            }
        }
        return (counter);
    }

    // function to display the orders of Consumer
    function getOrderByIdConsumer(
        address _addr,
        uint _oid
    ) public view returns (uint, string memory, string memory, bool) {
        require(_oid <= totalOrder);
        if (_addr == orders[_oid].customer_address) {
            return (
                orders[_oid].id,
                orders[_oid].status,
                orders[_oid].delivery_address,
                true
            );
        }
        return (0, "", "", false);
    }
}
