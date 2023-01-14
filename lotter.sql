-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2023 at 05:57 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lottery`
--

-- --------------------------------------------------------

--
-- Table structure for table `finance`
--

CREATE TABLE `finance` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `date` text NOT NULL,
  `genre` text NOT NULL,
  `amount` int(11) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `finance`
--

INSERT INTO `finance` (`id`, `user_id`, `merchant_id`, `date`, `genre`, `amount`, `status`) VALUES
(62, 1, 6, '13/1/2566 23:51:00', 'ฝาก', 100000, 1),
(63, 1, 6, '14/1/2566 00:06:06', 'ฝาก', 100, 1),
(64, 23, 6, '14/1/2566 16:24:14', 'ฝาก', 100, 1),
(65, 23, 6, '14/1/2566 16:24:52', 'ถอน', 100, 1),
(66, 23, 6, '14/1/2566 16:31:36', 'ถอน', 100, 1),
(69, 1, 6, '14/1/2566 22:33:01', 'ฝาก', 200, 1),
(70, 1, 6, '14/1/2566 22:41:12', 'ฝาก', 150, 1);

-- --------------------------------------------------------

--
-- Table structure for table `merchant`
--

CREATE TABLE `merchant` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `t00` int(11) NOT NULL,
  `t01` int(11) NOT NULL,
  `t02` int(11) NOT NULL,
  `t03` int(11) NOT NULL,
  `t04` int(11) NOT NULL,
  `t05` int(11) NOT NULL,
  `t06` int(11) NOT NULL,
  `t07` int(11) NOT NULL,
  `t08` int(11) NOT NULL,
  `t09` int(11) NOT NULL,
  `t10` int(11) NOT NULL,
  `t11` int(11) NOT NULL,
  `t12` int(11) NOT NULL,
  `t13` int(11) NOT NULL,
  `t14` int(11) NOT NULL,
  `t15` int(11) NOT NULL,
  `t16` int(11) NOT NULL,
  `t17` int(11) NOT NULL,
  `t18` int(11) NOT NULL,
  `t19` int(11) NOT NULL,
  `t20` int(11) NOT NULL,
  `t21` int(11) NOT NULL,
  `t22` int(11) NOT NULL,
  `t23` int(11) NOT NULL,
  `t24` int(11) NOT NULL,
  `t25` int(11) NOT NULL,
  `t26` int(11) NOT NULL,
  `t27` int(11) NOT NULL,
  `t28` int(11) NOT NULL,
  `t29` int(11) NOT NULL,
  `t30` int(11) NOT NULL,
  `t31` int(11) NOT NULL,
  `t32` int(11) NOT NULL,
  `t33` int(11) NOT NULL,
  `t34` int(11) NOT NULL,
  `t35` int(11) NOT NULL,
  `t36` int(11) NOT NULL,
  `t37` int(11) NOT NULL,
  `t38` int(11) NOT NULL,
  `t39` int(11) NOT NULL,
  `t40` int(11) NOT NULL,
  `t41` int(11) NOT NULL,
  `t42` int(11) NOT NULL,
  `t43` int(11) NOT NULL,
  `t44` int(11) NOT NULL,
  `t45` int(11) NOT NULL,
  `t46` int(11) NOT NULL,
  `t47` int(11) NOT NULL,
  `t48` int(11) NOT NULL,
  `t49` int(11) NOT NULL,
  `t50` int(11) NOT NULL,
  `t51` int(11) NOT NULL,
  `t52` int(11) NOT NULL,
  `t53` int(11) NOT NULL,
  `t54` int(11) NOT NULL,
  `t55` int(11) NOT NULL,
  `t56` int(11) NOT NULL,
  `t57` int(11) NOT NULL,
  `t58` int(11) NOT NULL,
  `t59` int(11) NOT NULL,
  `t60` int(11) NOT NULL,
  `t61` int(11) NOT NULL,
  `t62` int(11) NOT NULL,
  `t63` int(11) NOT NULL,
  `t64` int(11) NOT NULL,
  `t65` int(11) NOT NULL,
  `t66` int(11) NOT NULL,
  `t67` int(11) NOT NULL,
  `t68` int(11) NOT NULL,
  `t69` int(11) NOT NULL,
  `t70` int(11) NOT NULL,
  `t71` int(11) NOT NULL,
  `t72` int(11) NOT NULL,
  `t73` int(11) NOT NULL,
  `t74` int(11) NOT NULL,
  `t75` int(11) NOT NULL,
  `t76` int(11) NOT NULL,
  `t77` int(11) NOT NULL,
  `t78` int(11) NOT NULL,
  `t79` int(11) NOT NULL,
  `t80` int(11) NOT NULL,
  `t81` int(11) NOT NULL,
  `t82` int(11) NOT NULL,
  `t83` int(11) NOT NULL,
  `t84` int(11) NOT NULL,
  `t85` int(11) NOT NULL,
  `t86` int(11) NOT NULL,
  `t87` int(11) NOT NULL,
  `t88` int(11) NOT NULL,
  `t89` int(11) NOT NULL,
  `t90` int(11) NOT NULL,
  `t91` int(11) NOT NULL,
  `t92` int(11) NOT NULL,
  `t93` int(11) NOT NULL,
  `t94` int(11) NOT NULL,
  `t95` int(11) NOT NULL,
  `t96` int(11) NOT NULL,
  `t97` int(11) NOT NULL,
  `t98` int(11) NOT NULL,
  `t99` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `merchant`
--

INSERT INTO `merchant` (`id`, `user_id`, `t00`, `t01`, `t02`, `t03`, `t04`, `t05`, `t06`, `t07`, `t08`, `t09`, `t10`, `t11`, `t12`, `t13`, `t14`, `t15`, `t16`, `t17`, `t18`, `t19`, `t20`, `t21`, `t22`, `t23`, `t24`, `t25`, `t26`, `t27`, `t28`, `t29`, `t30`, `t31`, `t32`, `t33`, `t34`, `t35`, `t36`, `t37`, `t38`, `t39`, `t40`, `t41`, `t42`, `t43`, `t44`, `t45`, `t46`, `t47`, `t48`, `t49`, `t50`, `t51`, `t52`, `t53`, `t54`, `t55`, `t56`, `t57`, `t58`, `t59`, `t60`, `t61`, `t62`, `t63`, `t64`, `t65`, `t66`, `t67`, `t68`, `t69`, `t70`, `t71`, `t72`, `t73`, `t74`, `t75`, `t76`, `t77`, `t78`, `t79`, `t80`, `t81`, `t82`, `t83`, `t84`, `t85`, `t86`, `t87`, `t88`, `t89`, `t90`, `t91`, `t92`, `t93`, `t94`, `t95`, `t96`, `t97`, `t98`, `t99`) VALUES
(1, 6, 100, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 100, 50, 20, 100, 100, 100, 100, 20, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0);

-- --------------------------------------------------------

--
-- Table structure for table `purchase`
--

CREATE TABLE `purchase` (
  `id` int(11) NOT NULL,
  `phone_number` text NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `ticket` text NOT NULL,
  `amount` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  `date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `purchase`
