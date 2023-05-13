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
-- Name: config; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.config (
    id integer NOT NULL,
    network_url text NOT NULL,
    enabled boolean DEFAULT false,
    name text,
    chain_id integer,
    chain_hex text
);


ALTER TABLE public.config OWNER TO postgres;

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
    room_id text,
    content_id integer,
    video_url text
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
    value numeric,
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
    disabled boolean DEFAULT false,
    "isAdmin" boolean
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
-- Data for Name: config; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.config (id, network_url, enabled, name, chain_id, chain_hex) FROM stdin;
2	http://ganache:8545	f	Local ganache	1337	0x539
0	https://mainnet.infura.io/v3/ace2d5caa7ad4bada55e324bd37a9ca1	f	Main net	1	0x1
1	https://sepolia.infura.io/v3/ace2d5caa7ad4bada55e324bd37a9ca1	t	Sepolia	11155111	0xaa36a7
\.


--
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content (id, name, description, owner, type, director, country, actors, video_url, category, date, user_id, video_preview, cost, start_distr, end_distr, genres, year, trailer_url, duration) FROM stdin;
42	Cyberpank	With the untimely death of his beloved wife still bitter in his mouth, John Wick, the expert former assassin, receives one final gift from her a precious keepsake to help John find a new meaning in life now that she is gone. But when the arrogant Russian mob prince, Iosef Tarasov, and his men pay Wick a rather unwelcome visit to rob him of his prized 1969 Mustang and his wifes present, the...	Summit Entertainment	Film	David Leitch, Chad Stahelski	China, United States	Michael Nyqvist, Keanu Reeves, Alfie Allen	https://firebasestorage.googleapis.com/v0/b/irob-d735a.appspot.com/o/videos%2Fvideo1682695617001irob?alt=media&token=658ee2e6-a556-4d89-9bf2-e0cd6b8acf8e		2023-04-28	3	https://firebasestorage.googleapis.com/v0/b/irob-d735a.appspot.com/o/videoPreviews%2Fpreview1682695617001irob?alt=media&token=0adb340d-9f0e-4cb2-b377-9ed5f44ff6b2	0.004	03.12.1999	03.12.1999	Action, Crime, Thriller / Suspense	2014	null	undefined
43	ацацу	ацауц		Film	аца	ац		https://firebasestorage.googleapis.com/v0/b/irob-d735a.appspot.com/o/videos%2Fvideo1683927642908irob?alt=media&token=77afd329-c57a-4ba6-99b4-cce8773ef4d6		2023-05-12	4	https://firebasestorage.googleapis.com/v0/b/irob-d735a.appspot.com/o/videoPreviews%2Fpreview1683927642909irob?alt=media&token=e965712a-3bc0-4bb9-937f-3954e5eb8c4f						null	undefined
\.


