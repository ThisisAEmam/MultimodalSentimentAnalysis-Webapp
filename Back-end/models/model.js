const createUsersTable = `
CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR(32) NOT NULL,
    lastName VARCHAR(32) NOT NULL,
    email VARCHAR(128) NOT NULL,
    username VARCHAR(64) NOT NULL,
    organization VARCHAR(128),
    admin BOOLEAN DEFAULT false NOT NULL,
    hash VARCHAR NOT NULL,
    salt VARCHAR NOT NULL
);
`;

const createQuestionsTable = `
CREATE TABLE Question
(
    qid SERIAL PRIMARY KEY,
    question VARCHAR NOT NULL,
    answer VARCHAR NOT NULL,
);
`;
