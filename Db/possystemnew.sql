-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2024 at 07:56 AM
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
-- Database: `possystemnew`
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
  `cusStore` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cusId`, `cusName`, `cusCode`, `cusAddress`, `cusPhone`, `cusJob`, `cusOffice`, `cusStore`) VALUES
(5, 'Buddhika', 'cus001', 'kandy', '1234567890', 'no job', 'Abc', 'haman'),
(6, 'kavindu', 'cus002', 'Hunnasgiriya', '1234567895', 'kada himiya', 'kavindu stores', 'terra'),
(8, 'maleesha', 'cus004', 'katugasthota', '1234567823', 'accounting ex', 'avcd', 'colkan'),
(10, 'vidun jetman', 'cus001', 'napane', '1234567897', 'bank', 'banks', 'colkan'),
(11, 'branch 2', 'cus001', 'sssq', '1234567894', 'bhalla', 'Abc', 'colkan');

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
(374, '1500', '2024-12-20 13:53:02', 'delivery', 'haman', '', NULL, 5),
(375, '1501', '2024-12-20 13:55:23', 'delivery', 'terra', '', NULL, 6),
(376, '1502', '2024-12-20 14:13:26', 'Invoice', 'haman', 'purchaseNo', NULL, 5),
(380, '1503', '2024-12-20 15:09:40', 'Invoice', '', 'purchaseNo6', NULL, 5),
(381, '1504', '2024-12-20 15:10:58', 'Invoice', '', '', NULL, 5),
(382, '1505', '2024-12-20 15:11:42', 'Invoice', '', '', NULL, 5),
(383, '1506', '2024-12-20 15:14:46', 'Invoice', 'terra', 'purchaseNo', NULL, 6),
(384, '1507', '2024-12-20 15:19:02', 'Invoice', 'colkan', '', NULL, 5),
(385, '1508', '2024-12-20 15:19:43', 'Invoice', 'haman', '', NULL, 5),
(386, '1509', '2024-12-22 12:26:48', 'draft', 'haman', '', NULL, 5),
(387, '1510', '2024-12-22 13:30:15', 'Invoice', 'haman', '', NULL, 5),
(388, '1511', '2024-12-22 14:13:40', 'draft', 'haman', 'purchaseNo', NULL, 5),
(389, '1512', '2024-12-23 14:13:08', 'Invoice', 'haman', 'purchaseNo2', NULL, 5),
(390, '1513', '2024-12-24 18:45:26', 'Invoice', 'haman', '', NULL, 5),
(391, '1514', '2024-12-24 19:05:07', 'Invoice', 'haman', 'purchaseNo25', 'http://localhost:5000/uploads/invoice/INV_1735067107837.jpg', 5),
(392, '1515', '2024-12-24 19:06:01', 'Invoice', 'haman', 'purchaseNo22', 'http://localhost:5000/uploads/invoice/INV_1735067161866.jpg', 5),
(393, '1516', '2024-12-24 19:18:05', 'Invoice', 'haman', 'purchaseNo23', 'http://localhost:5000/uploads/invoice/INV_1735067885552.pdf', 5);

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
(278, 374, '1500', 1, 1, '1', '100', 'Delivered'),
(279, 374, '1500', 2, 3, '1', '120', 'Delivered'),
(280, 374, '1500', 6, 3, '1', '90', 'notDelivered'),
(281, 374, '1500', 3, 4, '10', '1000', 'notDelivered'),
(282, 374, '1500', 6, 4, '5', '450', 'notDelivered'),
(283, 375, '1501', 2, 3, '10', '1200', 'notDelivered'),
(284, 375, '1501', 3, 4, '5', '500', 'notDelivered'),
(285, 375, '1501', 1, 1, '100', '10000', 'notDelivered'),
(286, 376, '1502', 1, 1, '1', '100', 'invoice'),
(290, 380, '1503', 2, 3, '1', '120', 'invoice'),
(291, 382, '1505', 1, 1, '1', '100', 'invoice'),
(292, 383, '1506', 1, 1, '1', '100', 'invoice'),
(293, 384, '1507', 1, 1, '1', '100', 'invoice'),
(294, 385, '1508', 2, 3, '1', '120', 'invoice'),
(295, 386, '1509', 1, 1, '1', '100', 'invoice'),
(296, 386, '1509', 2, 3, '1', '120', 'invoice'),
(297, 387, '1510', 2, 3, '1', '120', 'invoice'),
(298, 388, '1511', 2, 3, '1', '120', 'invoice'),
(299, 388, '1511', 1, 1, '1', '100', 'invoice'),
(300, 388, '1511', 3, 4, '1', '100', 'invoice'),
(301, 388, '1511', 6, 4, '1', '90', 'invoice'),
(302, 389, '1512', 1, 1, '1', '100', 'invoice'),
(303, 389, '1512', 2, 3, '1', '120', 'invoice'),
(304, 390, '1513', 1, 1, '1', '100', 'invoice'),
(305, 391, '1514', 1, 1, '1', '100', 'invoice'),
(306, 392, '1515', 1, 1, '1', '100', 'invoice'),
(307, 393, '1516', 1, 1, '1', '100', 'invoice');

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
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `stockId` int(11) NOT NULL,
  `stockName` varchar(255) NOT NULL,
  `stockdate` datetime NOT NULL,
  `billImage` varchar(255) DEFAULT NULL,
  `stockPrice` float NOT NULL,
  `due` float NOT NULL,
  `vat` float NOT NULL,
  `total` float NOT NULL,
  `stockQty` int(11) NOT NULL,
  `mfd` date DEFAULT NULL,
  `exp` date DEFAULT NULL,
  `cashAmount` float DEFAULT NULL,
  `chequeAmount` float DEFAULT NULL,
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

INSERT INTO `stock` (`stockId`, `stockName`, `stockdate`, `billImage`, `stockPrice`, `due`, `vat`, `total`, `stockQty`, `mfd`, `exp`, `cashAmount`, `chequeAmount`, `stockDescription`, `stockStatus`, `products_productId`, `supplier_supplierId`, `store_storeId`, `category_categoryId`) VALUES
(1, 'stock1', '2024-10-16 17:09:18', NULL, 100, 1, 1, 100, 851, '2024-10-16', '2024-10-31', 500, NULL, 'note', '', 1, 1, 1, 1),
(3, 'stock 2', '2024-10-17 01:28:56', NULL, 100, 1, 1, 1, 999, '2024-10-17', '2024-10-31', 500, 211, 'booo', '', 2, 1, 1, 1),
(4, '5', '2024-10-18 09:01:00', NULL, 10000, 0, 0, 0, 1000, '2024-10-18', '2024-10-17', 98, NULL, NULL, 'In stock', 3, 1, 1, 1),
(5, '1', '2024-12-19 07:42:00', 'http://localhost:5000/uploads/stock/1_1733663580933.png', 500, 0, 0, 0, 5, '2024-12-26', '2024-12-18', 120, NULL, '5', 'In stock', 3, 1, 1, 1),
(6, '5', '2024-12-10 07:09:00', 'http://localhost:5000/uploads/stock/5_1733747989746.png', 200, 0, 0, 0, 2, '2024-12-10', '2024-12-16', 112, 121, NULL, 'In stock', 1, 2, 1, 1),
(7, 'ww', '2024-12-10 07:14:00', NULL, 500, 0, 0, 0, 5, '2024-12-12', '2024-12-11', 122, NULL, NULL, 'In stock', 1, 1, 1, 1),
(8, 'stock 6', '2024-12-18 09:48:00', NULL, 500, 475, 5, 525, 5, '2024-12-18', '2024-12-19', 1000, NULL, NULL, 'In stock', 1, 1, 1, 1);

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
-- Table structure for table `stockpayment`
--

CREATE TABLE `stockpayment` (
  `id` int(11) NOT NULL,
  `cashAmount` varchar(255) NOT NULL,
  `chequeAmount` varchar(255) NOT NULL,
  `stockPrice` varchar(255) NOT NULL,
  `due` varchar(255) NOT NULL,
  `vat` varchar(255) NOT NULL,
  `total` varchar(255) NOT NULL,
  `stockQty` varchar(255) NOT NULL,
  `stockDescription` varchar(255) NOT NULL,
  `stockStatus` varchar(255) NOT NULL,
  `productId` int(11) NOT NULL,
  `suplierId` int(11) NOT NULL
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
  `userId` int(11) NOT NULL
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
(1, 'ASD', 'kandy', 'Active');

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
(257, 'cash', '1760', 0, '2024-12-20 13:53:03', '', 1760, 0, 374, 1),
(258, 'card', '11700', 0, '2024-12-20 13:55:24', '', 11700, 0, 375, 1),
(259, 'cash', '100', 0, '2024-12-20 14:13:26', '', 100, 0, 376, 1),
(263, 'cash', '120', 0, '2024-12-20 15:09:40', '', 120, 0, 380, 1),
(264, 'cash', '100', 0, '2024-12-20 15:11:43', '', 0, 0, 382, 1),
(265, 'cash', '100', 0, '2024-12-20 15:14:47', '', 100, 0, 383, 1),
(266, 'cash', '100', 0, '2024-12-20 15:19:02', '', 0, 0, 384, 1),
(267, 'cash', '120', 0, '2024-12-20 15:19:43', '', 0, 0, 385, 1),
(268, '', '220', 0, '2024-12-22 12:26:48', '', 0, 0, 386, 1),
(269, '', '120', 0, '2024-12-22 13:30:15', '', 0, 0, 387, 1),
(270, 'cash', '410', 0, '2024-12-22 14:13:41', '', 410, 0, 388, 1),
(271, 'cash', '220', 0, '2024-12-23 14:13:09', '', 220, 0, 389, 1),
(272, 'credit', '100', 0, '2024-12-24 18:45:27', '', 0, 100, 390, 1),
(273, 'card', '100', 0, '2024-12-24 19:05:08', '', 100, 0, 391, 1),
(274, 'cash', '100', 0, '2024-12-24 19:06:02', '', 100, 0, 392, 1),
(275, 'card', '100', 0, '2024-12-24 19:18:05', '', 100, 0, 393, 1);

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
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cusId`);

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
  ADD KEY `cusId` (`cusId`);

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
-- Indexes for table `stockpayment`
--
ALTER TABLE `stockpayment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `suplierId` (`suplierId`);

--
-- Indexes for table `stock_payments`
--
ALTER TABLE `stock_payments`
  ADD PRIMARY KEY (`stockPaymentId`),
  ADD KEY `stockId` (`stockId`),
  ADD KEY `userId` (`userId`);

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
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cusId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
  MODIFY `invoiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=394;

