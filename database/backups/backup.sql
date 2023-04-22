--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE "IROB";




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md524bb002702969490e41e26e1a454036c';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14
-- Dumped by pg_dump version 12.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "IROB" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14
-- Dumped by pg_dump version 12.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: IROB; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "IROB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE "IROB" OWNER TO postgres;

\connect "IROB"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    owner text,
    type text,
    director text,
    country text,
    actors text,
    video_url text,
    category text,
    date text,
    user_id integer,
    video_preview text,
    cost text,
    start_distr text,
    end_distr text,
    genres text,
    year text,
    trailer_url text,
    duration text
);


ALTER TABLE public.content OWNER TO postgres;

--
-- Name: content_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.content ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.content_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: licenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.licenses (
    id integer NOT NULL,
    uid text NOT NULL,
    status text,
    date text,
    is_favourite boolean,
    user_id integer NOT NULL,
    address text,
    room_id text
);


ALTER TABLE public.licenses OWNER TO postgres;

--
-- Name: licenses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.licenses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.licenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    type text NOT NULL,
    user_id integer NOT NULL,
    message text,
    date text NOT NULL,
    room_id text,
    is_watched boolean DEFAULT false NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.notifications ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: room_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_users (
    id integer NOT NULL,
    user_id integer NOT NULL,
    room_id text NOT NULL
);


ALTER TABLE public.room_users OWNER TO postgres;

--
-- Name: roomUsers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.room_users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."roomUsers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: room_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_messages (
    id integer NOT NULL,
    date text,
    content text NOT NULL,
    user_id integer,
    room_id text,
    type integer
);


ALTER TABLE public.room_messages OWNER TO postgres;

--
-- Name: room_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.room_messages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.room_messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: room_requirements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_requirements (
    id integer NOT NULL,
    room_id text NOT NULL,
    user_id integer,
    title text,
    description text,
    type text,
    value integer,
    is_alive boolean,
    license_id integer,
    current_value integer DEFAULT 0
);


ALTER TABLE public.room_requirements OWNER TO postgres;

--
-- Name: room_requirements_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.room_requirements ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.room_requirements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: room_result; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_result (
    id integer NOT NULL,
    room_id text,
    requirements numeric,
    gas numeric,
    deposit numeric,
    user_id integer,
    cost integer
);


ALTER TABLE public.room_result OWNER TO postgres;

--
-- Name: room_result_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.room_result ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.room_result_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms (
    room_id text NOT NULL,
    owner_id integer NOT NULL,
    name text,
    first_agreement boolean DEFAULT false,
    second_agreement boolean DEFAULT false,
    user_id integer,
    content_id integer
);


ALTER TABLE public.rooms OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    surname text,
    avatar text,
    description text,
    website text,
    nickname text,
    password text,
    email text,
    token text,
    location text,
    language text,
    followers integer,
    account text,
    disabled boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content (id, name, description, owner, type, director, country, actors, video_url, category, date, user_id, video_preview, cost, start_distr, end_distr, genres, year, trailer_url, duration) FROM stdin;
12	John Wick	With the untimely death of his beloved wife still bitter in his mouth, John Wick, the expert former assassin, receives one final gift from her a precious keepsake to help John find a new meaning in life now that she is gone. But when the arrogant Russian mob prince, Iosef Tarasov, and his men pay Wick a rather unwelcome visit to rob him of his prized 1969 Mustang and his wifes present, the...	Summit Entertainment	Film	David Leitch, Chad Stahelski	China, United States	Michael Nyqvist, Keanu Reeves, Alfie Allen	https://firebasestorage.googleapis.com/v0/b/irob-d735a.appspot.com/o/videos%2F%D0%B8%D0%B7%20%D0%BF%D0%BE%D0%BA%D1%83%D0%BF%D0%BA%D0%B8%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B8%20%D0%B2%20%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%CC%86%D0%BA%D0%B0%D1%85.mp4?alt=media&token=b56086b8-a224-40e0-b1ea-eb42cafebbe0		2023-04-21	1	https://firebasestorage.googleapis.com/v0/b/irob-d735a.appspot.com/o/videoPreviews%2F%D0%B8%D0%B7%20%D0%BF%D0%BE%D0%BA%D1%83%D0%BF%D0%BA%D0%B8%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B8%20%D0%B2%20%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%CC%86%D0%BA%D0%B0%D1%85.mp4?alt=media&token=98b64079-34b4-49a5-a0d3-8ade7fd24c45	0.004	03.12.1999	03.12.1999	Action, Crime, Thriller / Suspense	2014	https://firebasestorage.googleapis.com/v0/b/irob-d735a.appspot.com/o/videoTrailers%2F%D0%B8%D0%B7%20%D1%83%D1%87%D0%B5%D1%82%D0%BD%D0%BE%D0%B8%CC%86%20%D0%B7%D0%B0%D0%BF%D0%B8%D0%BC%D0%B8.mp4?alt=media&token=a90fcabf-8d26-48d8-960a-69bf44eacbaf	undefined
13	John Wick	With the untimely death of his beloved wife still bitter in his mouth, John Wick, the expert former assassin, receives one final gift from her a precious keepsake to help John find a new meaning in life now that she is gone. But when the arrogant Russian mob prince, Iosef Tarasov, and his men pay Wick a rather unwelcome visit to rob him of his prized 1969 Mustang and his wifes present, the...	Summit Entertainment	Film	David Leitch, Chad Stahelski	China, United States	Michael Nyqvist, Keanu Reeves, Alfie Allen	https://firebasestorage.googleapis.com/v0/b/irob-d735a.appspot.com/o/videos%2F%D0%B8%D0%B7%20%D0%BF%D0%BE%D0%BA%D1%83%D0%BF%D0%BA%D0%B8%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B8%20%D0%B2%20%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%CC%86%D0%BA%D0%B0%D1%85.mp4?alt=media&token=dc3983ab-fae7-4bcb-b64a-9ceb03a0a4fe		2023-04-21	3	https://firebasestorage.googleapis.com/v0/b/irob-d735a.appspot.com/o/videoPreviews%2F%D0%B8%D0%B7%20%D0%BF%D0%BE%D0%BA%D1%83%D0%BF%D0%BA%D0%B8%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B8%20%D0%B2%20%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%CC%86%D0%BA%D0%B0%D1%85.mp4?alt=media&token=eddef169-63d5-4cd1-9d9a-b0118d9f9d97	0.004	03.12.1999	03.12.1999	Action, Crime, Thriller / Suspense	2014	null	undefined
\.


