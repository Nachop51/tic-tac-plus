CREATE TABLE if not exists `game_state` (
  state_id INTEGER PRIMARY KEY AUTOINCREMENT,
  state_name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO `game_state` (state_name)
VALUES ('waiting'), ('playing'), ('finished'), ('aborted');

CREATE TABLE if not exists `game` (
  game_id INTEGER PRIMARY KEY AUTOINCREMENT,
  player1 VARCHAR(255) NOT NULL,
  player2 VARCHAR(255) NOT NULL,
  state_id INT NOT NULL,
  winner VARCHAR(255),
  FOREIGN KEY (state_id) REFERENCES game_state(state_id)
);