--
-- Data for Name: licenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.licenses (id, uid, status, date, is_favourite, user_id, address, room_id, content_id, video_url) FROM stdin;
43	04c32068-068c-48b6-b028-a0d8b20839e1	claimed	Tue May 09 2023 01:16:35 GMT+0300 (Moscow Standard Time)	t	4	0x601Aa2179fE17c2849FaFA065624D6c3b4C86175	d1rwxl	42	\N
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
70	admin_added	3	Congratulations, now you are the second admin in room: 25v5n, make a deal!	2023-04-22	25v5n	f
71	admin_added	3	Congratulations, now you are the second admin in room: 25v5n, make a deal!	2023-04-22	25v5n	f
72	admin_added	3	Congratulations, now you are the second admin in room: 25v5n, make a deal!	2023-04-22	25v5n	f
73	requirement_accepted	1	Your requirement was accepted in room: jnhzn	2023-04-22	jnhzn	f
74	requirement_accepted	1	Your requirement was accepted in room: jnhzn	2023-04-22	jnhzn	f
75	requirement_accepted	1	Your requirement was accepted in room: jnhzn	2023-04-22	jnhzn	f
76	requirement_accepted	1	Your requirement was accepted in room: hu047	2023-04-24	hu047	f
77	requirement_accepted	1	Your requirement was accepted in room: hu047	2023-04-24	hu047	f
78	requirement_accepted	1	Your requirement was accepted in room: hu047	2023-04-24	hu047	f
79	admin_added	3	Congratulations, now you are the second admin in room: ok2wyh, make a deal!	2023-04-25	ok2wyh	f
80	requirement_accepted	1	Your requirement was accepted in room: ok2wyh	2023-04-25	ok2wyh	f
81	requirement_accepted	1	Your requirement was accepted in room: ok2wyh	2023-04-25	ok2wyh	f
82	requirement_accepted	1	Your requirement was accepted in room: ok2wyh	2023-04-25	ok2wyh	f
83	requirement_accepted	1	Your requirement was accepted in room: 0ra1c	2023-04-25	0ra1c	f
84	requirement_accepted	1	Your requirement was accepted in room: 0ra1c	2023-04-25	0ra1c	f
85	requirement_accepted	1	Your requirement was accepted in room: 0ra1c	2023-04-25	0ra1c	f
86	requirement_accepted	1	Your requirement was accepted in room: nhx9t	2023-04-25	nhx9t	f
87	requirement_accepted	1	Your requirement was accepted in room: nhx9t	2023-04-25	nhx9t	f
88	requirement_accepted	1	Your requirement was accepted in room: nhx9t	2023-04-25	nhx9t	f
89	requirement_accepted	1	Your requirement was accepted in room: 6gign	2023-04-25	6gign	f
90	requirement_accepted	1	Your requirement was accepted in room: 6gign	2023-04-25	6gign	f
91	requirement_accepted	1	Your requirement was accepted in room: 6gign	2023-04-25	6gign	f
92	requirement_accepted	1	Your requirement was accepted in room: 6gign	2023-04-25	6gign	f
93	requirement_accepted	1	Your requirement was accepted in room: eefbl	2023-04-25	eefbl	f
94	requirement_accepted	1	Your requirement was accepted in room: eefbl	2023-04-25	eefbl	f
95	requirement_accepted	1	Your requirement was accepted in room: eefbl	2023-04-25	eefbl	f
96	requirement_accepted	3	Your requirement was accepted in room: sp6v3g	2023-04-27	sp6v3g	f
97	requirement_accepted	3	Your requirement was accepted in room: 2gvyy	2023-04-27	2gvyy	f
98	requirement_accepted	1	Your requirement was accepted in room: 2gvyy	2023-04-27	2gvyy	f
99	requirement_accepted	1	Your requirement was accepted in room: 2gvyy	2023-04-27	2gvyy	f
100	requirement_accepted	1	Your requirement was accepted in room: sp6v3g	2023-04-28	sp6v3g	f
101	requirement_accepted	1	Your requirement was accepted in room: sp6v3g	2023-04-28	sp6v3g	f
102	requirement_accepted	3	Your requirement was accepted in room: idgj5	2023-04-28	idgj5	f
103	requirement_accepted	1	Your requirement was accepted in room: idgj5	2023-04-28	idgj5	f
104	requirement_accepted	1	Your requirement was accepted in room: idgj5	2023-04-28	idgj5	f
105	requirement_accepted	1	Your requirement was accepted in room: 8wvdp	2023-04-28	8wvdp	f
106	requirement_accepted	1	Your requirement was accepted in room: 8wvdp	2023-04-28	8wvdp	f
107	requirement_accepted	3	Your requirement was accepted in room: 8wvdp	2023-04-28	8wvdp	f
108	requirement_accepted	3	Your requirement was accepted in room: g6szf	2023-04-28	g6szf	f
109	requirement_accepted	3	Your requirement was accepted in room: 7wx9p	2023-04-28	7wx9p	f
110	requirement_accepted	1	Your requirement was accepted in room: 7wx9p	2023-04-28	7wx9p	f
111	requirement_accepted	1	Your requirement was accepted in room: 7wx9p	2023-04-28	7wx9p	f
112	requirement_accepted	3	Your requirement was accepted in room: 0b0x9	2023-04-28	0b0x9	f
113	requirement_accepted	3	Your requirement was accepted in room: da95	2023-04-29	da95	f
114	requirement_accepted	1	Your requirement was accepted in room: da95	2023-04-29	da95	f
115	requirement_accepted	1	Your requirement was accepted in room: da95	2023-04-29	da95	f
116	admin_added	5	Congratulations, now you are the second admin in room: yts8ej, make a deal!	2023-05-08	yts8ej	f
117	requirement_accepted	4	Your requirement was accepted in room: yts8ej	2023-05-08	yts8ej	f
118	requirement_accepted	4	Your requirement was accepted in room: yts8ej	2023-05-08	yts8ej	f
119	requirement_accepted	4	Your requirement was accepted in room: yts8ej	2023-05-08	yts8ej	f
120	requirement_accepted	4	Your requirement was accepted in room: yts8ej	2023-05-08	yts8ej	f
121	requirement_accepted	4	Your requirement was accepted in room: yts8ej	2023-05-08	yts8ej	f
122	requirement_accepted	4	Your requirement was accepted in room: yts8ej	2023-05-08	yts8ej	f
123	requirement_accepted	3	Your requirement was accepted in room: 7pg8a	2023-05-08	7pg8a	f
124	requirement_accepted	4	Your requirement was accepted in room: 7pg8a	2023-05-08	7pg8a	f
125	requirement_accepted	4	Your requirement was accepted in room: 7pg8a	2023-05-08	7pg8a	f
126	requirement_accepted	3	Your requirement was accepted in room: 838sk	2023-05-08	838sk	f
127	requirement_accepted	4	Your requirement was accepted in room: 838sk	2023-05-08	838sk	f
128	requirement_accepted	4	Your requirement was accepted in room: 838sk	2023-05-08	838sk	f
129	requirement_accepted	4	Your requirement was accepted in room: 838sk	2023-05-08	838sk	f
130	requirement_accepted	3	Your requirement was accepted in room: d1rwxl	2023-05-08	d1rwxl	f
131	requirement_accepted	4	Your requirement was accepted in room: d1rwxl	2023-05-08	d1rwxl	f
132	requirement_accepted	4	Your requirement was accepted in room: d1rwxl	2023-05-08	d1rwxl	f
133	requirement_accepted	4	Your requirement was accepted in room: d1rwxl	2023-05-08	d1rwxl	f
134	requirement_accepted	3	Your requirement was accepted in room: scw88	2023-05-09	scw88	f
135	requirement_accepted	4	Your requirement was accepted in room: scw88	2023-05-09	scw88	f
136	requirement_accepted	3	Your requirement was accepted in room: scw88	2023-05-09	scw88	f
137	requirement_accepted	6	Your requirement was accepted in room: dwpmd	2023-05-10	dwpmd	f
138	requirement_accepted	6	Your requirement was accepted in room: dwpmd	2023-05-10	dwpmd	f
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
55	2023-04-28 1:12:36	wwe	1	8wvdp	0
56	2023-04-28 4:58:48	Привет!	1	8wvdp	0
57	2023-04-28 4:58:51	Отличная идея!	1	8wvdp	0
58	2023-04-28 4:59:00	Хочу купить у тебя кино Джон Уик!	1	8wvdp	0
64	2023-05-09 1:05:40	fwefew	4	scw88	0
65	2023-05-09 7:19:06	fefwe	4	scw88	0
66	2023-05-09 7:19:52	fefwefwwefw	4	scw88	0
67	2023-05-09 7:20:03	fefwefwfewfw	4	scw88	0
69	2023-05-09 7:22:38	fwefwf	4	scw88	0
70	2023-05-09 7:22:39	fwefwwe	4	scw88	0
71	2023-05-09 1:47:21	ftfty tyf tyf tfyytftfyfyf tyfytf	4	scw88	0
72	2023-05-10 4:38:45	efwefwfwe	6	dwpmd	0
73	2023-05-10 4:41:27	fewefew	6	dwpmd	0
74	2023-05-12 1:52:17	fwefewefw	4	dwpmd	0
\.


