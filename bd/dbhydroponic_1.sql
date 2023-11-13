-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-02-2023 a las 01:24:57
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbhydroponic`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actbombnft`
--

CREATE TABLE `actbombnft` (
  `id` int(11) NOT NULL,
  `value` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `actbombnft`
--

INSERT INTO `actbombnft` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(1, 'ON', '2022-07-29', '12:59:43', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actbombpostseedling`
--

CREATE TABLE `actbombpostseedling` (
  `id` int(11) NOT NULL,
  `value` varchar(10) NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `actbombpostseedling`
--

INSERT INTO `actbombpostseedling` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(20, 'OFF', '2022-06-08', '22:18:46', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actsolenoidvalvenft`
--

CREATE TABLE `actsolenoidvalvenft` (
  `id` int(11) NOT NULL,
  `value` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `actsolenoidvalvenft`
--

INSERT INTO `actsolenoidvalvenft` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(1, 'OFF', '2022-07-29', '17:07:14', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `airhr`
--

CREATE TABLE `airhr` (
  `id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `airhr`
--

INSERT INTO `airhr` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(42, 75, '2022-05-07', '22:58:38', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `airtemp`
--

CREATE TABLE `airtemp` (
  `id` int(11) NOT NULL,
  `value` float NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `airtemp`
--

INSERT INTO `airtemp` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(39, 30.5, '2022-05-15', '18:23:33', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buoy`
--

CREATE TABLE `buoy` (
  `id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `buoy`
--

INSERT INTO `buoy` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(1, 1, '2022-04-02', '15:00:28', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cultivation`
--

CREATE TABLE `cultivation` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date_inicio` date NOT NULL,
  `date_germination` date NOT NULL,
  `date_mediumdose` date NOT NULL,
  `date_fulldose` date NOT NULL,
  `date_firsttransplant` date NOT NULL,
  `date_finaltransplant` date NOT NULL,
  `date_harvest` date NOT NULL,
  `quantity` int(11) NOT NULL,
  `observation` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `module_id` int(11) DEFAULT NULL,
  `plant_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cultivation`
--

INSERT INTO `cultivation` (`id`, `name`, `date_inicio`, `date_germination`, `date_mediumdose`, `date_fulldose`, `date_firsttransplant`, `date_finaltransplant`, `date_harvest`, `quantity`, `observation`, `created_at`, `module_id`, `plant_id`, `user_id`) VALUES
(0, 'apio', '2022-10-05', '2022-10-18', '2022-10-19', '2022-10-20', '2022-10-21', '2022-10-22', '2022-10-23', 75, 'ejemplo', '2022-10-17 21:42:17', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ec`
--

CREATE TABLE `ec` (
  `id` int(11) NOT NULL,
  `value` float NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ec`
--

INSERT INTO `ec` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(29, 2.3, '2022-05-11', '09:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `module`
--

CREATE TABLE `module` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `capacity` int(11) NOT NULL,
  `observation` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `module`
--

INSERT INTO `module` (`id`, `name`, `capacity`, `observation`, `created_at`) VALUES
(1, 'modulo h1', 75, 'modulo operativo.', '2022-04-22 05:01:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ph`
--

CREATE TABLE `ph` (
  `id` int(11) NOT NULL,
  `value` float NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ph`
--

INSERT INTO `ph` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(25, 6.2, '2022-05-11', '09:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plant`
--

CREATE TABLE `plant` (
  `id` int(11) NOT NULL,
  `name_common` varchar(100) NOT NULL,
  `name_scientific` varchar(100) NOT NULL,
  `epoch_seeding` varchar(100) NOT NULL,
  `period_harvest` varchar(100) NOT NULL,
  `percentage_germination` int(11) NOT NULL,
  `purity` float NOT NULL,
  `profundity` float NOT NULL,
  `distance_line` float NOT NULL,
  `distance_seed` float NOT NULL,
  `net_weight` float NOT NULL,
  `date_packing` date NOT NULL,
  `date_expiration` date NOT NULL,
  `lot` varchar(100) NOT NULL,
  `observation` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `plant`
--

INSERT INTO `plant` (`id`, `name_common`, `name_scientific`, `epoch_seeding`, `period_harvest`, `percentage_germination`, `purity`, `profundity`, `distance_line`, `distance_seed`, `net_weight`, `date_packing`, `date_expiration`, `lot`, `observation`, `created_at`) VALUES
(1, 'lechuga ariana', 'lettuce ariana', 'otoño - invierno', '60 a 80 días despues de siembra', 100, 100, 0.5, 5, 1, 35.33, '2021-10-15', '2022-10-15', '0087491939031030', 'ninguna.', '2022-04-21 13:28:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seedlinghumidity`
--

CREATE TABLE `seedlinghumidity` (
  `id` int(11) NOT NULL,
  `value` float NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `seedlinghumidity`
--

INSERT INTO `seedlinghumidity` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(26, 98, '2022-05-11', '09:30:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('oAEy3iY93s1B1nGr0TkDZmH8ABguxk2M', 1673065351, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `statenftbomb`
--

CREATE TABLE `statenftbomb` (
  `id` int(11) NOT NULL,
  `value` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `statenftbomb`
--

INSERT INTO `statenftbomb` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(1, 'ON', '2022-07-29', '12:59:35', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `statenftsensor`
--

CREATE TABLE `statenftsensor` (
  `id` int(11) NOT NULL,
  `value` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `statenftsensor`
--

INSERT INTO `statenftsensor` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(1, 'OFF', '2022-07-29', '16:27:53', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `statenftsensorconsultation`
--

CREATE TABLE `statenftsensorconsultation` (
  `id` int(11) NOT NULL,
  `value` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `statenftsensorconsultation`
--

INSERT INTO `statenftsensorconsultation` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(1, 'ON', '2022-07-30', '17:41:44', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `statenftwaterlevel`
--

CREATE TABLE `statenftwaterlevel` (
  `id` int(11) NOT NULL,
  `value` varchar(10) NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `statenftwaterlevel`
--

INSERT INTO `statenftwaterlevel` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(1, 'ON', '2022-08-26', '23:55:06', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `statepostseedling`
--

CREATE TABLE `statepostseedling` (
  `id` int(11) NOT NULL,
  `value` varchar(10) NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `statepostseedling`
--

INSERT INTO `statepostseedling` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(13, 'ON', '2022-06-08', '22:19:02', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stateseedling`
--

CREATE TABLE `stateseedling` (
  `id` int(11) NOT NULL,
  `value` varchar(10) NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `stateseedling`
--

INSERT INTO `stateseedling` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(42, 'ON', '2022-06-08', '22:17:05', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `dni` int(8) NOT NULL,
  `date_birth` date NOT NULL,
  `sex` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `kind` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `lastname`, `dni`, `date_birth`, `sex`, `address`, `email`, `username`, `password`, `status`, `kind`, `created_at`) VALUES
(1, 'Yon', 'Cayllahua Utani', 46339972, '1990-05-25', 1, 'Distrito Chilca - Cañete - Lima', 'yoncayllahua092150@gmail.com', 'yoncayllahuautanihidroponia', '$2a$10$Sq6Fp7CmvMtXgh45Ijp9EOu9z4u1vTBCCNg8J7afK6X2xsF8U7fZ2', 1, 1, '2022-04-21 12:18:39'),
(2, 'Elizabeth', 'Palomino Cruz', 46697627, '1992-01-06', 0, 'Distrito Chilca - Cañete - Lima', 'elizabethpalomino@gmail.com', 'elizabeth', '$2a$10$7sXU4lqkI5j9R5kvzPu5vu2i7ogNA/UGHztEkYUde0WCMySXNplJG', 1, 1, '2022-04-21 12:35:15'),
(3, 'yoel', 'cayllahua', 46345678, '1990-08-18', 1, 'Apurimac', 'yoel@gmail.com', 'yoel', '$2a$10$qa5W/DvkHPW3Mkh5Dr/zqO5S8ERz1MtC/4pVZfxTkSdE.o3qY51Y.', 1, 0, '2023-06-30 16:43:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `waterconsumption`
--

CREATE TABLE `waterconsumption` (
  `id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `waterconsumption`
--

INSERT INTO `waterconsumption` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(3, 60, '2022-08-30', '13:39:09', 1),
(4, 25, '2022-08-30', '13:47:03', 1),
(5, 5, '2022-08-30', '13:50:33', 1),
(6, 15, '2022-08-30', '18:32:04', 1),
(7, 5, '2022-08-30', '18:36:36', 1),
(8, 4, '2022-09-01', '09:14:07', 1),
(9, 1, '2022-09-01', '09:15:28', 1),
(10, 7, '2022-09-09', '08:47:58', 1),
(11, 2, '2022-09-11', '07:44:32', 1),
(12, 8, '2022-09-14', '07:55:30', 1),
(13, 9, '2022-09-19', '07:50:09', 1),
(14, 3, '2022-09-24', '06:09:10', 1),
(15, 7, '2022-09-26', '17:38:52', 1),
(16, 1, '2022-09-26', '17:57:39', 1),
(17, 2, '2022-09-27', '11:45:40', 1),
(18, 2, '2022-09-27', '12:35:26', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `waterflow`
--

CREATE TABLE `waterflow` (
  `id` int(11) NOT NULL,
  `value` float NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `waterflow`
--

INSERT INTO `waterflow` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(85, 9.2, '2022-08-30', '13:45:28', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `watertemp`
--

CREATE TABLE `watertemp` (
  `id` int(11) NOT NULL,
  `value` float NOT NULL,
  `date_register` date NOT NULL,
  `hour` time NOT NULL,
  `module_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `watertemp`
--

INSERT INTO `watertemp` (`id`, `value`, `date_register`, `hour`, `module_id`) VALUES
(43, 16.3, '2022-08-12', '22:00:49', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actbombnft`
--
ALTER TABLE `actbombnft`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`) USING BTREE;

--
-- Indices de la tabla `actbombpostseedling`
--
ALTER TABLE `actbombpostseedling`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `actbombseedling`
--
ALTER TABLE `actbombseedling`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `actlighting`
--
ALTER TABLE `actlighting`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `actsolenoidvalvenft`
--
ALTER TABLE `actsolenoidvalvenft`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `airhr`
--
ALTER TABLE `airhr`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `airtemp`
--
ALTER TABLE `airtemp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `buoy`
--
ALTER TABLE `buoy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`) USING BTREE;

--
-- Indices de la tabla `cultivation`
--
ALTER TABLE `cultivation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`),
  ADD KEY `plant_id` (`plant_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `ec`
--
ALTER TABLE `ec`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ph`
--
ALTER TABLE `ph`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `plant`
--
ALTER TABLE `plant`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `seedlinghumidity`
--
ALTER TABLE `seedlinghumidity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `statenftbomb`
--
ALTER TABLE `statenftbomb`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`) USING BTREE;

--
-- Indices de la tabla `statenftsensor`
--
ALTER TABLE `statenftsensor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`) USING BTREE;

--
-- Indices de la tabla `statenftsensorconsultation`
--
ALTER TABLE `statenftsensorconsultation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`) USING BTREE;

--
-- Indices de la tabla `statenftwaterlevel`
--
ALTER TABLE `statenftwaterlevel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `statepostseedling`
--
ALTER TABLE `statepostseedling`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `stateseedling`
--
ALTER TABLE `stateseedling`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `waterconsumption`
--
ALTER TABLE `waterconsumption`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `waterflow`
--
ALTER TABLE `waterflow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indices de la tabla `watertemp`
--
ALTER TABLE `watertemp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actbombnft`
--
ALTER TABLE `actbombnft`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- AUTO_INCREMENT de la tabla `actbombpostseedling`
--
ALTER TABLE `actbombpostseedling`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT de la tabla `actbombseedling`
--
ALTER TABLE `actbombseedling`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT de la tabla `actlighting`
--
ALTER TABLE `actlighting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT de la tabla `actsolenoidvalvenft`
--
ALTER TABLE `actsolenoidvalvenft`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `airhr`
--
ALTER TABLE `airhr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1122;

--
-- AUTO_INCREMENT de la tabla `airtemp`
--
ALTER TABLE `airtemp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1118;

--
-- AUTO_INCREMENT de la tabla `buoy`
--
ALTER TABLE `buoy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `ec`
--
ALTER TABLE `ec`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1018;

--
-- AUTO_INCREMENT de la tabla `module`
--
ALTER TABLE `module`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ph`
--
ALTER TABLE `ph`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1067;

--
-- AUTO_INCREMENT de la tabla `plant`
--
ALTER TABLE `plant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `seedlinghumidity`
--
ALTER TABLE `seedlinghumidity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=702;

--
-- AUTO_INCREMENT de la tabla `statenftbomb`
--
ALTER TABLE `statenftbomb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `statenftsensor`
--
ALTER TABLE `statenftsensor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `statenftsensorconsultation`
--
ALTER TABLE `statenftsensorconsultation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT de la tabla `statenftwaterlevel`
--
ALTER TABLE `statenftwaterlevel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT de la tabla `statepostseedling`
--
ALTER TABLE `statepostseedling`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `stateseedling`
--
ALTER TABLE `stateseedling`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `waterconsumption`
--
ALTER TABLE `waterconsumption`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `waterflow`
--
ALTER TABLE `waterflow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de la tabla `watertemp`
--
ALTER TABLE `watertemp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1078;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actbombnft`
--
ALTER TABLE `actbombnft`
  ADD CONSTRAINT `actbombnft_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`);

--
-- Filtros para la tabla `actbombpostseedling`
--
ALTER TABLE `actbombpostseedling`
  ADD CONSTRAINT `actbombpostseedling_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`);

--
-- Filtros para la tabla `actbombseedling`
--
ALTER TABLE `actbombseedling`
  ADD CONSTRAINT `actbombseedling_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`);

--
-- Filtros para la tabla `actlighting`
--
ALTER TABLE `actlighting`
  ADD CONSTRAINT `actlighting_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`);

--
-- Filtros para la tabla `actsolenoidvalvenft`
--
ALTER TABLE `actsolenoidvalvenft`
  ADD CONSTRAINT `actsolenoidvalvenft_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`);

--
-- Filtros para la tabla `airhr`
--
ALTER TABLE `airhr`
  ADD CONSTRAINT `airhr_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `airtemp`
--
ALTER TABLE `airtemp`
  ADD CONSTRAINT `airtemp_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `buoy`
--
ALTER TABLE `buoy`
  ADD CONSTRAINT `buoy_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`);

--
-- Filtros para la tabla `cultivation`
--
ALTER TABLE `cultivation`
  ADD CONSTRAINT `cultivation_ibfk_1` FOREIGN KEY (`plant_id`) REFERENCES `plant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cultivation_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cultivation_ibfk_3` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ec`
--
ALTER TABLE `ec`
  ADD CONSTRAINT `ec_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ph`
--
ALTER TABLE `ph`
  ADD CONSTRAINT `ph_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `seedlinghumidity`
--
ALTER TABLE `seedlinghumidity`
  ADD CONSTRAINT `seedlinghumidity_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `statenftbomb`
--
ALTER TABLE `statenftbomb`
  ADD CONSTRAINT `statenftbomb_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`);

--
-- Filtros para la tabla `statenftsensor`
--
ALTER TABLE `statenftsensor`
  ADD CONSTRAINT `statenftsensor_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `statenftsensorconsultation`
--
ALTER TABLE `statenftsensorconsultation`
  ADD CONSTRAINT `statenftsensorconsultation_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`);

--
-- Filtros para la tabla `statenftwaterlevel`
--
ALTER TABLE `statenftwaterlevel`
  ADD CONSTRAINT `statenftwaterlevel_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`);

--
-- Filtros para la tabla `statepostseedling`
--
ALTER TABLE `statepostseedling`
  ADD CONSTRAINT `statepostseedling_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `stateseedling`
--
ALTER TABLE `stateseedling`
  ADD CONSTRAINT `stateseedling_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`);

--
-- Filtros para la tabla `waterconsumption`
--
ALTER TABLE `waterconsumption`
  ADD CONSTRAINT `waterconsumption_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`);

--
-- Filtros para la tabla `waterflow`
--
ALTER TABLE `waterflow`
  ADD CONSTRAINT `waterflow_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `watertemp`
--
ALTER TABLE `watertemp`
  ADD CONSTRAINT `watertemp_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
