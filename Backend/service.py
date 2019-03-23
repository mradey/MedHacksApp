import datetime
from flask import Flask
from flask import Flask, request
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)

#db = DB_objects.database()

parser = reqparse.RequestParser()
parser.add_argument('fname', type=str, help="No first name specified")
parser.add_argument('lname', type=str, help="No last name specified")
parser.add_argument('email', type=str, help="No email specified")

class HelloWorld(Resource):
    def get(self):
        return {'Hello': 'World'}

class CreateUser(Resource):
    #add a new user
    def post(self):
        #parse arguments
        args = parser.parse_args()
        # Check arguments exist
        if None in [args.fname, args.lname, args.email]:
            return Response.check_none_response([args.fname, args.lname, args.email],['Fname', 'Lname', 'Email'])
                # Check email already exist
        if db.session.query(exists().where(DB_objects.User.email == args.email)).scalar():
            return Response(success=False, messages='Email Already Exist.').text()

        # Add new user
        try:
            new_user = DB_objects.User(fname=args.name, lname=args.lname, email=args.email)
            new_user.hash_password(args.password)
            db.session.add(new_user)
            db.session.commit()
            return Response(success=True, messages='New user is created.',
                            data={"id": new_user.id, "name": new_user.name, "email": new_user.email}).text()
        except:
            return Response(success=False, messages='Unknown issue when adding a new user.').text()


class Response:
    def __init__(self, success, messages, data=None):
        self.success = success
        if type(messages) == str:
            messages = [messages]
        self.messages = messages
        self.data = data

    def text(self):
        return {'success': self.success, 'messages': self.messages, 'data': self.data}

    @staticmethod
    def check_none_response(fields, text):
        messages = []
        for index, field in enumerate(fields):
            if field is None:
                messages.append(text[index] + " cannot be empty.")
        return Response(success=False, messages=messages).text()


# URL Management
api.add_resource(HelloWorld, '/')
api.add_resource(CreateUser, '/user/create')

if __name__ == "__main__":
    app.run(debug=True)