--

INSERT INTO `purchase` (`id`, `phone_number`, `merchant_id`, `ticket`, `amount`, `status`, `date`) VALUES
(14, '0987654321', 6, 't02', 100, 0, '13/1/2566 23:52:25'),
(15, '0987654321', 6, 't01', 100, 0, '14/1/2566 00:05:57'),
(16, '0001234567', 6, 't03', 50, 0, '14/1/2566 20:39:49'),
(17, '0001234567', 6, 't04', 100, 0, '14/1/2566 20:40:40'),
(18, '0001234567', 6, 't05', 100, 0, '14/1/2566 20:41:25'),
(19, '0001234567', 6, 't06', 100, 0, '14/1/2566 20:41:40'),
(20, '0987654321', 6, 't09', 20, 0, '14/1/2566 21:11:50'),
(21, '0987654321', 6, 't09', 60, 0, '14/1/2566 21:12:05'),
(22, '0987654321', 6, 't10', 100, 0, '14/1/2566 21:12:55'),
(23, '0987654321', 6, 't99', 100, 0, '14/1/2566 21:59:58'),
(24, '0987654321', 6, 't12', 50, 0, '14/1/2566 22:00:24'),
(25, '0935955152', 6, 't18', 40, 0, '14/1/2566 22:13:05'),
(26, '0935955152', 6, 't13', 80, 0, '14/1/2566 22:15:19'),
(27, '0987654321', 6, 't18', 40, 0, '14/1/2566 22:48:45');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `phone_number` text NOT NULL,
  `password` text NOT NULL,
  `name` text NOT NULL,
  `pre_name` text NOT NULL,
  `last_name` text NOT NULL,
  `ref` text NOT NULL,
  `total_ref` int(11) NOT NULL,
  `token` int(11) NOT NULL,
  `bank_name` text NOT NULL,
  `bank_number` text NOT NULL,
  `role` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `phone_number`, `password`, `name`, `pre_name`, `last_name`, `ref`, `total_ref`, `token`, `bank_name`, `bank_number`, `role`) VALUES
