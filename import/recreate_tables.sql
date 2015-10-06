/*
*	Recreate Node Maps Table Structure
*/

DROP schema public cascade;
CREATE schema public;

CREATE TABLE companies
(
	id				bigserial PRIMARY KEY,
	name			text,
	permit_number	text,
);

CREATE TABLE avas
(
	id		bigserial PRIMARY KEY,
	name	text
);

CREATE TABLE wineries
(
	id		integer PRIMARY KEY,
	name	text,
	est		date,
	logo	text,
	ava		integer REFERENCES avas (id),
	company	integer REFERENCES companies (id)
);