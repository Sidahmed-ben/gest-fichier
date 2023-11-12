
import time
from flask import Flask, request, jsonify, make_response
import nltk
from nltk.corpus import stopwords
from nltk.stem.snowball import FrenchStemmer


def fileTookenizer(text):
    # Set the more useful symbols
    symboles = ["'",'.', ',', ';', ':', '!', '?', '"', '(', ')', '[', ']', '{', '}', '+', '-', '*', '/', '=', '<', '>', '≤', '≥', '%', '$', '€', '£', '¥', '元', '@', '#', '&', '~', '/', '\\', '¿', '☎', '✉', '❌', '✔', 'ℹ', '⚠', '❓', '⏰', '📅', '📆', '🎂', '←', '→', '↑', '↓', '👉', '🏠', '⭐', '❤']
    symboles = set(symboles)
    # Download stopword list
    nltk.download('stopwords')
    # stemmer initializer
    stemmer = FrenchStemmer()
    # Replace symboles by spaces
    for symb in symboles :
        text = text.replace(symb, " ")
    # Convert to lowerCase
    words = nltk.word_tokenize(text.lower())
    # Get stopWords
    stop_words = set(stopwords.words('french')) 
    # Initialize word_freq object
    word_freq = []
    # To save only lematised words
    check_exist = []
    # Loop words
    for word in words:
        if (word not in stop_words) and (len(word)>2):
            # Use stemmer for words
            root = stemmer.stem(word)
            # Add the word as key and frequence as value
            index = check_exist_fun(root,check_exist)
            if index == -1:
                new_word = (root,[word],1)
                word_freq.append(new_word)
                check_exist.append(root)
            else:
                # Add the word to found words list
                if word not in word_freq[index][1]:
                    word_freq[index][1].append(word)
                # Transform the tuple to a list in order to update it 
                my_list = list(word_freq[index])
                # Add +1 to frequency
                my_list[2]+=1 
                # Transform to list
                my_tuple = tuple(my_list)
                # update word_freq list
                word_freq[index] = my_tuple
        else :
            continue
    # return word_freq
    # add_word_to_freq(word_freq)
    return word_freq


def check_exist_fun(root,check_exist):
    index = -1
    if(root in check_exist):
        index = check_exist.index(root)
    return index

    
