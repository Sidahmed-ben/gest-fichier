import os
from dbHandler import get_text_cloud
from bs4 import BeautifulSoup
import subprocess
import pypandoc


# The function that reads files directory and returns 
# the content and the path of each file
def read_directory (directory_path):
    # Initialize file_content_list
    file_content_list = []
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            file_path = os.path.join(root, file)
            # If the file is txt file
            if file.endswith(".txt"):
                # save the content and the path of each file
                with open(file_path, "r") as f:
                    file_content_list.append({
                        'file_path': file_path,
                        'content': f.read(),
                    })
            elif file.endswith(".html"):
                with open(file_path, 'r', encoding='utf-8') as file:
                    file_content_list.append({
                            'file_path': file_path,
                            'content': getHtmlContent(file),
                        })
            elif file.endswith(".pdf"):
                # Convert pdf to html
                output_html = "./converted-html/output.html"
                convert_pdf_to_html(file_path, output_html)
                with open(output_html, 'r', encoding='utf-8') as file:
                    file_content_list.append({
                            'file_path': file_path,
                            'content': getHtmlContent(file),
                        })
                delete_html_file(output_html)
            elif file.endswith(".docx"):
                # Convert pdf to html
                output_html = "./converted-html/output.html"
                convert_docx_to_html(file_path, output_html)
                with open(output_html, 'r', encoding='utf-8') as file:
                    file_content_list.append({
                            'file_path': file_path,
                            'content': getHtmlContent(file),
                        })
                # delete_html_file(output_html)


    return file_content_list



def getHtmlContent(file):
        html_content = file.read()
        # Create a BeautifulSoup object
        soup = BeautifulSoup(html_content, 'html.parser')
        # Get all text from the HTML
        all_text = soup.get_text()
        return all_text
    
def explorer_dossier(db,chemin):
    if os.path.isdir(chemin):
        arborescence = {"files": []}
        for element in os.listdir(chemin):
            element_chemin = os.path.join(chemin, element)
            if os.path.isfile(element_chemin):
                title_content = ""
                start =""
                if (element_chemin.endswith(".html")):
                    with open(element_chemin, "r") as f:
                        # Parse the HTML content
                        soup = BeautifulSoup(f.read(), 'html.parser')
                        # Find the title tag and get its content
                        all_text = soup.get_text()
                        text = soup.find('p')
                        start = text.get_text().replace('\n', '')[0:300]+"..." 
                        print("start ================== ",start)
                        title_tag = soup.find('title')
                        if title_tag:
                            title_content = title_tag.get_text()
                elif element_chemin.endswith(".pdf"):
                    # Convert pdf to html
                    output_html = "./converted-html/output.html"
                    convert_pdf_to_html(element_chemin, output_html)
                    with open(output_html, 'r', encoding='utf-8') as f:
                        soup = BeautifulSoup(f.read(), 'html.parser')
                        all_text = soup.get_text()
                        start = all_text.replace('\n', '')[51:400] +"..."
                        # Find the title tag and get its content
                        title_tag = soup.find('title')
                        if title_tag:
                            title_content = title_tag.get_text()
                    delete_html_file(output_html)
                elif element_chemin.endswith(".docx"):
                    # Convert pdf to html
                    output_html = "./converted-html/output.html"
                    convert_docx_to_html(element_chemin, output_html)
                    with open(output_html, 'r', encoding='utf-8') as f:
                        soup = BeautifulSoup(f.read(), 'html.parser')
                        all_text = soup.get_text()
                        start = all_text.replace('\n', '')[53:400] +"..."
                        # Find the title tag and get its content
                        title_tag = soup.find('title')
                        if title_tag:
                            title_content = title_tag.get_text()
                if element_chemin.endswith(".txt"):
                # save the content and the path of each file
                    with open(element_chemin, "r") as f:
                        start = f.read()[0:300] 
                        
                    
                obj = {
                    "path":element_chemin,
                    "cloud": get_text_cloud(db,element_chemin),
                    # 'content': getHtmlContent(element_chemin)
                    "title": title_content,
                    "start": start
                }
                arborescence["files"].append(obj)
            elif os.path.isdir(element_chemin):
                sous_arborescence = explorer_dossier(db,element_chemin)
                arborescence[element_chemin] = sous_arborescence

        return arborescence
    else:
        return None
    
    

def convert_docx_to_html(docx_path,output_html):
    output = pypandoc.convert_file(docx_path, 'html')
    with open(output_html, 'w') as file:
        file.write(output)

def convert_pdf_to_html(pdf_path, output_html):
    try:
        result = subprocess.run(['pdf2txt.py', '-o', output_html, pdf_path], stdout=subprocess.PIPE, text=True)
        # print(result.stdout)
        # print(" HTML file "+output_html +" created succeffully")
    except subprocess.CalledProcessError as e:
        print(f"Conversion failed. Error: {e}")



def delete_html_file(html_path):
    # Example 1: Run a simple shell command
    result = subprocess.run(['rm', html_path], stdout=subprocess.PIPE, text=True)
    # print(result.stdout)
    # print(" HTML file "+ html_path +" deleted succeffully")