--
-- Data for Name: room_requirements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_requirements (id, room_id, user_id, title, description, type, value, is_alive, license_id, current_value) FROM stdin;
39	fiecb	1	wfwfwe	fwfwf	Duration days	30	f	18	0
40	fiecb	1	fwfw	ewfwefew	Hold deposit	2	f	18	0
41	fiecb	1	fwefw	vweefwefwe	Views count	1000	f	18	0
42	fiecb	1	fwefwe	fewfewfwefew	Cost	3	f	18	0
35	s4sl3	1	gergre	gererger	Duration days	30	f	19	0
36	s4sl3	1	ergergre	gergeregrr	Hold deposit	2	f	19	0
37	s4sl3	1	gergre	bbbberere	Views count	3000	f	19	0
38	s4sl3	1	gergre	errgerger	Cost	2	f	19	0
90	sp6v3g	1	FWE		Hold deposit	2	f	36	0
87	sp6v3g	3			Cost	0.004	f	36	0
91	idgj5	3			Cost	0.004	f	37	0
93	idgj5	1	ауацу		Hold deposit	2	f	37	0
96	8wvdp	1	r33r3		Hold deposit	2	f	38	0
94	8wvdp	3			Cost	0.004	f	38	0
104	0b0x9	3			Cost	0.004	f	\N	0
105	luadx	3			Cost	0.004	t	\N	0
106	ktnri	3			Cost	0.004	t	\N	0
107	da95	3			Cost	0.004	f	40	0
109	da95	1	ацуцу		Hold deposit	2	f	40	0
85	2gvyy	1			Cost	0.004	f	35	0
88	2gvyy	1		fewfew	Hold deposit	2	f	35	0
123	d1rwxl	3			Cost	0.004	f	43	0
125	d1rwxl	4	fwef	fwefw	Hold deposit	0.004	f	43	0
126	d1rwxl	4	wfefw	fwfw	Cost	0.004	f	43	0
89	sp6v3g	1	GEGE	FWEF	Duration	2	f	36	2
92	idgj5	1	умуа		Duration	2	f	37	2
124	d1rwxl	4	fwefe	fwefew	Duration	30	f	43	30
129	scw88	4	ffwef	fewfwwe	Duration	30	t	\N	0
130	scw88	4	fwfwe		Hold deposit	0.002	t	\N	0
131	scw88	3	fwfwe		Cost	0.003	f	\N	0
132	dwpmd	3			Cost	0.004	t	\N	0
133	dwpmd	6	egegwe	fwfwe	Duration	30	f	\N	0
134	dwpmd	6	fefwefw	fwefefwe	Hold deposit	0.004	f	\N	0
86	2gvyy	3	fefwe	gergrgregre	Duration	30	f	35	17
95	8wvdp	1	rwr	ergerereere	Duration	30	f	38	17
108	da95	1	ацуац		Duration	30	f	40	17
\.


