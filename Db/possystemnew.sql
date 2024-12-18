-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2024 at 02:32 PM
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
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cusId` int(11) NOT NULL,
  `cusName` varchar(255) NOT NULL,
  `cusCode` varchar(255) NOT NULL,
  `cusAddress` varchar(255) NOT NULL,
  `cusPhone` varchar(255) NOT NULL,
  `cusJob` varchar(255) NOT NULL,
  `cusOffice` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cusId`, `cusName`, `cusCode`, `cusAddress`, `cusPhone`, `cusJob`, `cusOffice`) VALUES
(1, 'buddhika', 'cs01', 'kandy', '07523232', 'gg', 'delma'),
(2, 'kandy', 'cs02', 'kuliyapiya', '07523232', 'gg', 'dsawda');

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
  `image` varchar(255) DEFAULT NULL,
  `cusId` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`invoiceId`, `invoiceNo`, `invoiceDate`, `status`, `store`, `image`, `cusId`) VALUES
(355, '1500', '2024-12-18 13:29:34', 'Invoice', 'colkan', NULL, 1),
(356, '1501', '2024-12-18 13:30:12', 'Invoice', 'terra', NULL, 1);

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
(251, 355, '1500', 1, 1, '1', '100', 'invoice'),
(252, 356, '1501', 2, 3, '1', '120', 'invoice'),
(253, 356, '1501', 3, 4, '1', '100', 'invoice');

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
(3, 'product 3', 'p3', '10', NULL, 1002, 100, '10 Months', -902, NULL, '100', NULL, 'In stock', 2);

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
(1, 'stock1', '2024-10-16 17:09:18', NULL, 100, 1, 1, 100, 997, '2024-10-16', '2024-10-31', 500, NULL, 'note', '', 1, 1, 1, 1),
(3, 'stock 2', '2024-10-17 01:28:56', NULL, 100, 1, 1, 1, 2147483609, '2024-10-17', '2024-10-31', 500, 211, 'booo', '', 2, 1, 1, 1),
(4, '5', '2024-10-18 09:01:00', NULL, 10000, 0, 0, 0, 791103, '2024-10-18', '2024-10-17', 98, NULL, NULL, 'In stock', 3, 1, 1, 1),
(5, '1', '2024-12-19 07:42:00', 'http://localhost:5000/uploads/stock/1_1733663580933.png', 500, 0, 0, 0, 5, '2024-12-26', '2024-12-18', 120, NULL, '5', 'In stock', 3, 1, 1, 1),
(6, '5', '2024-12-10 07:09:00', 'http://localhost:5000/uploads/stock/5_1733747989746.png', 200, 0, 0, 0, 2, '2024-12-10', '2024-12-16', 112, 121, NULL, 'In stock', 1, 2, 1, 1),
(7, 'ww', '2024-12-10 07:14:00', NULL, 500, 0, 0, 0, 5, '2024-12-12', '2024-12-11', 122, NULL, NULL, 'In stock', 1, 1, 1, 1);

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
(4, 5, 7, 1);

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
(241, 'cash', '100', 0, '2024-12-18 13:29:34', '', 100, 0, 355, 1),
(242, 'cash', '220', 0, '2024-12-18 13:30:13', '', 220, 0, 356, 1);

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
(4, 'Mr.', 'master', 'master', '$2b$10$YOYbjZyy3L4nBG/QLXHT5OZGqyFj80naF.fLxwH7nXRPHld6CjdCC', 'Admin', 'master@gmail.com', '123456729V', '12334567890', '1234567890', 'xxx', NULL, 'Active', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

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
  MODIFY `cusId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `invoiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=357;

--
-- AUTO_INCREMENT for table `invoiceproduct`
--
ALTER TABLE `invoiceproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `returnitems`
--
ALTER TABLE `returnitems`
  MODIFY `returnItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `stockId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `stockhistory`
--
ALTER TABLE `stockhistory`
  MODIFY `stockHistoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `transactionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

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
