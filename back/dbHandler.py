
import os
from nltk.stem.snowball import FrenchStemmer


# The function that saves text into textes table
def save_text(db,textes_table, titre):
    data = textes_table(titre=titre, contenu="")
    db.session.add(data)
    db.session.commit()
    # Return 
    return data.id

# The function that saves unique words
def save_mots_uniques(db,mots_uniques_table ,frequences_table,mot_freq_list, new_text_id):
    # Query the table
    data = mots_uniques_table.query.all()
    # Format the data
    existant_word_id = -1
    # Verify if the word doesn't exist
    for root,source_list, freq in mot_freq_list:
        for row in data :
            if(root == row.mot):
                existant_word_id = row.id
                break
            else :
                continue
       
        # If the word doesn't exist
        if(existant_word_id != -1):
            # Add the association between the word and frequences to frequences table
            new_row = frequences_table(texte_id=new_text_id, mot_unique_id=existant_word_id,frequence = freq)
            db.session.add(new_row)
            db.session.commit()
            existant_word_id = -1

        # If the word exists
        else : 
            # Add the new word to mots_uniques_table 
            nouveau_mot = mots_uniques_table(mot=root,mot_dans_doc=source_list[0])
            db.session.add(nouveau_mot)
            db.session.commit()

            # Add the association between the word and frequences to frequences table
            new_row = frequences_table(texte_id=new_text_id, mot_unique_id=nouveau_mot.id, frequence = freq)
            db.session.add(new_row)
            db.session.commit()

    return {'Doc with id '+str(new_text_id)+' Indexed Successfully'}


# The function that empty all tables
def delete_all_tables(db,textes_table,frequences_table,mots_uniques_table):
    # Empty frequence table
    db.session.query(frequences_table).delete()
    db.session.commit()

    # Empty textes table
    db.session.query(textes_table).delete()
    db.session.commit()

    # Empty mots_uniques table
    db.session.query(mots_uniques_table).delete()
    db.session.commit()

    return 'All tables have been emptied!'

    
# The function that searchs for the word in the database
def search_word_db(db,word):
    mot_response = []
    formatted_data = []
    # Stem the word before starting research 
    stemmer = FrenchStemmer()
    word = stemmer.stem(word)
    # Search the word on mots_uniques table.
    with db.engine.begin() as conn:
        mot_response = conn.exec_driver_sql(f"SELECT * FROM mots_uniques WHERE mots_uniques.mot = '{word}'").all()
    # The word doesn't exist in database 
    if(len(mot_response) == 0):
        return []
    else : 
        text_freq = []
        # Get the id of the word on table
        word_id = mot_response[0][0]
        with db.engine.begin() as conn:
            query = f"SELECT textes.titre, frequences.frequence FROM frequences INNER JOIN textes ON frequences.texte_id = textes.id WHERE frequences.mot_unique_id = '{word_id}'"
            text_freq = conn.exec_driver_sql(query).all()
        # Search the frequency of the word appearence in each file 
        for row in text_freq:
            with open(row[0], 'r') as f:
                print(row)
                formatted_data.append({
                    'texte_title': row[0],
                    'frequences': row[1],
                    # 'content': f.read(),
                })
    # return the formated data
    return formatted_data


# QUERY 



def get_text_cloud(db,file_path):
    text_cloud = []
    word_frequences = []
    with db.engine.begin() as conn:
            query = f"SELECT textes.titre, mots_uniques.mot_dans_doc,frequences.frequence FROM textes LEFT JOIN frequences ON textes.id = frequences.texte_id LEFT JOIN mots_uniques ON frequences.mot_unique_id = mots_uniques.id WHERE textes.titre = '{file_path}'"
            text_cloud = conn.exec_driver_sql(query).all()

    for row in text_cloud:
        word_frequences.append((row[1],row[2]))

    return word_frequences

