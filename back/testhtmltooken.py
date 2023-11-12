import subprocess


# from bs4 import BeautifulSoup
# # Read the HTML file
# with open('Blog — Wikipédia.html', 'r', encoding='utf-8') as file:
#     html_content = file.read()

# # Create a BeautifulSoup object
# soup = BeautifulSoup(html_content, 'html.parser')

# # Get all text from the HTML
# all_text = soup.get_text()

# print(all_text)


def convert_pdf_to_html(pdf_path, output_path):
    try:
        subprocess.run(['pdf2htmlEX', pdf_path, output_path], check=True)
        print(f"PDF converted to HTML successfully. HTML file available at {output_path}.")
    except subprocess.CalledProcessError as e:
        print(f"Conversion failed. Error: {e}")



# Replace 'input.pdf' with your input PDF file and 'output.html' with your desired output HTML file.
input_pdf = '/sujet1.pdf'
output_html = 'output.html'

convert_pdf_to_html(input_pdf, output_html) 