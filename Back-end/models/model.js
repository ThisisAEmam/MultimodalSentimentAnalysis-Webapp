const createUsersTable = `
CREATE TABLE users
(
    uid VARCHAR PRIMARY KEY NOT NULL UNIQUE,
    firstName VARCHAR(32) NOT NULL,
    lastName VARCHAR(32) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    username VARCHAR(64) NOT NULL UNIQUE,
    organization VARCHAR(128),
    admin BOOLEAN DEFAULT false NOT NULL,
    hash VARCHAR NOT NULL,
    salt VARCHAR NOT NULL,
    resetLink VARCHAR DEFAULT NULL
);
`;

const createQuestionsTable = `
CREATE TABLE Question
(
    qid VARCHAR PRIMARY KEY NOT NULL UNIQUE,
    question VARCHAR NOT NULL,
    answer VARCHAR NOT NULL,
);
`;

`
{
    "firstName": "Tester",
    "lastName": "Testing",
    "username": "test",
    "email": "test@test.com",
    "password": "abdoemam",
    "organization": ""
}
`;
`
{
    "firstName": "AbdelRahman",
    "lastName": "Emam",
    "username": "Emamoz",
    "email": "abdoemamofficial@gmail.com",
    "password": "abdoemam",
    "organization": "ACubed"
}
`;
