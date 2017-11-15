CREATE TABLE human (
  id          BIGINT NOT NULL AUTO_INCREMENT,
  first_name  VARCHAR(255),
  last_name   VARCHAR(255),
  email       VARCHAR(255),
  hourly_rate DOUBLE,
  PRIMARY KEY (id)
);

CREATE TABLE excrement (
  id                        BIGINT NOT NULL AUTO_INCREMENT,
  human_id                  BIGINT,
  bristol_type              INT    NOT NULL,
  duration_in_minutes       INT,
  comments                  MEDIUMTEXT,
  date_time_in_milliseconds VARCHAR(255),
  at_work                   BOOLEAN,
  PRIMARY KEY (id),
  FOREIGN KEY (human_id) REFERENCES human (id)
);