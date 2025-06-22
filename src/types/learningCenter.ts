export interface LearningCenter {
  id: number;
  region: string;
  name: string;
  address: string;
}

/*
 * TODO: learning_center 데이터베이스 구조 참고
 *
 * CREATE TABLE learning_center (
 *   language   VARCHAR(5) NOT NULL,
 *   id         INT        NOT NULL,
 *   region     VARCHAR(100) NOT NULL,
 *   name       VARCHAR(100) NOT NULL,
 *   address    VARCHAR(255) NOT NULL,
 *   PRIMARY KEY (language, id)
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 *
 */
