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

 Date: 01/01/2025 10:13:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock`  (
  `stockId` int NOT NULL AUTO_INCREMENT,
  `stockName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `stockPrice` float NOT NULL,
  `stockQty` int NOT NULL,
  `mfd` date NULL DEFAULT NULL,
  `exp` date NULL DEFAULT NULL,
  `stockDescription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `stockStatus` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `products_productId` int NOT NULL,
  `supplier_supplierId` int NOT NULL,
  `store_storeId` int NOT NULL,
  `category_categoryId` int NOT NULL,
  PRIMARY KEY (`stockId`) USING BTREE,
  INDEX `fk_stock_products1_idx`(`products_productId` ASC) USING BTREE,
  INDEX `fk_stock_supplier1_idx`(`supplier_supplierId` ASC) USING BTREE,
  INDEX `fk_stock_store1_idx`(`store_storeId` ASC) USING BTREE,
  INDEX `fk_stock_category1_idx`(`category_categoryId` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stock
-- ----------------------------
INSERT INTO `stock` VALUES (1, 'stock1', 100, 2147483646, '2024-10-16', '2024-10-31', 'note', '', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (3, 'stock 2', 100, 996540531, '2024-10-17', '2024-10-31', 'booo', '', 2, 1, 1, 1);
INSERT INTO `stock` VALUES (4, '5', 10000, 2147483582, '2024-10-18', '2024-10-17', NULL, 'In stock', 3, 1, 1, 1);
INSERT INTO `stock` VALUES (5, '1', 500, 5, '2024-12-26', '2024-12-18', '5', 'In stock', 3, 1, 1, 1);
INSERT INTO `stock` VALUES (6, '5', 200, 2, '2024-12-10', '2024-12-16', NULL, 'In stock', 1, 2, 1, 1);
INSERT INTO `stock` VALUES (7, 'ww', 500, 5, '2024-12-12', '2024-12-11', NULL, 'In stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (8, 'stock 6', 500, 5, '2024-12-18', '2024-12-19', NULL, 'In stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (9, '12', 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (10, '12', 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1);
INSERT INTO `stock` VALUES (11, '12', 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (12, '12', 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1);
INSERT INTO `stock` VALUES (13, '12', 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (14, '12', 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1);
INSERT INTO `stock` VALUES (15, '12', 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (16, '12', 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1);
INSERT INTO `stock` VALUES (17, '12', 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (18, '12', 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1);
INSERT INTO `stock` VALUES (19, '12', 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (20, '12', 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1);
INSERT INTO `stock` VALUES (21, '12', 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (22, '12', 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1);
INSERT INTO `stock` VALUES (23, '12', 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (24, '12', 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1);
INSERT INTO `stock` VALUES (25, '12', 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (26, '12', 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1);
INSERT INTO `stock` VALUES (27, '12', 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (28, '12', 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1);
INSERT INTO `stock` VALUES (29, '12', 100, 5, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (30, '12', 120, 5, NULL, NULL, 'ss', 'In Stock', 2, 1, 2, 1);
INSERT INTO `stock` VALUES (31, '12', 100, 1, NULL, NULL, 'ss', 'In Stock', 1, 1, 1, 1);
INSERT INTO `stock` VALUES (32, '12', 120, 1, NULL, NULL, 'ss', 'In Stock', 2, 1, 1, 1);
INSERT INTO `stock` VALUES (33, 'new', 100, 5, NULL, NULL, '', 'In Stock', 1, 1, 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