--
-- Data for Name: licenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.licenses (id, uid, status, date, is_favourite, user_id, address, room_id) FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, type, user_id, message, date, room_id, is_watched) FROM stdin;
62	admin_added	2	Congratulations, now you are the second admin in room: ww4ghf, make a deal!	2023-04-12	ww4ghf	f
63	requirement_accepted	1	Your requirement was accepted in room: ww4ghf	2023-04-12	ww4ghf	f
64	requirement_accepted	1	Your requirement was accepted in room: ww4ghf	2023-04-12	ww4ghf	f
65	requirement_accepted	1	Your requirement was accepted in room: ww4ghf	2023-04-12	ww4ghf	f
66	admin_added	2	Congratulations, now you are the second admin in room: sxm8x, make a deal!	2023-04-13	sxm8x	f
67	requirement_accepted	1	Your requirement was accepted in room: sxm8x	2023-04-13	sxm8x	f
68	requirement_accepted	1	Your requirement was accepted in room: sxm8x	2023-04-13	sxm8x	f
69	requirement_accepted	1	Your requirement was accepted in room: sxm8x	2023-04-13	sxm8x	f
\.


--
-- Data for Name: room_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_messages (id, date, content, user_id, room_id, type) FROM stdin;
22	2023-04-09 1:50:39	ацуауцацу	2	s4sl3	0
23	2023-04-09 1:50:43	ацуацауцацау	1	s4sl3	0
24	2023-04-09 3:54:05	efwfwe	1	fiecb	0
25	2023-04-09 3:54:06	efwfe	1	fiecb	0
26	2023-04-09 3:54:08	wfwfwefwefwfwfwefwefwefwe	1	fiecb	0
27	2023-04-09 3:54:55	ацацуацуацуаццуцуа	2	fiecb	0
43	2023-04-12 1:41:12	ffwefwweewewew	1	ww4ghf	0
44	2023-04-12 1:42:02	frfefer	1	ww4ghf	0
45	2023-04-12 1:42:58	акаукауккау	2	ww4ghf	0
46	2023-04-12 1:55:21	rgregerger	1	sxm8x	0
47	2023-04-13 0:32:14	fewfwfweffwe	1	sxm8x	0
48	2023-04-13 0:32:15	fwefjwofjw	1	sxm8x	0
\.


--
-- Data for Name: room_requirements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_requirements (id, room_id, user_id, title, description, type, value, is_alive, license_id, current_value) FROM stdin;
60	sxm8x	1	Время	ацацацацу	Duration	30	f	29	0
61	sxm8x	1	Депозит		Hold deposit	2	f	29	0
62	sxm8x	1	Цена	пупкупкупкупук	Cost	3	f	29	0
39	fiecb	1	wfwfwe	fwfwf	Duration days	30	f	18	0
40	fiecb	1	fwfw	ewfwefew	Hold deposit	2	f	18	0
41	fiecb	1	fwefw	vweefwefwe	Views count	1000	f	18	0
42	fiecb	1	fwefwe	fewfewfwefew	Cost	3	f	18	0
35	s4sl3	1	gergre	gererger	Duration days	30	f	19	0
36	s4sl3	1	ergergre	gergeregrr	Hold deposit	2	f	19	0
37	s4sl3	1	gergre	bbbberere	Views count	3000	f	19	0
38	s4sl3	1	gergre	errgerger	Cost	2	f	19	0
57	ww4ghf	1	eddedw	wedewdwe	Duration	30	f	28	0
58	ww4ghf	1	eweefw	ewfw	Hold deposit	3	f	28	0
59	ww4ghf	1	dwedwe		Cost	2	f	28	0
\.


