import datetime
from flask import Flask
from flask import Flask, request
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)

#db = DB_objects.database()

#@app.route("/")
class HelloWorld(Resource):
    def get(self):
        return {'Hello': 'World'}

# URL Management
api.add_resource(HelloWorld, '/')

if __name__ == "__main__":
    app.run(debug=True)
