FROM python:3

WORKDIR /code
COPY . .
RUN pip install -r requirements.txt

EXPOSE 5000
CMD python api/app.py