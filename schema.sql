DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users (UserId INTEGER PRIMARY KEY, Username TEXT, UserData INTEGER);
INSERT INTO Users (UserId, Username, UserDAta) VALUES (1, "jane", 18), (2, "john", 17), (3, "joe", 16), (4, "jeff", 15);