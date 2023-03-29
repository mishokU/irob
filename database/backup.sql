--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

-- Started on 2023-03-29 22:43:05

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
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 32923)
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
-- TOC entry 225 (class 1259 OID 32931)
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
-- TOC entry 219 (class 1259 OID 32863)
-- Name: room_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_users (
    id integer NOT NULL,
    user_id integer NOT NULL,
    room_id text NOT NULL
);


ALTER TABLE public.room_users OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 32862)
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
-- TOC entry 222 (class 1259 OID 32886)
-- Name: room_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_messages (
    id integer NOT NULL,
    avatar text,
    username text,
    date text,
    content text,
    user_id integer,
    room_id text,
    type integer
);


ALTER TABLE public.room_messages OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 32893)
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
-- TOC entry 220 (class 1259 OID 32874)
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
-- TOC entry 221 (class 1259 OID 32881)
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
-- TOC entry 226 (class 1259 OID 32940)
-- Name: room_result; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_result (
    id integer NOT NULL,
    room_id text,
    requirements numeric,
    gas numeric,
    deposit numeric,
    user_id integer
);


ALTER TABLE public.room_result OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 32948)
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
-- TOC entry 217 (class 1259 OID 32826)
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
-- TOC entry 215 (class 1259 OID 16395)
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
-- TOC entry 216 (class 1259 OID 16402)
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
-- TOC entry 3217 (class 2606 OID 32929)
-- Name: licenses licenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT licenses_pkey PRIMARY KEY (id);


--
-- TOC entry 3211 (class 2606 OID 32869)
-- Name: room_users roomUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_users
    ADD CONSTRAINT "roomUsers_pkey" PRIMARY KEY (id);


--
-- TOC entry 3215 (class 2606 OID 32892)
-- Name: room_messages room_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_messages
    ADD CONSTRAINT room_messages_pkey PRIMARY KEY (id);


--
-- TOC entry 3213 (class 2606 OID 32880)
-- Name: room_requirements room_requirements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_requirements
    ADD CONSTRAINT room_requirements_pkey PRIMARY KEY (id);


--
-- TOC entry 3219 (class 2606 OID 32946)
-- Name: room_result room_result_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_result
    ADD CONSTRAINT room_result_pkey PRIMARY KEY (id);


--
-- TOC entry 3209 (class 2606 OID 32832)
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (room_id);


--
-- TOC entry 3207 (class 2606 OID 16401)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2023-03-29 22:43:05

--
-- PostgreSQL database dump complete
--

