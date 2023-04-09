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
    type text,
    owner text
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
    languages text,
    followers integer,
    account text
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
-- Data for Name: licenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.licenses (id, uid, status, date, is_favourite, user_id, address, room_id) FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, type, user_id, message, date, room_id, is_watched) FROM stdin;
1	requirement_accepted	1	Your requirement was accepted in room:	2023-04-07	0bb8e	f
2	requirement_accepted	1	Your requirement was accepted in room: 0bb8e	2023-04-07	0bb8e	f
3	requirement_accepted	1	Your requirement was accepted in room: 0bb8e	2023-04-07	0bb8e	f
4	requirement_accepted	1	Your requirement was accepted in room: 0bb8e	2023-04-07	0bb8e	f
5	requirement_accepted	1	Your requirement was accepted in room: 0bb8e	2023-04-07	0bb8e	f
6	requirement_accepted	1	Your requirement was accepted in room: fks2yg	2023-04-07	fks2yg	f
7	requirement_accepted	1	Your requirement was accepted in room: fks2yg	2023-04-07	fks2yg	f
8	requirement_accepted	1	Your requirement was accepted in room: fks2yg	2023-04-07	fks2yg	f
9	requirement_accepted	1	Your requirement was accepted in room: i9rgn	2023-04-07	i9rgn	f
10	requirement_accepted	1	Your requirement was accepted in room: i9rgn	2023-04-07	i9rgn	f
11	requirement_accepted	1	Your requirement was accepted in room: i9rgn	2023-04-07	i9rgn	f
12	admin_added	2	Congratulations, now you are the second admin in room: 5zcjk, make a deal!	2023-04-08	5zcjk	f
13	requirement_accepted	1	Your requirement was accepted in room: 5zcjk	2023-04-08	5zcjk	f
14	requirement_accepted	1	Your requirement was accepted in room: 5zcjk	2023-04-08	5zcjk	f
15	requirement_accepted	1	Your requirement was accepted in room: 5zcjk	2023-04-08	5zcjk	f
16	admin_added	2	Congratulations, now you are the second admin in room: qs2se, make a deal!	2023-04-08	qs2se	f
17	requirement_accepted	1	Your requirement was accepted in room: qs2se	2023-04-08	qs2se	f
18	requirement_accepted	1	Your requirement was accepted in room: qs2se	2023-04-08	qs2se	f
19	requirement_accepted	1	Your requirement was accepted in room: qs2se	2023-04-08	qs2se	f
20	admin_added	2	Congratulations, now you are the second admin in room: 002l6, make a deal!	2023-04-08	002l6	f
21	requirement_accepted	1	Your requirement was accepted in room: 002l6	2023-04-08	002l6	f
22	requirement_accepted	1	Your requirement was accepted in room: 002l6	2023-04-08	002l6	f
23	requirement_accepted	1	Your requirement was accepted in room: 002l6	2023-04-08	002l6	f
24	requirement_accepted	1	Your requirement was accepted in room: 002l6	2023-04-08	002l6	f
25	admin_added	2	Congratulations, now you are the second admin in room: kgdl7, make a deal!	2023-04-09	kgdl7	f
26	requirement_accepted	1	Your requirement was accepted in room: kgdl7	2023-04-09	kgdl7	f
27	requirement_accepted	1	Your requirement was accepted in room: kgdl7	2023-04-09	kgdl7	f
28	requirement_accepted	1	Your requirement was accepted in room: kgdl7	2023-04-09	kgdl7	f
29	requirement_accepted	1	Your requirement was accepted in room: kgdl7	2023-04-09	kgdl7	f
30	admin_added	2	Congratulations, now you are the second admin in room: 45986, make a deal!	2023-04-09	45986	f
31	requirement_accepted	1	Your requirement was accepted in room: 45986	2023-04-09	45986	f
32	requirement_accepted	1	Your requirement was accepted in room: 45986	2023-04-09	45986	f
33	requirement_accepted	1	Your requirement was accepted in room: 45986	2023-04-09	45986	f
34	admin_added	2	Congratulations, now you are the second admin in room: s4sl3, make a deal!	2023-04-09	s4sl3	f
35	requirement_accepted	1	Your requirement was accepted in room: s4sl3	2023-04-09	s4sl3	f
36	requirement_accepted	1	Your requirement was accepted in room: s4sl3	2023-04-09	s4sl3	f
37	requirement_accepted	1	Your requirement was accepted in room: s4sl3	2023-04-09	s4sl3	f
38	requirement_accepted	1	Your requirement was accepted in room: s4sl3	2023-04-09	s4sl3	f
\.


--
-- Data for Name: room_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_messages (id, date, content, user_id, room_id, type) FROM stdin;
22	2023-04-09 1:50:39	ацуауцацу	2	s4sl3	0
23	2023-04-09 1:50:43	ацуацауцацау	1	s4sl3	0
\.


--
-- Data for Name: room_requirements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_requirements (id, room_id, user_id, title, description, type, value, is_alive, license_id, current_value) FROM stdin;
35	s4sl3	1	gergre	gererger	Duration days	30	f	14	0
36	s4sl3	1	ergergre	gergeregrr	Hold deposit	2	f	14	0
37	s4sl3	1	gergre	bbbberere	Views count	3000	f	14	0
38	s4sl3	1	gergre	errgerger	Cost	2	f	14	0
\.


--
-- Data for Name: room_result; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_result (id, room_id, requirements, gas, deposit, user_id, cost) FROM stdin;
14	s4sl3	0.002	0.019	2	1	2
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
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooms (room_id, owner_id, name, first_agreement, second_agreement, user_id, type, owner) FROM stdin;
s4sl3	1	test 2	t	t	2	fewfewfe	ewffew
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, surname, avatar, description, website, nickname, password, email, token, location, languages, followers, account) FROM stdin;
1	Misha	Uso	https://firebasestorage.googleapis.com/v0/b/irob-d735a.appspot.com/o/images%2F2023-02-01%2012.34.13.jpg?alt=media&token=4d17ba7d-1e94-4446-8673-19d64ac4197c				$2a$10$PXyx/J3c2YL8OV2z5P.mFuQ7HeYxA2pb0X0c42vWnxTd7LofnLECi	usov.misha@gmail.com	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzb3YubWlzaGFAZ21haWwuY29tIiwiaWF0IjoxNjgwOTQxMDgwfQ.Jgq8-EkVm-MDrYVGXKRTJICbCwydIyg3bsOV-2BIX5o			0	0xa508dD875f10C33C52a8abb20E16fc68E981F186
2	Алексей	У	\N				$2a$10$2S7n7x5u0EhX1xEUmLX2iuK/IXw2vyGDnG.j4L0igSnzGhoIg9Tgu	e@mail.ru	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVAbWFpbC5ydSIsImlhdCI6MTY4MDU1MTY1MH0.-NmLatsefGRH66Tz1oiK5lCCPE4fckvVI-s_dqmFnqo			0	0xd5cC383881D6d9A7dc1891A0235E11D03Cb992d3
\.


--
-- Name: licenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.licenses_id_seq', 14, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 38, true);


--
-- Name: roomUsers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."roomUsers_id_seq"', 20, true);


--
-- Name: room_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_messages_id_seq', 23, true);


--
-- Name: room_requirements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_requirements_id_seq', 38, true);


--
-- Name: room_result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_result_id_seq', 14, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


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

