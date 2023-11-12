CREATE TABLE textes (
  id SERIAL PRIMARY KEY,
  titre TEXT NOT NULL,
  contenu TEXT NOT NULL
);

CREATE TABLE mots_uniques (
  id SERIAL PRIMARY KEY,
  mot TEXT NOT NULL UNIQUE
);

CREATE TABLE frequences (
  id SERAIL PRIMARY KEY,
  texte_id INTEGER NOT NULL,
  mot_unique_id INTEGER NOT NULL,
  frequence INTEGER NOT NULL,
  FOREIGN KEY (texte_id) REFERENCES textes(id),
  FOREIGN KEY (mot_unique_id) REFERENCES mots_uniques(id)
);


CREATE USER tooken_user;

GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE textes TO tooken_user;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE frequences TO tooken_user;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE mots_uniques TO tooken_user;



-- QUERY TO GET WORD CLOUD OF EACH TEXTE IN DATABASE :
/* SELECT textes.titre, mots_uniques.mot_dans_doc,frequences.frequence FROM textes
 LEFT JOIN frequences ON textes.id = frequences.texte_id
 LEFT JOIN mots_uniques ON frequences.mot_unique_id = mots_uniques.id 
 WHERE textes.titre = 'titre/du/text' */