(1, '0987654321', '123456', 'เพลย์ทู', 'รัฐนนท์', 'บุญมาตา', '0935955152', 0, 99860, 'ไทยพาณิชย์', '88888888', 1),
(6, '0935955152', '1111', 'pzonenet', 'พิทักษ์', 'บุญมาตา', '5789', 25, 899040, 'ไทยพาณิชย์', '123456789', 1),
(7, '8984895649', '123456', 'testtest', '', '', '5555', 0, 0, '', '', 0),
(8, '84198541', '123456', 'dsgdsgsdg', '', '', 'sdfdsf', 0, 0, '', '', 0),
(9, '078945641', '123456', 'Rattanon Boonmata', '', '', 'GSDf5961591', 0, 0, '', '', 0),
(10, '0979525789', '1111', 'หนิง', '', '', '5789', 0, 0, '', '', 0),
(12, '0979525788', '1111', 'Aungkana', '', '', 'pzonenet88', 0, 0, '', '', 0),
(13, '0891234567', '1111', 'คนเก่งขั้นเทพ', '', '', '0935955152', 0, 0, '', '', 0),
(14, '0888888888', '123456', 'เทส', '', '', '0987545614', 0, 0, '', '', 0),
(15, '0991234567', '1111', 'โอเค', '', '', '0935955152', 0, 0, '', '', 0),
(16, 'test', '123456', 'test', '', '', '1654894', 0, 0, '', '', 0),
(17, 'sdfsdf', '1234456', 'asfasf', '', '', '1569189', 0, 0, '', '', 0),
(18, 'zxc', '123456', 'sad', '', '', '1985', 0, 0, '', '', 0),
(19, '0789456', '123456', 'ioo', '', '', '123456', 0, 0, '', '', 0),
(20, 'asewrt', '123456', 'weet', '', '', '123456', 0, 0, '', '', 0),
(21, '8854651', '123456', 'dsgkjw', '', '', '18452', 0, 0, '', '', 0),
(22, '49546541', '123456', 'jo', '', '', '123456', 0, 0, '', '', 0),
(23, '0001234567', '1111', 'เทพเทรด', '', '', '0935955152', 0, 800, '', '', 0),
(24, '', '', '', '', '', '', 0, 0, '', '', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `finance`
--
ALTER TABLE `finance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merchant`
--
ALTER TABLE `merchant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `finance`
--
ALTER TABLE `finance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `merchant`
--
ALTER TABLE `merchant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `purchase`
--
ALTER TABLE `purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
