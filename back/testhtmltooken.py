from autocorrect import Speller

spell = Speller(lang="fr")

misspelled = ["mariege"]
for word in misspelled:
    print("original word: " + word)
    print("corrected word: " + spell(word))