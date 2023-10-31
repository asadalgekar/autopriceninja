from flask import Flask, render_template, url_for, jsonify, request
import requests, pickle, datetime
import pandas as pd
from decouple import config
# Load the trained machine learning model
with open('RandomForestRegressionModel.pkl', 'rb') as model_file:
    machine_learning_model = pickle.load(model_file)

app = Flask(__name__)



# Access the API key
API_KEY = config('API_KEY')


@app.route("/")
def home():
   
   

    return render_template('home.html')


@app.route("/price", methods=['GET', 'POST'])
def price():
    if request.method == 'POST':
        make = request.form.get('make')
        model = request.form.get('model')
        year = request.form.get('year')
     
    url = f'https://car-api2.p.rapidapi.com/api/trims?verbose=yes&&year=2015&year=2016&year=2017&year=2018&year=2019&year=2020&direction=asc&sort=id&model={model}'
    headers = {
        'X-RapidAPI-Key': API_KEY,
    }
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
        else:
            print(f'API request failed with status code {response.status_code}')
    except Exception as e:
        print(f'API Server Errors: {e}')
    return render_template('price.html', make=make, model=model, year=year, trim=data['data'])


@app.route('/get_data_from_flask', methods=['GET'])
def get_data_from_flask():
    odometer = float(request.args.get('odometer'))
    make = request.args.get('make')
    model = request.args.get('model')
    year = int(request.args.get('year'))
    current_year = datetime.datetime.now().year
    age = current_year  - year

     # Create a DataFrame with the input data
    data = pd.DataFrame([[year, make, model, "fair", odometer, age],
                         [year, make, model, "good", odometer, age],
                         [year, make, model, "excellent", odometer, age]],
                        columns=["year", "manufacturer", "model", "condition", "odometer", "age"])

    # Use the loaded machine learning model to predict the prices for different conditions
    predicted_prices = machine_learning_model.predict(data)

    # Extract the predicted prices for each condition
    predicted_price_fair = predicted_prices[0]
    predicted_price_good = predicted_prices[1]
    predicted_price_excellent = predicted_prices[2]

    return jsonify({'fair_price': predicted_price_fair, 'good_price': predicted_price_good, 'excellent_price': predicted_price_excellent})

if __name__ == "__main__":
    app.run(port=8000, debug=True)