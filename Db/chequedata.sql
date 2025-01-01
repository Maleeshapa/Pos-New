/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80039 (8.0.39)
 Source Host           : localhost:3306
 Source Schema         : possystemnew

 Target Server Type    : MySQL
 Target Server Version : 80039 (8.0.39)
 File Encoding         : 65001

 Date: 01/01/2025 12:48:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chequedata
-- ----------------------------
DROP TABLE IF EXISTS `chequedata`;
CREATE TABLE `chequedata`  (
  `chequeId` int NOT NULL AUTO_INCREMENT,
  `chequeNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `chequeAmount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `chequeDate` date NOT NULL,
  `chequeStatus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `supplierId` int NOT NULL,
  `stockPaymentId` int NOT NULL,
  PRIMARY KEY (`chequeId`) USING BTREE,
  INDEX `supplierId`(`supplierId` ASC) USING BTREE,
  INDEX `stockPaymentId`(`stockPaymentId` ASC) USING BTREE,
  CONSTRAINT `chequedata_ibfk_1` FOREIGN KEY (`stockPaymentId`) REFERENCES `stockpayments` (`stockPaymentId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chequedata
-- ----------------------------
INSERT INTO `chequedata` VALUES (1, 'CHK001', '5000', '2025-01-01', 'Pending', 1, 1);
INSERT INTO `chequedata` VALUES (2, 'CHK002', '8000', '2025-01-02', 'Pending', 1, 1);
INSERT INTO `chequedata` VALUES (3, 'ch', '220', '2025-01-03', 'Pending', 1, 9);

SET FOREIGN_KEY_CHECKS = 1;
