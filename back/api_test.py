import urllib.request
import urllib.parse
import json

url = urllib.request.Request("https://solved.ac/api/v3/problem/show?problemId=13700")
url.add_header("Content-Type", "application/json")
data = urllib.request.urlopen(url)
data = data.read()
data = json.loads(data.decode('utf-8'))
print(data["tags"][0]["problemCount"])