--
-- AUTO_INCREMENT for table `invoiceproduct`
--
ALTER TABLE `invoiceproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=308;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `returnitems`
--
ALTER TABLE `returnitems`
  MODIFY `returnItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `stockId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `stockhistory`
--
ALTER TABLE `stockhistory`
  MODIFY `stockHistoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stockpayment`
--
ALTER TABLE `stockpayment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_payments`
--
ALTER TABLE `stock_payments`
  MODIFY `stockPaymentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `storeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `transactionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=276;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chequdata`
--
ALTER TABLE `chequdata`
  ADD CONSTRAINT `chequdata_ibfk_1` FOREIGN KEY (`stockPaymentId`) REFERENCES `stockpayment` (`id`),
  ADD CONSTRAINT `chequdata_ibfk_2` FOREIGN KEY (`supplierId`) REFERENCES `supplier` (`supplierId`);

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `fk_Expenses_expensesCat1` FOREIGN KEY (`expensesCat_expensesCatId`) REFERENCES `expensescat` (`expensesCatId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Expenses_user1` FOREIGN KEY (`user_userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`cusId`) REFERENCES `customer` (`cusId`);

--
-- Constraints for table `invoiceproduct`
--
ALTER TABLE `invoiceproduct`
  ADD CONSTRAINT `invoiceproduct_ibfk_1` FOREIGN KEY (`invoiceId`) REFERENCES `invoice` (`invoiceId`),
  ADD CONSTRAINT `invoiceproduct_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`),
  ADD CONSTRAINT `invoiceproduct_ibfk_3` FOREIGN KEY (`stockId`) REFERENCES `stock` (`stockId`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_categoryId`) REFERENCES `category` (`categoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `returnitems`
--
ALTER TABLE `returnitems`
  ADD CONSTRAINT `fk_return_invoice1` FOREIGN KEY (`invoice_invoiceId`) REFERENCES `invoice` (`invoiceId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_return_products1` FOREIGN KEY (`products_productId`) REFERENCES `products` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_return_store1` FOREIGN KEY (`store_storeId`) REFERENCES `store` (`storeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_return_user1` FOREIGN KEY (`user_userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `fk_stock_category1` FOREIGN KEY (`category_categoryId`) REFERENCES `category` (`categoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_stock_products1` FOREIGN KEY (`products_productId`) REFERENCES `products` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_stock_store1` FOREIGN KEY (`store_storeId`) REFERENCES `store` (`storeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_stock_supplier1` FOREIGN KEY (`supplier_supplierId`) REFERENCES `supplier` (`supplierId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `stockhistory`
--
ALTER TABLE `stockhistory`
  ADD CONSTRAINT `fk_stockHistory_products1` FOREIGN KEY (`products_productId`) REFERENCES `products` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_stockHistory_stock1` FOREIGN KEY (`stock_stockId`) REFERENCES `stock` (`stockId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `stockpayment`
--
ALTER TABLE `stockpayment`
  ADD CONSTRAINT `stockpayment_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`),
  ADD CONSTRAINT `stockpayment_ibfk_2` FOREIGN KEY (`suplierId`) REFERENCES `supplier` (`supplierId`);

--
-- Constraints for table `stock_payments`
--
ALTER TABLE `stock_payments`
  ADD CONSTRAINT `stock_payments_ibfk_1` FOREIGN KEY (`stockId`) REFERENCES `stock` (`stockId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `stock_payments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `fk_transaction_invoice1` FOREIGN KEY (`invoice_invoiceId`) REFERENCES `invoice` (`invoiceId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`user_userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_store1` FOREIGN KEY (`store_storeId`) REFERENCES `store` (`storeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
