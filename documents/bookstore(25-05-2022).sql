/*
 Navicat Premium Data Transfer

 Source Server         : Duchao
 Source Server Type    : MySQL
 Source Server Version : 100414
 Source Host           : localhost:3306
 Source Schema         : bookstore

 Target Server Type    : MySQL
 Target Server Version : 100414
 File Encoding         : 65001

 Date: 25/05/2022 02:39:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books`  (
  `bookId` int NOT NULL AUTO_INCREMENT,
  `bookName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `auth` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `tinyDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
  `language` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `year` int NULL DEFAULT NULL,
  `nxb` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `price` int NULL DEFAULT NULL,
  `quantity` int NULL DEFAULT NULL,
  `subCatId` int NULL DEFAULT NULL,
  `sale` float NULL DEFAULT 1,
  `coverImg` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `thumbnails` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `isDisable` tinyint NULL DEFAULT 0,
  `createAt` datetime NULL DEFAULT current_timestamp,
  `updateAt` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bookId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO `books` VALUES (1, 'Sống Mòn', 'Nam Cao', 'Một bản thảo được nhà văn Nam Cao hoàn thành từ trước Cách mạng nhưng phải đợi tới sau ngày hòa bình lập lại ở miền Bắc cuốn tiểu thuyết mới được ra mắt.', 'Mặc dù bản thảo Sống mòn đã được nhà văn Nam Cao hoàn thành từ trước Cách Mạng nhưng phải đợi tới sau ngày hòa bình lập lại ở miền Bắc cuốn tiểu thuyết mới lần đầu ra mắt độc giả.\r\n\r\nCó lẽ là vì thế, vì được xuất bản khi thời đại đã chuyển nên Sống mòn như bị lỡ mất nhịp, không làm thành một sự kiện lớn trong dư luận văn học hồi bấy giờ. Rồi liên tiếp sau đó là những biến động lớn lao và không ngừng cho tới tận năm 1975 của đất nước khiến cuốn tiểu thuyết có chiều nội tâm quá sâu và quá nặng ưu tư ấy vốn đã không thể có đông người đọc càng ít người đọc hơn, vốn đã quá kín đáo và kín tiếng lại càng bị chìm tiếng đi giữa một thời đại văn học bừng bừng hào khí và đầy những tiếng động vang dội.\r\n\r\nNgày nay, Sống mòn đã được nhắc tới nhiều hơn, nhưng vẫn có vẻ là được nhắc tới một cách lớt phớt. Dường như chính tầm cỡ những truyện ngắn của Nam Cao đã tạo nên một định kiến rằng Nam Cao là tác gia truyện ngắn, sự nghiệp để đời bằng truyện ngắn, chỉ truyện ngắn.', 'Tiếng Việt', 2016, 'NXB Văn Học', 69000, 300, 1, 0.78, NULL, 'songmon_thumb1.jpg', 0, '2022-05-24 10:31:35', '2022-05-24 10:33:56');
INSERT INTO `books` VALUES (2, 'Mắt Biếc (Tái Bản 2019)', 'Nguyễn Nhật Ánh', 'Mắt Biếc (Tái Bản 2019)', 'Mắt biếc là một tác phẩm được nhiều người bình chọn là hay nhất của nhà văn Nguyễn Nhật Ánh. Tác phẩm này cũng đã được dịch giả Kato Sakae dịch sang tiếng Nhật để giới thiệu với độc giả Nhật Bản.\r\n\r\n“Tôi gửi tình yêu cho mùa hè, nhưng mùa hè không giữ nổi. Mùa hè chỉ biết ra hoa, phượng đỏ sân trường và tiếng ve nỉ non trong lá. Mùa hè ngây ngô, giống như tôi vậy. Nó chẳng làm được những điều tôi ký thác. Nó để Hà Lan đốt tôi, đốt rụi. Trái tim tôi cháy thành tro, rơi vãi trên đường về.”\r\n\r\n… Bởi sự trong sáng của một tình cảm, bởi cái kết thúc buồn, rất buồn khi xuyên suốt câu chuyện vẫn là những điều vui, buồn lẫn lộn… ', 'Tiếng Việt', 2019, 'NXB Trẻ', 110000, 300, 1, 0.85, NULL, 'matbiet_thumb1.jpg', 0, '2022-05-25 01:27:55', '2022-05-25 01:27:55');
INSERT INTO `books` VALUES (3, 'Hạ Đỏ (Tái Bản 2018)', 'Nguyễn Nhật Ánh', 'Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái', 'Kể về mối tình đầu trong sáng của một cậu học trò dành cho một cô gái quê 16 tuổi trong dịp về quê nghỉ hè, và những việc làm cao đẹp của cậu cho em bé quê chân chất chịu nhiều thiệt thòi ở nông thôn. Chuyện nhiều hình ảnh, dễ thương và trong sáng… vẫn không thiếu những “pha” thú vị cho ta những tiếng cười sảng khoái.', 'Tiếng Việt', 2018, 'NXB Trẻ', 60000, 300, 1, 0.82, NULL, 'hado_thumb1.jpg', 0, '2022-05-25 01:32:20', '2022-05-25 02:00:20');
INSERT INTO `books` VALUES (4, 'Ngày Xưa Có Một Chuyện Tình (Tái Bản 2019)', 'Nguyễn Nhật Ánh', 'NGÀY XƯA CÓ MỘT CHUYỆN TÌNH là tác phẩm mới tinh thứ 2 trong năm 2016 của nhà văn Nguyễn Nhật Ánh', 'NGÀY XƯA CÓ MỘT CHUYỆN TÌNH là tác phẩm mới tinh thứ 2 trong năm 2016 của nhà văn Nguyễn Nhật Ánh dài hơn 300 trang, được coi là tập tiếp theo của tập truyện Mắt biếc. Có một tình yêu dữ dội, với em,  của một người yêu em hơn chính bản thân mình - là anh.\r\n\r\nNgày xưa có một chuyện tình có phải là một câu chuyện cảm động  khi người ta yêu nhau, nỗi khát khao một hạnh phúc êm đềm ấm áp đến thế; hay đơn giản chỉ là chuyện ba người - anh, em, và người ấy…?\r\n\r\nBạn hãy mở sách ra, để chứng kiến làn gió tình yêu chảy qua như rải nắng trên khuôn mặt mùa đông của cô gái; nụ hôn đầu tiên ngọt mật, cái ôm đầu tiên, những giọt nước mắt và cái ôm xiết cuối cùng… rồi sẽ tìm thấy câu trả lời, cho riêng mình.', 'Tiếng Việt', 2019, 'NXB Trẻ', 125000, 300, 1, 0.85, NULL, 'ngayxuacomotchuyentinh_thumb1.jpg', 0, '2022-05-25 01:35:42', '2022-05-25 01:35:42');
INSERT INTO `books` VALUES (5, 'Chuyện Cổ Tích Dành Cho Người Lớn (Tái Bản 2018)', 'Nguyễn Nhật Ánh', 'Một bộ sưu tập truyện cười', '\r\n“Chuyện cổ tích dành cho người lớn” của tác giả Nguyễn Nhật Ánh là một đầu sách nổi bật giữa các đầu sách nổi tiếng của ông, không viết về trẻ thơ, về tình yêu của các cô cậu học trò, hay các anh chị đôi mươi mới lớn, mà viết về những phút giây đời thường của những con người “lớn” khi đã kết hôn, …. Là những tập truyện ngắn hài hước, nhưng sâu trong đó cũng có nhỏ nhẹ những triết lí đạo làm vợ chồng, … Từng mẩu chuyện nhỏ, đọc nó lên ta cảm nhận được hơi ấm tình người, những trò đùa vặt, giận dỗi hờn ghen trong đó làm cho con người ta thích thú. Các tình huống được dựng lên một cách rất đời thường, dưới ngòi bút tài ba, kì cựu của tác giả Nguyễn Nhật Ánh, mọi thứ dù yêu hay ghét đều hiện lên rất chân thực.  ', 'Tiếng Việt', 2018, 'NXB Trẻ', 52000, 300, 1, 0.84, NULL, 'chuyencotichchonguoilon_thumb1.jpg', 0, '2022-05-25 01:39:06', '2022-05-25 01:39:06');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `catId` int NOT NULL AUTO_INCREMENT,
  `catName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `thumbnails` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `isDisable` tinyint NULL DEFAULT 0,
  `createAt` datetime NULL DEFAULT current_timestamp,
  `updateAt` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`catId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, 'Văn học', NULL, 0, '2022-05-24 10:30:52', '2022-05-24 10:30:52');

-- ----------------------------
-- Table structure for favoritelist
-- ----------------------------
DROP TABLE IF EXISTS `favoritelist`;
CREATE TABLE `favoritelist`  (
  `bookId` int NOT NULL,
  `userId` int NOT NULL,
  `createAt` datetime NULL DEFAULT current_timestamp,
  `updateAt` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bookId`, `userId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of favoritelist
-- ----------------------------
INSERT INTO `favoritelist` VALUES (1, 14, '2022-05-25 01:23:58', '2022-05-25 01:23:58');
INSERT INTO `favoritelist` VALUES (1, 15, '2022-05-25 01:16:26', '2022-05-25 01:16:26');

-- ----------------------------
-- Table structure for orderdetails
-- ----------------------------
DROP TABLE IF EXISTS `orderdetails`;
CREATE TABLE `orderdetails`  (
  `orderId` int NOT NULL,
  `bookId` int NOT NULL,
  `price` int NULL DEFAULT NULL,
  `number` int NULL DEFAULT NULL,
  `createAt` datetime NULL DEFAULT current_timestamp,
  `updateAt` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderId`, `bookId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of orderdetails
-- ----------------------------

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fullName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `status` int NULL DEFAULT 0,
  `createAt` datetime NULL DEFAULT current_timestamp,
  `updateAt` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for rating
-- ----------------------------
DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating`  (
  `rateId` int NOT NULL AUTO_INCREMENT,
  `bookId` int NULL DEFAULT NULL,
  `userId` int NULL DEFAULT NULL,
  `rate` float NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
  `createAt` datetime NULL DEFAULT current_timestamp,
  `updateAt` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rateId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of rating
-- ----------------------------
INSERT INTO `rating` VALUES (12, 1, 14, 5, 'Tác phẩm này Nam Cao viết năm 1944 trước CMT8, ở đoạn cuối ông hi vọng cuộc cách mạng này sẽ thay đổi mọi thứ, đem lại cuộc sống mới cho tất cả mọi người, đặc biệt là lớp trí thức trẻ như San, Thứ. Nhưng đối chiếu đời sống trong tác phẩm với thực tế cuộc sống hiện nay vẫn giống như thế. Bởi tình trạng cử nhân, kỹ sư thậm chí thạc sỹ ra trường thất nghiệp, đi làm trái nghề, làm lao động phổ thông trong các nhà máy, công ty rất nhiều. Họ phải giấu bằng đại học đi để xin việc bằng tấm bằng THPT và sống bằng đồng lương nhỏ bé, chỉ đủ nuôi thân, không nuôi nổi vợ con, không trả nổi những khoản vay nợ để đi học.', '2022-05-24 22:09:27', '2022-05-25 00:51:29');
INSERT INTO `rating` VALUES (13, 1, 15, 4, 'Thứ tôi có thể cho em trong cuộc đời này chỉ là danh dự trong sạch và một tương lai tươi đẹp mà thôi. Thế nhưng, nếu chúng ta có kiếp sau, nếu kiếp sau tôi có đôi mắt sáng, tôi sẽ ở bến xe này… đợi em đây là đoạn trích đã đưa mình đến với câu chuyện Bến', '2022-05-24 23:58:11', '2022-05-25 00:46:07');

-- ----------------------------
-- Table structure for subcategories
-- ----------------------------
DROP TABLE IF EXISTS `subcategories`;
CREATE TABLE `subcategories`  (
  `subCatId` int NOT NULL AUTO_INCREMENT,
  `subCatName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `catId` int NULL DEFAULT NULL,
  `isDisable` tinyint NULL DEFAULT 0,
  `createAt` datetime NULL DEFAULT current_timestamp,
  `updateAt` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`subCatId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of subcategories
-- ----------------------------
INSERT INTO `subcategories` VALUES (1, 'Tiểu thuyết', 1, 0, '2022-05-24 10:31:13', '2022-05-24 10:31:13');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `userId` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `role` tinyint NULL DEFAULT 1,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `createAt` datetime NULL DEFAULT current_timestamp,
  `updateAt` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (14, 'Đức Hảo', '0799792465', '$2a$10$ylokb557wCu4gJiZpT6bRuj.43bJpcjPfL3PwspzfzPc1AWQ5A58e', 1, 'Trảng Bom, Đồng Nai', '2022-05-24 12:02:31', '2022-05-24 13:14:13');
INSERT INTO `users` VALUES (15, 'Nguyễn Đức Hảo', '01219792465', '$2a$10$L8XGz8qA.izjXCg8dg7bru4Tab4HGgzm/FTsJLgZIIcCXN9TuiTde', 1, 'Thủ Đức, TP.HCM', '2022-05-24 19:16:49', '2022-05-24 19:16:49');

SET FOREIGN_KEY_CHECKS = 1;
