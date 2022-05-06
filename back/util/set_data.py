import os
import django
import csv

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "back.settings")
django.setup()
from recommend.models import User, Problem, Recommend, Text

#f = open(r"C:\Users\김성준\Desktop\back\csv\user.csv")
#rdcsv = csv.reader(f)
#for line in rdcsv:
#    obj = User(id=line[0], name=line[1])
#    obj.save()
#f.close()

#f = open(r"C:\Users\김성준\Desktop\back\csv\problem.csv")
#rdcsv = csv.reader(f)
#for line in rdcsv:
#    obj = Problem(id=line[0], number=line[1])
#    obj.save()
#f.close()

#f = open(r"C:\Users\김성준\Desktop\back\csv\recommend.csv")
#rdcsv = csv.reader(f)
#for line in rdcsv:
#    obj = Recommend(id=line[0], problems={
#        'problemList': [line[1], line[2], line[3], line[4], line[5], line[6], line[7], line[8], line[9], line[10]]
#        })
#    obj.save()
#    print(line[0])
#f.close()

f = open(r"C:\Users\김성준\Desktop\back\csv\text.csv", encoding="UTF-8")
rdcsv = csv.reader(f)
for line in rdcsv:
    obj = Text(id=line[0], text=line[1])
    obj.save()
    print(line[0])
f.close()