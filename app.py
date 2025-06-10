from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/')
def home():
    url = 'https://api.frankfurter.app/currencies'
    response = requests.get(url)
    data = response.json()
    currencies = list(data.keys())

    return render_template('index.html', currencies=currencies)

if __name__ == '__main__':
    app.run(debug=True)
