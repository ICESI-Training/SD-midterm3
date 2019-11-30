FROM python:3.7.3

RUN mkdir /code

WORKDIR /code

COPY . /code

RUN python3 -m pip install -r requirements.txt

RUN python3 -m pip install pymongo[srv]

EXPOSE 5050

CMD [ "python3", "src/handlers.py" ]