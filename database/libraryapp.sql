-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 03 Jul 2020 pada 14.52
-- Versi server: 10.4.13-MariaDB
-- Versi PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `libraryapp`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `author`
--

CREATE TABLE `author` (
  `author_id` int(11) NOT NULL,
  `author_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `author`
--

INSERT INTO `author` (`author_id`, `author_name`) VALUES
(1, 'J. K. Rowling'),
(2, 'Agatha Christie'),
(5, 'Stan Lee'),
(6, 'Samira Ahmed'),
(7, 'Mikel Jollett'),
(8, 'John Moe'),
(9, 'François S. Clemmons'),
(10, 'Eiichiro Oda'),
(11, 'Sarah Morgenthaler');

-- --------------------------------------------------------

--
-- Struktur dari tabel `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `genre_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `book`
--

INSERT INTO `book` (`id`, `title`, `description`, `image`, `genre_id`, `author_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Harry Potter And The Deathly Hallows', 'Harry Potter, together with his teenage companions and the members of the Order of the Phoenix, enter the final struggle with Voldemort and his Death Eaters, without the guidance of Dumbledore. They seek to uncover and destroy Voldemort\'s horcruxes and the secrets of the Deathly Hallows.', 'deathly-hallows-1591969128434.jpg', 1, 1, 'Available', '2020-06-17 13:12:27', '2020-06-09 11:50:12'),
(3, 'Murder on the Orient Express', 'A murder is discovered, and Poirot\'s trip home to London from the Middle East is interrupted to solve the murder. The US title of Murder in the Calais Coach was used to avoid confusion with the 1932 Graham Greene novel Stamboul Train, which had been published in the United States as Orient Express.', 'murder-on-the-orient-express-1592481208310.jpg', 4, 2, 'Available', '2020-07-02 04:59:39', '2020-06-09 18:11:35'),
(6, 'Harry Potter and the Prisoner of Azkaban', 'A convicted murderer, Sirius Black, has broken out of Azkaban prison, and it seems he\'s after Harry. Now Hogwarts is being patrolled by the dementors, the Azkaban guards who are hunting Sirius. But Harry can\'t imagine that Sirius or, for that matter, the evil Lord Voldemort could be more frightening than the dem.', 'prisoner-of-azkaban-1591969244628.jpg', 1, 1, 'Not Available', '2020-06-12 13:40:44', '2020-06-10 10:31:27'),
(7, 'The Murder of Roger Ackroyd', 'It is the third novel to feature Hercule Poirot as the lead detective. Poirot retires to a village near the home of a friend, Roger Ackroyd, to pursue a project to perfect vegetable marrows. Soon after, Ackroyd is murdered and Poirot must come out of retirement to solve the case.', 'murder-of-roger-ackroyd-1591969354426.jpg', 5, 2, 'Not Available', '2020-06-12 13:42:34', '2020-06-10 10:34:04'),
(8, 'Captain Marvel', 'The first Captain Marvel printed by Marvel Comics was created by Stan Lee and Gene Colan. This character is an alien military officer, Captain Mar-Vell of the Kree Imperial Militia, who is sent to observe the planet Earth as it is developing technology to travel into space.', 'captain-marvel-1591969414599.jpg', 14, 5, 'Available', '2020-06-12 13:43:34', '2020-06-10 10:40:32'),
(9, 'Iron Man', 'Iron Man is a fictional superhero appearing in American comic books published by Marvel Comics. ... Later, Stark develops his suit, adding weapons and other technological devices he designed through his company, Stark Industries. He uses the suit and successive versions to protect the world as Iron Man.', 'iron-man-1591969034879.jpg', 14, 5, 'Available', '2020-06-18 06:19:17', '2020-06-10 10:45:35'),
(12, 'Mad, Bad & Dangerous to Know', 'Told in alternating narratives that bridge centuries, the latest novel from New York Times bestselling author Samira Ahmed traces the lives of two young women fighting to write their own stories and escape the pressure of familial burdens and cultural expectations in worlds too long defined by men.\n', 'mad-bad-dangerous-to-know-1591969493913.jpg', 9, 6, 'Not Available', '2020-07-01 20:52:34', '2020-06-11 07:22:09'),
(14, 'The Hilarious World of Depression', 'For years John Moe, critically-acclaimed public radio personality and host of The Hilarious World of Depression podcast, struggled with depression; it plagued his family and claimed the life of his brother in 2007. As Moe came to terms with his own illness, he began to see similar patterns of behavior and coping mechanisms surfacing in conversations with others, including high-profile comedians who\'d struggled with the disease. Moe saw that there was tremendous comfort and community in open dialogue about these shared experiences and that humor had a unique power. Thus was born the podcast The Hilarious World of Depression.', 'the-hillarious-world-of-depression-1591969546325.jpg', 25, 8, 'Available', '2020-07-01 20:55:31', '2020-06-11 08:35:38'),
(15, 'Officer Clemmons', 'Details the incredible life story of François Clemmons, beginning with his early years in Alabama and Ohio, marked by family trauma and loss, through his studies as a music major at Oberlin College, where Clemmons began to investigate and embrace his homosexuality, to a chance encounter with Fred Rogers which changed the whole course of both men’s lives, leading to a deep, spiritual friendship and mentorship spanning nearly forty years.', 'officer-clemmons-1591969587084.jpg', 25, 9, 'Not Available', '2020-07-02 03:36:43', '2020-06-11 08:42:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `genre`
--

CREATE TABLE `genre` (
  `genre_id` int(11) NOT NULL,
  `genre_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `genre`
--

INSERT INTO `genre` (`genre_id`, `genre_name`) VALUES
(1, 'Fantasy'),
(2, ' Poetry'),
(3, 'Humor'),
(4, 'Fiction'),
(5, 'Mystery'),
(6, 'Science-Fiction'),
(7, 'Horror'),
(8, 'Romance'),
(9, 'Art'),
(10, 'Classics'),
(11, 'Sports'),
(14, 'Comics'),
(25, 'Biography'),
(26, 'Manga'),
(28, 'Thriller'),
(29, 'Travel');

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `roles_id` int(11) NOT NULL,
  `roles_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`roles_id`, `roles_name`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'staff');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `roles_id`, `created_at`, `updated_at`) VALUES
