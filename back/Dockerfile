FROM python:3.8.9

ENV PYTHONUNBUFFERED 1 

RUN apt-get -y update 
RUN apt-get -y install vim

RUN mkdir /srv/docker-server
ADD . /srv/docker-server

WORKDIR /srv/docker-server

EXPOSE 8000

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

RUN python manage.py migrate