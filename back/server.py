import time
from flask import Flask, request, jsonify, make_response
import nltk
from fileTookenizer import fileTookenizer
from dbHandler import save_text
from dbHandler import save_mots_uniques
from dbHandler import delete_all_tables
from dbHandler import search_word_db
from dbHandler import get_text_cloud
# from sqlalchemy import create_engine
from fileHandler import explorer_dossier, read_directory
import os
nltk.download('punkt')
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY


app = Flask(__name__)

# Configure the database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://tooken_user:password@localhost:5432/tp_tooken_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# Initialize the database connection
db = SQLAlchemy(app)

# Define textes table model
class textesTable(db.Model):
    __tablename__ = 'textes'
    id = db.Column(db.Integer, primary_key=True)
    titre = db.Column(db.String(255))
    contenu = db.Column(db.String(255))


# Define mots_uniques table model
class motsUniquesTable(db.Model):
    __tablename__ = 'mots_uniques'
    id = db.Column(db.Integer, primary_key=True)
    mot = db.Column(db.String(255))
    mot_dans_doc = db.Column(db.String(255))

    


# Define frequences table model
class frequencesTable(db.Model):
    __tablename__ = 'frequences'
    id = db.Column(db.Integer, primary_key=True)
    texte_id = db.Column(db.Integer)
    mot_unique_id = db.Column(db.Integer)
    frequence = db.Column(db.Integer)



@app.route("/api/tokens", methods=['POST'])
def get_current_time():  

    root = './files'
    # Empty tables
    try :
        delete_all_tables(db,textesTable,frequencesTable,motsUniquesTable) 
        print()
    except Exception as e:
        print("Error in function delete_all_tables ",str(e))

    # Get the list of files with their contents and their paths 
    file_content_list = read_directory(root)
    print(file_content_list)
    # For each file 
    for file in file_content_list :
        # Get the file path
        file_name = file["file_path"]
        print(file_name)
        # Get the file content
        text = file["content"]  
        # Text tookenization
        try :
            # Get the list of words with their frequences
            mot_freq = fileTookenizer(text) 
            # print("###################################################")
            # print( "We are working with the file => ", file, )
            # print( "Word frequency  ",  mot_freq )
            # print("###################################################")

        except Exception as e:
            print("Error in function fileTookenizer ",str(e))
        try :
            # Save the text name in the data table 
            new_text_id = save_text(db,textesTable ,file_name)
        except Exception as e:
            print("Error in function save_text ",str(e))

        try :
            # Save words in the table mots_uniques + freqences
            resp = save_mots_uniques(db,motsUniquesTable,frequencesTable,mot_freq, new_text_id)
            # print(" Finished with file => "+file_name )
        except Exception as e:
            print("Error in function save_mots_uniques ",str(e))

    dir_tree = explorer_dossier(db,"./files")
    return { "./files": dir_tree }

    # return dir_tree


    return mot_freq


# Search for word frequences
@app.route("/api/search_word", methods=['POST'])
def search_word():
    # Initialize text_freq
    text_freq =[]
    # Get the request body
    body = request.get_json()
    # Get the word to search 
    word_to_search = body["word"]
    try :
        print(word_to_search)
        # Search for word 
        text_freq = search_word_db(db,word_to_search) 
    except Exception as e:
        print("Error in function search_word ",str(e))
    try :
        # SGet Cloud for each file
        if(len(text_freq)):
            for text in text_freq :
                cloud = get_text_cloud(db,text["texte_title"]) 
                text["cloud"] = cloud
    except Exception as e:
        print("Error in function search_word ",str(e))
    
    text_freq = sorted(text_freq, key=lambda x: x["frequences"], reverse=True)
    return text_freq

if __name__ == "__main__" :
    app.run(debug=True)