(1, 'dimasdoms', '$2b$10$PZnJy9ldcL9ZpM1UtrY6oe8G1uFW.gudF8ifS52LnDfFYtaxEyU0C', 1, '2020-06-13 10:13:03', '2020-06-13 10:13:03'),
(10, 'tonystark', '$2b$10$WENlAC9pYcGdhsUrp.V4f.cl9dYhFsSq6QQsu//naBTaKLYewl2Xm', 3, '2020-06-16 07:47:00', '2020-06-16 07:47:00'),
(11, 'barrackobama', '$2b$10$yi1M9W7ghdmb.lKtoRN8NOSE6jWf/55GpgBqUKE/U5em4jsl8NPFK', 2, '2020-06-16 09:49:53', '2020-06-16 09:49:53'),
(12, 'steveroger', '$2b$10$N25resma.uX0viNskwCYO.f3qZytGs4S7WN3H7V4DmMpzWrMxG8wO', 3, '2020-06-17 09:03:31', '2020-06-17 09:03:31'),
(13, 'masnoval', '$2b$10$FtxcxF/ntLiSAQX.dvKkPeF6CuH05Dwg7nIzL1f7jvcfnHq3aDGV2', 1, '2020-06-18 08:39:59', '2020-06-18 08:39:59'),
(33, 'masnoval1', '$2b$10$n5ISGY1XX2wELMB171kfC.f2OIUNFU/KrwxN0pDab5NFU5vcCUcZu', 1, '2020-06-18 13:28:43', '2020-06-18 13:28:43'),
(34, 'akuadalahuser', '$2b$10$VPBC2E.rutO6UfoNKDoTze9u5yjidWhqEadsUFDWiNwrRR33eeHf6', 1, '2020-07-01 18:05:17', '2020-07-01 18:05:17'),
(35, 'dimasdompit', '$2b$10$7fIUdX7C1S37r0aoLEgqrOOlk0hY0JJB0yeWByZM3VvZgDQIKHH5a', 1, '2020-07-02 03:24:26', '2020-07-02 03:24:26'),
(36, 'akuadalahuser2', '$2b$10$guOCJ0hWCHNJ9srm9.ZuIeBaLn.MqOwjHePIPJW61jO8kkbqcrAiS', 2, '2020-07-02 03:32:02', '2020-07-02 03:32:02'),
(37, 'semuakarenadia', '$2b$10$T85u4Wte5DttE3WdSByciOgRaRUIhadYdfm0gzF.hp.JiCkJ0blDi', 2, '2020-07-02 18:44:31', '2020-07-02 18:44:31'),
(38, 'semuakarenakamu', '$2b$10$NLGI6vZsybJIjzXNNiz1x.eNZ49F2Sh.RwY/SDkDwnduO9tFpJQxy', 2, '2020-07-02 18:45:02', '2020-07-02 18:45:02'),
(39, 'akuadalahkamu', '$2b$10$2vwSUByTUQrxVEKV7DBLPOs12WcQakaTwZfslhd5kubDq5SN9kmnm', 2, '2020-07-02 18:45:52', '2020-07-02 18:45:52');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`author_id`);

--
-- Indeks untuk tabel `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test1` (`author_id`),
  ADD KEY `test2` (`genre_id`);

--
-- Indeks untuk tabel `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roles_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `key1` (`roles_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `author`
--
ALTER TABLE `author`
  MODIFY `author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT untuk tabel `genre`
--
ALTER TABLE `genre`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `roles_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `test1` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `test2` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `key1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`roles_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
