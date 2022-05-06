import requests, csv, os, django, re
from bs4 import BeautifulSoup

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "back.settings")
django.setup()
from recommend.models import User, Problem, Recommend

headers = {'User-Agent':'Chrome/101.0.4951.41'}

f = open(r"C:\Users\김성준\Desktop\back\csv\text.csv", 'a', encoding='utf-8', newline='')
wr = csv.writer(f)
for num in range(14458, 14459):
    prob = Problem.objects.get(id=num)
    url = "https://www.acmicpc.net/problem/" + (str)(prob.number)
    webpage = requests.get(url, headers=headers)

    soup = BeautifulSoup(webpage.content, 'html.parser', from_encoding='euc-kr')
    string = (str)(soup.p)
    string = re.sub('<.+?>', '', string)
    wr.writerow([num, string])
    print(num)
f.close