FROM python:3.7.3

WORKDIR /app

COPY . /app

RUN python3 -m pip install -r requirements.txt

RUN python3 -m pip install pymongo[srv]

CMD [ "python3", "src/handlers.py" ]