--
-- Data for Name: room_result; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_result (id, room_id, requirements, gas, deposit, user_id, cost) FROM stdin;
26	o1qta	0.002	0.054	4	2	3
27	n903hj	0.001	0.021	3	1	3
28	ww4ghf	0.001	0.020	3	1	2
29	sxm8x	0.001	0.026	2	1	3
\.


--
-- Data for Name: room_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_users (id, user_id, room_id) FROM stdin;
1	1	6xo7d
2	2	6xo7d
3	1	0bb8e
4	2	0bb8e
5	1	fks2yg
6	2	fks2yg
7	1	i9rgn
8	2	i9rgn
9	1	5zcjk
10	2	5zcjk
11	1	qs2se
12	2	qs2se
13	1	002l6
14	2	002l6
15	1	kgdl7
16	2	kgdl7
17	1	45986
18	2	45986
19	1	s4sl3
20	2	s4sl3
21	1	fiecb
22	2	fiecb
23	1	ln9wc
24	2	ln9wc
25	1	pe0sul
26	2	pe0sul
27	2	o1qta
28	1	o1qta
29	1	n903hj
30	2	n903hj
31	1	ww4ghf
32	2	ww4ghf
33	1	sxm8x
34	2	sxm8x
35	1	sulfr
36	2	mwzvg
37	1	v4b4p
38	1	qwszq
39	1	c9aos
40	1	m9zmt
41	1	93row
42	1	ipabmh
43	1	vgnpa
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooms (room_id, owner_id, name, first_agreement, second_agreement, user_id, content_id) FROM stdin;
ww4ghf	1	fwefwe	t	t	2	\N
sxm8x	1	efwew	t	t	2	\N
sulfr	1	ffefw	f	f	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, surname, avatar, description, website, nickname, password, email, token, location, language, followers, account, disabled) FROM stdin;
3							$2a$10$B8rAD1CzIpqZGii4jtBEi.Dzj2Ed0QRV.uSXIkZcC8apluDV1IcNy	ru@mail.ru	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1QG1haWwucnUiLCJpYXQiOjE2ODIxMDg0MzN9.HRfUE4TdewIp8dyr5QcvVUS2R9MTtpjBvLWb2xDihMY			0	\N	f
2	Алексей	У	\N				$2a$10$2S7n7x5u0EhX1xEUmLX2iuK/IXw2vyGDnG.j4L0igSnzGhoIg9Tgu	e@mail.ru	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVAbWFpbC5ydSIsImlhdCI6MTY4MTE2MTQ1Nn0._n2OK6ThQazJkg8yqqLIvGd906og1XHZboNyaj24IH8			0	0xd5cC383881D6d9A7dc1891A0235E11D03Cb992d3	f
1	Misha	Uso	https://firebasestorage.googleapis.com/v0/b/irob-d735a.appspot.com/o/images%2F2023-02-01%2012.34.13.jpg?alt=media&token=fa495542-0bc8-4feb-9365-dac7fe3e5434	With the untimely death of his beloved wife still bitter in his mouth, John Wick, the expert former assassin, receives one final gift from her a precious keepsake to help John find a new meaning in life now that she is gone. But when the arrogant Russian mob prince, Iosef Tarasov, an	ewfwefwe		$2a$10$PXyx/J3c2YL8OV2z5P.mFuQ7HeYxA2pb0X0c42vWnxTd7LofnLECi	usov.misha@gmail.com	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzb3YubWlzaGFAZ21haWwuY29tIiwiaWF0IjoxNjgyMTEwMDkwfQ._y6YtTuBK-FTzrKcQlGBO3_b0KW4GIlvJMmzi7RIgz8	\N	\N	0	0xa508dD875f10C33C52a8abb20E16fc68E981F186	f
\.


--
-- Name: content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.content_id_seq', 13, true);


--
-- Name: licenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.licenses_id_seq', 29, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 69, true);


--
-- Name: roomUsers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."roomUsers_id_seq"', 43, true);


--
-- Name: room_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_messages_id_seq', 48, true);


--
-- Name: room_requirements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_requirements_id_seq', 62, true);


--
-- Name: room_result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_result_id_seq', 29, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: content content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (id);


--
-- Name: licenses licenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT licenses_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: room_users roomUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_users
    ADD CONSTRAINT "roomUsers_pkey" PRIMARY KEY (id);


--
-- Name: room_messages room_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_messages
    ADD CONSTRAINT room_messages_pkey PRIMARY KEY (id);


--
-- Name: room_requirements room_requirements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_requirements
    ADD CONSTRAINT room_requirements_pkey PRIMARY KEY (id);


--
-- Name: room_result room_result_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_result
    ADD CONSTRAINT room_result_pkey PRIMARY KEY (id);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (room_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14
-- Dumped by pg_dump version 12.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

