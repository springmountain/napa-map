/*
*	Recreate Node Maps Table Structure
*/

DROP schema public cascade;
CREATE schema public;

CREATE TABLE companies
(
	id				bigserial PRIMARY KEY,
	permit_number	text,
	owner_name		text,
	operating_name	text,
	street			text,
	city			text,
	state			text,
	zip				integer,
	zip4			integer,
	county			text
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