-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2025 at 03:03 PM
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
  `cusId` int(255) NOT NULL,
  `invoiceTime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`invoiceId`, `invoiceNo`, `invoiceDate`, `status`, `store`, `purchaseNo`, `image`, `cusId`, `invoiceTime`) VALUES
(447, '1500', '2025-01-02 13:48:23', 'Invoice', 'terra', 'purchaseNo', 'http://localhost:5000/uploads/invoice/INV_1735825703641.pdf', 6, 1),
(448, '1501', '2025-01-02 13:56:36', 'delivery', 'haman', 'purchase 4', NULL, 5, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoiceId`),
  ADD UNIQUE KEY `purchaseNo` (`purchaseNo`),
  ADD KEY `invoice_ibfk_1` (`cusId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=449;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
