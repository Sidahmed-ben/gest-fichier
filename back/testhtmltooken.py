import pypandoc

output = pypandoc.convert_file('file.docx', 'html')
print(output)
with open('example.html', 'w') as file:
    # Write a string to the file
    file.write(output)
# output, errors = tidy_document(output)
# with open("out.html", 'w') as f:
#     f.write(output)