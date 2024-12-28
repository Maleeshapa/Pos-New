-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2024 at 05:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `possystemnew2`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `categoryType` varchar(100) NOT NULL,
  `categoryStatus` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`, `categoryType`, `categoryStatus`) VALUES
(1, 'cat 1', 'cat', 'In stock'),
(2, 'cat 2', 'gold', 'In stock');

-- --------------------------------------------------------

--
-- Table structure for table `chequdata`
--

CREATE TABLE `chequdata` (
  `id` int(11) NOT NULL,
  `chequeDate` date NOT NULL,
  `chequePayment` varchar(255) NOT NULL,
  `supplierId` int(11) NOT NULL,
  `stockPaymentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `costing_details`
--

CREATE TABLE `costing_details` (
  `id` int(11) NOT NULL,
  `header_id` int(11) DEFAULT NULL,
  `product_code` varchar(50) DEFAULT NULL,
  `description_customer` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `warranty` varchar(100) DEFAULT NULL,
  `supplier` varchar(100) DEFAULT NULL,
  `unit_cost` decimal(10,2) DEFAULT NULL,
  `our_margin_percentage` decimal(5,2) DEFAULT NULL,
  `our_margin_value` decimal(10,2) DEFAULT NULL,
  `other_margin_percentage` decimal(5,2) DEFAULT NULL,
  `other_margin_value` decimal(10,2) DEFAULT NULL,
  `price_plus_margin` decimal(10,2) DEFAULT NULL,
  `selling_rate` decimal(10,2) DEFAULT NULL,
  `selling_rate_rounded` decimal(10,2) DEFAULT NULL,
  `uom` varchar(20) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `discount_percentage` decimal(5,2) DEFAULT NULL,
  `discount_value` decimal(10,2) DEFAULT NULL,
  `discounted_price` decimal(10,2) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `profit` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `costing_headers`
--

CREATE TABLE `costing_headers` (
  `id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) DEFAULT NULL,
  `total_profit` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cusId` int(11) NOT NULL,
  `cusName` varchar(255) NOT NULL,
  `cusCode` varchar(255) NOT NULL,
  `cusAddress` varchar(255) NOT NULL,
  `cusPhone` varchar(255) NOT NULL,
  `cusJob` varchar(255) NOT NULL,
  `cusOffice` varchar(255) NOT NULL,
  `cusStore` varchar(255) NOT NULL,
  `cusEmail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cusId`, `cusName`, `cusCode`, `cusAddress`, `cusPhone`, `cusJob`, `cusOffice`, `cusStore`, `cusEmail`) VALUES
(5, 'Buddhika', 'cus001', 'kandy', '1234567890', 'no job', 'Abc', 'haman', NULL),
(6, 'kavindu', 'cus002', 'Hunnasgiriya', '1234567895', 'kada himiya', 'kavindu stores', 'terra', NULL),
(8, 'maleesha', 'cus004', 'katugasthota', '1234567823', 'accounting ex', 'avcd', 'colkan', NULL),
(10, 'vidun jetman', 'cus001', 'napane', '1234567897', 'bank', 'banks', 'colkan', NULL),
(11, 'branch 2', 'cus001', 'sssq', '1234567894', 'bhalla', 'Abc', 'colkan', NULL),
(12, 'sad', 'CUS005', 'hunga', '1234557890', 'teach', 'school', 'colkan', 'test@test.com');

-- --------------------------------------------------------

--
-- Table structure for table `deliverynote`
--

CREATE TABLE `deliverynote` (
  `id` int(11) NOT NULL,
  `invoiceId` int(11) NOT NULL,
  `invoiceNo` varchar(255) NOT NULL,
  `productId` int(11) NOT NULL,
  `stockId` int(11) NOT NULL,
  `invoiceQty` varchar(255) NOT NULL,
  `sendQty` varchar(255) NOT NULL,
  `totalAmount` varchar(255) NOT NULL,
  `deliveryStatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deliverynote`
--

INSERT INTO `deliverynote` (`id`, `invoiceId`, `invoiceNo`, `productId`, `stockId`, `invoiceQty`, `sendQty`, `totalAmount`, `deliveryStatus`) VALUES
(7, 426, '1500', 1, 1, '5', '5', '500', 'notDelivered'),
(8, 426, '1500', 2, 3, '10', '10', '1200', 'notDelivered'),
(9, 426, '1500', 3, 4, '20', '20', '2000', 'notDelivered'),
(10, 426, '1500', 6, 4, '30', '30', '2700', 'notDelivered'),
(11, 427, '1501', 1, 1, '1', '1', '100', 'invoice'),
(12, 428, '1502', 1, 1, '1', '1', '100', 'invoice'),
(13, 429, '1503', 1, 1, '1', '1', '100', 'invoice'),
(14, 430, '1504', 1, 1, '1', '1', '100', 'invoice'),
(15, 431, '1505', 1, 1, '3', '3', '300', 'invoice');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `expensesId` int(11) NOT NULL,
  `expensesRef` varchar(45) NOT NULL,
  `expensesNote` varchar(255) NOT NULL,
  `expensesAmount` varchar(45) NOT NULL,
  `expensesDate` varchar(45) NOT NULL,
  `expensesImage` varchar(255) NOT NULL,
  `expensesCat_expensesCatId` int(11) NOT NULL,
  `user_userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expensescat`
--

CREATE TABLE `expensescat` (
  `expensesCatId` int(11) NOT NULL,
  `expensesCatName` varchar(45) NOT NULL,
  `expensesCatType` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `invoiceId` int(11) NOT NULL,
  `invoiceNo` varchar(45) NOT NULL,
  `invoiceDate` datetime NOT NULL,
  `status` varchar(255) NOT NULL,
  `store` varchar(255) NOT NULL,
  `purchaseNo` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `cusId` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`invoiceId`, `invoiceNo`, `invoiceDate`, `status`, `store`, `purchaseNo`, `image`, `cusId`) VALUES
(426, '1500', '2024-12-27 08:06:32', 'delivery', 'haman', 'purchaseNo', 'http://localhost:5000/uploads/invoice/INV_1735286792586.pdf', 5),
(427, '1501', '2024-12-27 14:48:07', 'Invoice', 'haman', '1', NULL, 5),
(428, '1502', '2024-12-27 14:48:46', 'Invoice', 'colkan', '2', NULL, 8),
(429, '1503', '2024-12-27 14:49:24', 'Invoice', 'haman', '3', NULL, 5),
(430, '1504', '2024-12-27 14:49:56', 'Invoice', 'colkan', '6', NULL, 8),
(431, '1505', '2024-12-27 14:50:16', 'Invoice', 'haman', '7', NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `invoiceproduct`
--

CREATE TABLE `invoiceproduct` (
  `id` int(11) NOT NULL,
  `invoiceId` int(11) NOT NULL,
  `invoiceNo` varchar(255) NOT NULL,
  `productId` int(11) NOT NULL,
  `stockId` int(11) NOT NULL,
  `invoiceQty` varchar(255) NOT NULL,
  `totalAmount` varchar(255) NOT NULL,
  `invoiceProductStatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoiceproduct`
--

INSERT INTO `invoiceproduct` (`id`, `invoiceId`, `invoiceNo`, `productId`, `stockId`, `invoiceQty`, `totalAmount`, `invoiceProductStatus`) VALUES
(362, 426, '1500', 1, 1, '5', '500', 'notDelivered'),
(363, 426, '1500', 2, 3, '10', '1200', 'notDelivered'),
(364, 426, '1500', 3, 4, '20', '2000', 'notDelivered'),
(365, 426, '1500', 6, 4, '30', '2700', 'notDelivered'),
(366, 427, '1501', 1, 1, '1', '100', 'invoice'),
(367, 428, '1502', 1, 1, '1', '100', 'invoice'),
(368, 429, '1503', 1, 1, '1', '100', 'invoice'),
(369, 430, '1504', 1, 1, '1', '100', 'invoice'),
(370, 431, '1505', 1, 1, '3', '300', 'invoice');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productCode` varchar(45) NOT NULL,
  `productUnit` varchar(255) NOT NULL,
  `productDiscount` float DEFAULT NULL,
  `productBuyingPrice` int(11) NOT NULL,
  `productSellingPrice` int(11) NOT NULL,
  `productWarranty` varchar(100) DEFAULT NULL,
  `productProfit` float NOT NULL,
  `productEmi` varchar(255) DEFAULT NULL,
  `productDescription` varchar(255) DEFAULT NULL,
  `productImage` varchar(255) DEFAULT NULL,
  `productStatus` varchar(45) NOT NULL,
  `category_categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productName`, `productCode`, `productUnit`, `productDiscount`, `productBuyingPrice`, `productSellingPrice`, `productWarranty`, `productProfit`, `productEmi`, `productDescription`, `productImage`, `productStatus`, `category_categoryId`) VALUES
(1, 'product 1', 'p1', '10', NULL, 100, 100, '', 0, NULL, 'ss', NULL, 'In stock', 1),
(2, 'product 2', 'p2', '10', NULL, 120, 120, '', 0, NULL, 'gg', NULL, 'In stock', 1),
(3, 'product 3', 'p3', '10', NULL, 1002, 100, '10 Months', -902, NULL, '100', NULL, 'In stock', 2),
(6, 'product 4', 'p4', '10', NULL, 100, 90, '6 Months', -10, NULL, '', NULL, 'In stock', 1);

-- --------------------------------------------------------

--
-- Table structure for table `returnitems`
--

CREATE TABLE `returnitems` (
  `returnItemId` int(11) NOT NULL,
  `returnItemType` varchar(45) NOT NULL,
  `returnItemDate` datetime NOT NULL,
  `returnQty` int(11) DEFAULT NULL,
  `returnNote` varchar(45) DEFAULT NULL,
  `products_productId` int(11) NOT NULL,
  `store_storeId` int(11) NOT NULL,
  `user_userId` int(11) NOT NULL,
  `invoice_invoiceId` int(11) NOT NULL,
  `stockId` int(11) NOT NULL,
  `returnAmount` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `returnproducts`
--

CREATE TABLE `returnproducts` (
  `returnProductId` int(11) NOT NULL,
  `stockId` int(11) NOT NULL,
  `invoiceProductId` int(11) NOT NULL,
  `returnItemId` int(11) NOT NULL,
  `returnQty` int(11) NOT NULL,
  `returnItemType` int(11) NOT NULL,
  `returnNote` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `stockId` int(11) NOT NULL,
  `stockName` varchar(255) NOT NULL,
  `stockdate` datetime NOT NULL,
  `billImage` varchar(255) DEFAULT NULL,
  `stockPrice` float NOT NULL,
  `stockQty` int(11) NOT NULL,
  `mfd` date DEFAULT NULL,
  `exp` date DEFAULT NULL,
  `stockDescription` varchar(255) DEFAULT NULL,
  `stockStatus` varchar(45) NOT NULL,
  `products_productId` int(11) NOT NULL,
  `supplier_supplierId` int(11) NOT NULL,
  `store_storeId` int(11) NOT NULL,
  `category_categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`stockId`, `stockName`, `stockdate`, `billImage`, `stockPrice`, `stockQty`, `mfd`, `exp`, `stockDescription`, `stockStatus`, `products_productId`, `supplier_supplierId`, `store_storeId`, `category_categoryId`) VALUES
(1, 'stock1', '2024-10-16 17:09:18', NULL, 100, 2147483635, '2024-10-16', '2024-10-31', 'note', '', 1, 1, 1, 1),
(3, 'stock 2', '2024-10-17 01:28:56', NULL, 100, 99654055, '2024-10-17', '2024-10-31', 'booo', '', 2, 1, 1, 1),
(4, '5', '2024-10-18 09:01:00', NULL, 10000, 2147483597, '2024-10-18', '2024-10-17', NULL, 'In stock', 3, 1, 1, 1),
(5, '1', '2024-12-19 07:42:00', 'http://localhost:5000/uploads/stock/1_1733663580933.png', 500, 5, '2024-12-26', '2024-12-18', '5', 'In stock', 3, 1, 1, 1),
(6, '5', '2024-12-10 07:09:00', 'http://localhost:5000/uploads/stock/5_1733747989746.png', 200, 2, '2024-12-10', '2024-12-16', NULL, 'In stock', 1, 2, 1, 1),
(7, 'ww', '2024-12-10 07:14:00', NULL, 500, 5, '2024-12-12', '2024-12-11', NULL, 'In stock', 1, 1, 1, 1),
(8, 'stock 6', '2024-12-18 09:48:00', NULL, 500, 5, '2024-12-18', '2024-12-19', NULL, 'In stock', 1, 1, 1, 1),
(9, '12', '0000-00-00 00:00:00', NULL, 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1),
(10, '12', '0000-00-00 00:00:00', NULL, 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1),
(11, '12', '0000-00-00 00:00:00', NULL, 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1),
(12, '12', '0000-00-00 00:00:00', NULL, 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1),
(13, '12', '0000-00-00 00:00:00', NULL, 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1),
(14, '12', '0000-00-00 00:00:00', NULL, 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1),
(15, '12', '0000-00-00 00:00:00', NULL, 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1),
(16, '12', '0000-00-00 00:00:00', NULL, 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1),
(17, '12', '0000-00-00 00:00:00', NULL, 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1),
(18, '12', '0000-00-00 00:00:00', NULL, 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1),
(19, '12', '0000-00-00 00:00:00', NULL, 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1),
(20, '12', '0000-00-00 00:00:00', NULL, 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1),
(21, '12', '0000-00-00 00:00:00', NULL, 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1),
(22, '12', '0000-00-00 00:00:00', NULL, 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1),
(23, '12', '0000-00-00 00:00:00', NULL, 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1),
(24, '12', '0000-00-00 00:00:00', NULL, 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1),
(25, '12', '0000-00-00 00:00:00', NULL, 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1),
(26, '12', '0000-00-00 00:00:00', NULL, 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1),
(27, '12', '0000-00-00 00:00:00', NULL, 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1),
(28, '12', '0000-00-00 00:00:00', NULL, 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1),
(29, '12', '0000-00-00 00:00:00', NULL, 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1),
(30, '12', '0000-00-00 00:00:00', NULL, 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1),
(31, '12', '0000-00-00 00:00:00', NULL, 100, 1, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1),
(32, '12', '0000-00-00 00:00:00', NULL, 120, 1, NULL, NULL, 'ss', 'In Stock', 2, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `stockhistory`
--

CREATE TABLE `stockhistory` (
  `stockHistoryId` int(11) NOT NULL,
  `stockHistoryQty` int(11) NOT NULL,
  `stock_stockId` int(11) NOT NULL,
  `products_productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stockhistory`
--

INSERT INTO `stockhistory` (`stockHistoryId`, `stockHistoryQty`, `stock_stockId`, `products_productId`) VALUES
(1, 100, 4, 3),
(2, 5, 5, 3),
(3, 2, 6, 1),
(4, 5, 7, 1),
(5, 5, 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `stockpayments`
--

CREATE TABLE `stockpayments` (
  `stockPaymentId` int(11) NOT NULL,
  `cashAmount` float NOT NULL,
  `chequeAmount` float NOT NULL,
  `due` float NOT NULL,
  `total` float NOT NULL,
  `vat` float NOT NULL,
  `stockQty` int(11) NOT NULL,
  `supplierId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_payments`
--

CREATE TABLE `stock_payments` (
  `stockPaymentId` int(11) NOT NULL,
  `cashAmount` float NOT NULL,
  `chequeAmount` float NOT NULL,
  `due` float NOT NULL,
  `total` float NOT NULL,
  `vat` float NOT NULL,
  `stockQty` int(11) NOT NULL,
  `stockId` int(11) DEFAULT NULL,
  `supplieId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `storeId` int(11) NOT NULL,
  `storeName` varchar(45) NOT NULL,
  `storeAddress` varchar(255) NOT NULL,
  `storeStatus` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`storeId`, `storeName`, `storeAddress`, `storeStatus`) VALUES
(1, 'terra', 'kandy', 'Active'),
(2, 'colkan', 'kolkan', 'Active'),
(3, 'haman', 'haman', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplierId` int(11) NOT NULL,
  `supplierName` varchar(45) NOT NULL,
  `supplierAddress` varchar(255) NOT NULL,
  `supplierNic` varchar(45) NOT NULL,
  `supplierEmail` varchar(45) NOT NULL,
  `supplierTP` varchar(45) NOT NULL,
  `supplierSecondTP` varchar(45) NOT NULL,
  `supplierStatus` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplierId`, `supplierName`, `supplierAddress`, `supplierNic`, `supplierEmail`, `supplierTP`, `supplierSecondTP`, `supplierStatus`) VALUES
(1, 'kavindu', 'xxxxx', '123456789V', 'kunage07@gmail.com', '1234567890', '', 'Active'),
(2, 'Buddhika', 'gg', '121212121212', 'buddhika@gmail.com', '1234567890', '12334567890', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `switch`
--

CREATE TABLE `switch` (
  `id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `switch`
--

INSERT INTO `switch` (`id`, `status`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transactionId` int(11) NOT NULL,
  `transactionType` varchar(255) NOT NULL,
  `price` varchar(100) NOT NULL,
  `discount` float NOT NULL,
  `dateTime` datetime NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `paid` float DEFAULT NULL,
  `due` float DEFAULT NULL,
  `invoice_invoiceId` int(11) NOT NULL,
  `user_userId` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transactionId`, `transactionType`, `price`, `discount`, `dateTime`, `note`, `paid`, `due`, `invoice_invoiceId`, `user_userId`) VALUES
(303, 'cash', '6400', 0, '2024-12-27 08:06:33', '', 6400, 0, 426, 1),
(304, 'credit', '100', 0, '2024-12-27 14:48:08', '', 0, 0, 427, 4),
(305, 'credit', '100', 0, '2024-12-27 14:48:46', '', 0, 0, 428, 4),
(306, 'credit', '100', 0, '2024-12-27 14:49:24', '', 0, 100, 429, 4),
(307, 'credit', '100', 0, '2024-12-27 14:49:56', '', 0, 100, 430, 4),
(308, 'credit', '300', 0, '2024-12-27 14:50:16', '', 0, 300, 431, 4);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userTitle` varchar(45) NOT NULL,
  `userFullName` varchar(100) NOT NULL,
  `userName` varchar(45) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userType` varchar(45) NOT NULL,
  `userEmail` varchar(45) NOT NULL,
  `userNIC` varchar(45) NOT NULL,
  `userSecondTP` varchar(45) DEFAULT NULL,
  `userTP` varchar(45) NOT NULL,
  `userAddress` varchar(255) NOT NULL,
  `userImage` varchar(255) DEFAULT NULL,
  `userStatus` varchar(45) NOT NULL,
  `store_storeId` int(11) NOT NULL,
  `is_hidden` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `userTitle`, `userFullName`, `userName`, `userPassword`, `userType`, `userEmail`, `userNIC`, `userSecondTP`, `userTP`, `userAddress`, `userImage`, `userStatus`, `store_storeId`, `is_hidden`) VALUES
(1, 'Mr.', 'abc', 'abc', '$2b$10$1R9ZL5CZUuWfUJsFaDTxeuQqbzaXaO7eRnxVQ27J/6Kqjr2uS3KMe', 'Admin', 'buddhika@gmail.com', '123456789V', '12334567890', '1234567890', 'ccc', NULL, 'Active', 1, 0),
(2, 'Mr.', 'maleesha', 'maleesha', '$2b$10$DdVcqL6K7es6nZsGhfIlveZFfI14GmalUirHJitqD6sY/oG4n2CMC', 'User', 'kunage@gmail.com', '00000000V', '12334567890', '1234567890', 'xxx', NULL, 'Active', 1, 0),
(4, 'Mr.', 'master', 'master', '$2b$10$YOYbjZyy3L4nBG/QLXHT5OZGqyFj80naF.fLxwH7nXRPHld6CjdCC', 'Admin', 'master@gmail.com', '123456729V', '12334567890', '1234567890', 'xxx', NULL, 'Active', 1, 1),
(5, 'Mr.', 'maleesha', 'maleeshapa', '$2b$10$SQb/n5CQrtiyuE/ABCIVoO1noHx9zPc53rEVlC7WGZ9VkFBu4Qo4m', 'Admin', 'buddhika@gmail.com', '2002832992', '12334567890', '1234567890', 'kandy', 'http://localhost:5000/uploads/users/maleeshapa_1735067279096.jpg', 'Active', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `chequdata`
--
ALTER TABLE `chequdata`
  ADD KEY `stockPaymentId` (`stockPaymentId`),
  ADD KEY `supplierId` (`supplierId`);

--
-- Indexes for table `costing_details`
--
ALTER TABLE `costing_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_id` (`header_id`),
  ADD KEY `product_code` (`product_code`);

--
-- Indexes for table `costing_headers`
--
ALTER TABLE `costing_headers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cusId`);

--
-- Indexes for table `deliverynote`
--
ALTER TABLE `deliverynote`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deliverynote_ibfk_1` (`invoiceId`),
  ADD KEY `deliverynote_ibfk_3` (`stockId`),
  ADD KEY `deliverynote_ibfk_2` (`productId`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`expensesId`),
  ADD KEY `fk_Expenses_expensesCat1_idx` (`expensesCat_expensesCatId`),
  ADD KEY `fk_Expenses_user1_idx` (`user_userId`);

--
-- Indexes for table `expensescat`
--
ALTER TABLE `expensescat`
  ADD PRIMARY KEY (`expensesCatId`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoiceId`),
  ADD UNIQUE KEY `purchaseNo` (`purchaseNo`),
  ADD KEY `invoice_ibfk_1` (`cusId`);

--
-- Indexes for table `invoiceproduct`
--
ALTER TABLE `invoiceproduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoiceId` (`invoiceId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `stockId` (`stockId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD UNIQUE KEY `productCode` (`productCode`),
  ADD KEY `fk_products_category_idx` (`category_categoryId`);

--
-- Indexes for table `returnitems`
--
ALTER TABLE `returnitems`
  ADD PRIMARY KEY (`returnItemId`),
  ADD KEY `fk_return_products1_idx` (`products_productId`),
  ADD KEY `fk_return_store1_idx` (`store_storeId`),
  ADD KEY `fk_return_user1_idx` (`user_userId`),
  ADD KEY `fk_return_invoice1_idx` (`invoice_invoiceId`);

--
-- Indexes for table `returnproducts`
--
ALTER TABLE `returnproducts`
  ADD PRIMARY KEY (`returnProductId`),
  ADD KEY `returnproduct_ibfk_2` (`invoiceProductId`),
  ADD KEY `returnproduct_ibfk_3` (`returnItemId`),
  ADD KEY `returnproduct_ibfk_4` (`stockId`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`stockId`),
  ADD KEY `fk_stock_products1_idx` (`products_productId`),
  ADD KEY `fk_stock_supplier1_idx` (`supplier_supplierId`),
  ADD KEY `fk_stock_store1_idx` (`store_storeId`),
  ADD KEY `fk_stock_category1_idx` (`category_categoryId`);

--
-- Indexes for table `stockhistory`
--
ALTER TABLE `stockhistory`
  ADD PRIMARY KEY (`stockHistoryId`),
  ADD KEY `fk_stockHistory_stock1_idx` (`stock_stockId`),
  ADD KEY `fk_stockHistory_products1_idx` (`products_productId`);

--
-- Indexes for table `stockpayments`
--
ALTER TABLE `stockpayments`
  ADD PRIMARY KEY (`stockPaymentId`),
  ADD KEY `supplierId` (`supplierId`);

--
-- Indexes for table `stock_payments`
--
ALTER TABLE `stock_payments`
  ADD PRIMARY KEY (`stockPaymentId`),
  ADD KEY `stockId` (`stockId`),
  ADD KEY `stock_payments_ibfk_2` (`supplieId`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`storeId`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplierId`);

--
-- Indexes for table `switch`
--
ALTER TABLE `switch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transactionId`),
  ADD KEY `fk_transaction_invoice1_idx` (`invoice_invoiceId`),
  ADD KEY `fk_transaction_user1_idx` (`user_userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD KEY `fk_user_store1_idx` (`store_storeId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `costing_details`
--
ALTER TABLE `costing_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `costing_headers`
--
ALTER TABLE `costing_headers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cusId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `deliverynote`
--
ALTER TABLE `deliverynote`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `expensesId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expensescat`
--
ALTER TABLE `expensescat`
  MODIFY `expensesCatId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=432;

--
-- AUTO_INCREMENT for table `invoiceproduct`
--
ALTER TABLE `invoiceproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=371;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `returnitems`
--
ALTER TABLE `returnitems`
  MODIFY `returnItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `returnproducts`
--
ALTER TABLE `returnproducts`
  MODIFY `returnProductId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `stockId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `stockhistory`
--
ALTER TABLE `stockhistory`
  MODIFY `stockHistoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stockpayments`
--
ALTER TABLE `stockpayments`
  MODIFY `stockPaymentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_payments`
--
ALTER TABLE `stock_payments`
  MODIFY `stockPaymentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `storeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `supplierId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `switch`
--
ALTER TABLE `switch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transactionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=309;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `costing_details`
--
ALTER TABLE `costing_details`
  ADD CONSTRAINT `costing_details_ibfk_1` FOREIGN KEY (`header_id`) REFERENCES `costing_headers` (`id`),
  ADD CONSTRAINT `costing_details_ibfk_2` FOREIGN KEY (`product_code`) REFERENCES `products` (`productCode`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