--
-- Data for Name: room_result; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_result (id, room_id, requirements, gas, deposit, user_id, cost) FROM stdin;
26	o1qta	0.002	0.054	4	2	3
27	n903hj	0.001	0.021	3	1	3
28	ww4ghf	0.001	0.020	3	1	2
29	sxm8x	0.001	0.026	2	1	3
30	jnhzn	0.001	0.033	2	1	2
31	ok2wyh	0.001	0.036	2	1	2
32	0ra1c	0.000	0.055	2	1	2
33	nhx9t	0.000	0.041	2	1	0
34	eefbl	0.000	0.039	2	1	0
35	2gvyy	0.000	0.032	2	1	0
36	sp6v3g	0.000	0.033	2	1	0
37	idgj5	0.000	0.044	2	1	0
38	8wvdp	0.000	0.036	2	1	0
39	7wx9p	0.000	0.032	2	1	0
40	da95	0.000	0.033	2	1	0
41	7pg8a	0.001	0.000000139	0.004	4	0
42	838sk	0.001	0.000000090	0.004	4	0
43	d1rwxl	0.001	0.000000081	0.004	4	0
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
44	1	n8gc6
45	1	x3oyvh
46	1	ncfkbh
47	3	ncfkbh
48	1	0my76
49	1	ltlpu
50	1	oqz8al
51	3	oqz8al
52	1	bms2p
53	1	48r25
54	3	48r25
55	3	7cx8d
56	1	4etxn
57	1	g2k55
58	1	jvb48
59	1	gwsmek
60	1	tudfsk
61	1	wwd3b
62	1	ej8ou
63	1	25v5n
64	3	25v5n
65	3	bms2p
66	1	7dp3f
67	1	jnhzn
68	3	jnhzn
69	1	ok2wyh
70	1	y934x
71	1	hu047
72	3	hu047
73	3	y934x
74	3	ok2wyh
75	1	0ra1c
76	3	0ra1c
77	1	nhx9t
78	3	nhx9t
79	1	6gign
80	3	6gign
81	3	81xw7h
82	1	5ykzk
83	1	93tgz
84	1	eefbl
85	3	eefbl
86	1	2gvyy
87	3	2gvyy
88	1	sp6v3g
89	3	sp6v3g
90	1	idgj5
91	3	idgj5
92	1	8wvdp
93	3	8wvdp
94	1	g6szf
95	1	7wx9p
96	3	7wx9p
97	3	
98	1	
99	1	0b0x9
100	1	luadx
101	1	ktnri
102	1	da95
103	3	0b0x9
104	3	luadx
105	3	ktnri
106	3	da95
107	4	yts8ej
108	5	yts8ej
109	4	7pg8a
110	3	7pg8a
111	4	in1g8
112	4	11dms
113	4	838sk
114	3	838sk
115	4	d1rwxl
116	3	d1rwxl
117	4	scw88
118	3	scw88
119	6	dwpmd
120	3	dwpmd
121	4	dwpmd
122	4	1b07w
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooms (room_id, owner_id, name, first_agreement, second_agreement, user_id, content_id) FROM stdin;
0b0x9	1		f	f	3	42
luadx	1		f	f	3	42
ktnri	1		f	f	3	42
da95	1		t	t	3	42
scw88	4	Untitled	f	f	3	42
dwpmd	6	Test 3	f	f	3	42
1b07w	4	ffefw	f	f	0	0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, surname, avatar, description, website, nickname, password, email, token, location, language, followers, account, disabled, "isAdmin") FROM stdin;
2	Алексей	У	\N				$2a$10$2S7n7x5u0EhX1xEUmLX2iuK/IXw2vyGDnG.j4L0igSnzGhoIg9Tgu	e@mail.ru	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVAbWFpbC5ydSIsImlhdCI6MTY4MTE2MTQ1Nn0._n2OK6ThQazJkg8yqqLIvGd906og1XHZboNyaj24IH8			0	0xd5cC383881D6d9A7dc1891A0235E11D03Cb992d3	f	\N
1	Misha	Usov	https://firebasestorage.googleapis.com/v0/b/irob-d735a.appspot.com/o/images%2F2023-02-01%2012.34.13.jpg?alt=media&token=fa495542-0bc8-4feb-9365-dac7fe3e5434	With the untimely death of his beloved wife still bitter in his mouth, John Wick, the expert former assassin, receives one final gift from her a precious keepsake to help John find a new meaning in life now that she is gone. But when the arrogant Russian mob prince, Iosef Tarasov, an	ewfwefwe		$2a$10$PXyx/J3c2YL8OV2z5P.mFuQ7HeYxA2pb0X0c42vWnxTd7LofnLECi	usov.misha@gmail.com	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzb3YubWlzaGFAZ21haWwuY29tIiwiaWF0IjoxNjgyNDY2Nzg1fQ.IvKWSDVexO_YL3iUTm4Zcoz-X_eC6aXCIXIKj46oZ0s	\N	\N	0	0xd4039eB67CBB36429Ad9DD30187B94f6A5122215	f	t
3	Alex 	Usov	https://firebasestorage.googleapis.com/v0/b/irob-d735a.appspot.com/o/images%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202023-04-09%20%D0%B2%2017.42.23.png?alt=media&token=12eb0b0b-62af-47d0-bf4b-297ec667d168				$2a$10$B8rAD1CzIpqZGii4jtBEi.Dzj2Ed0QRV.uSXIkZcC8apluDV1IcNy	ru@mail.ru	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1QG1haWwucnUiLCJpYXQiOjE2ODM1NjIxNDR9.n_V40_onDcPWESNeZUZrCyw31aitDTIngZ9x7M2s-wE	\N	\N	0	0xd5cC383881D6d9A7dc1891A0235E11D03Cb992d3	f	\N
5							$2a$10$mY.AWcktGNa6AyGLK7ixf.DvngBXE.Ju0NZ6YkEN7qiux4DgzGFuO	usov@mail.ru	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzb3ZAbWFpbC5ydSIsImlhdCI6MTY4MzU2MTY2OX0.ih5wwcckRXRSD-XFZgp9lsxtvVUMt5fwPC2Mh6CPBGA			0	0xd5cC383881D6d9A7dc1891A0235E11D03Cb992d3	f	t
6							$2a$10$TGm.PmGTIRp5W/tfZxVHDeHcco4MRk.aS0iIuceMvhYGyD1Naaxqi	usov.isha@gmail.com	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzb3YuaXNoYUBnbWFpbC5jb20iLCJpYXQiOjE2ODM3Mjk0NTB9._hRJV8mXyNAaIpY6HarEc00CLe9I4EGKyHbreg0Qk5s			0	0x0a5BAeFCB3Ea40c21a70059F91B49706Cf320470	f	\N
4							$2a$10$V5i4q.Bl0b3d9dqIXfNJVuOhJbADHsViQced5wwZxAJPROvFjJg12	kazakov@itmo.dev	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthemFrb3ZAaXRtby5kZXYiLCJpYXQiOjE2ODM5MjczOTN9.Pgt9CkeolqAoIUFA58Vr_BwI0I7fC9wyjFQyqF38hd0			0	0x0a5BAeFCB3Ea40c21a70059F91B49706Cf320470	f	t
\.


--
-- Name: content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.content_id_seq', 43, true);


--
-- Name: licenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.licenses_id_seq', 43, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 138, true);


--
-- Name: roomUsers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."roomUsers_id_seq"', 122, true);


--
-- Name: room_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_messages_id_seq', 74, true);


--
-- Name: room_requirements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_requirements_id_seq', 134, true);


--
-- Name: room_result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_result_id_seq', 43, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: config config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.config
    ADD CONSTRAINT config_pkey PRIMARY KEY (id);


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

