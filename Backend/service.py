import datetime
from flask import Flask
from flask import Flask, request
from flask_restful import Resource, Api, reqparse
import DB_Objects
from sqlalchemy import exists, func, and_


app = Flask(__name__)
api = Api(app)

db = DB_Objects.database()

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
        user_parser = parser.copy()
        user_parser.add_argument('race', type=str, help="No race specified")
        user_parser.add_argument('sex', type=str, help="No sex specified")
        user_parser.add_argument('height', type=int, help="No height specified")
        user_parser.add_argument('weight', type=int, help="No weight specified")
        user_parser.add_argument('age', type=int, help="No age specified")
        user_parser.add_argument('family_history', type=bool, help="No family history specified")
        args = user_parser.parse_args()

        # Check arguments exist
        if None in [args.fname, args.lname, args.email,args.race,args.sex, args.height,args.weight,args.age, args.family_history]:
            return Response.check_none_response([args.fname, args.lname, args.email,args.race,args.sex, args.height,args.weight,args.age, args.family_history],
            ['fname', 'lname', 'email','race','sex', 'height','weight','age', 'family_history'])
        
        # Check email already exist
        if db.session.query(exists().where(DB_Objects.User.email == args.email)).scalar():
            return Response(success=False, messages='Email Already Exist.').text()

        # Add new user
        try:
            family_history = args.family_history == 1
            new_user = DB_Objects.User(fname=args.fname, lname=args.lname, email=args.email,race=args.race,sex=args.sex,height=args.height,weight=args.weight,age=args.age,family_history=family_history)
            db.session.add(new_user)
            db.session.commit()
            return Response(success=True, messages='New user is created.',
                            data={"id": new_user.id, "fname": new_user.fname, "email": new_user.email}).text()
        except:
            return Response(success=False, messages='Unknown issue when adding a new user.').text()

class FindUser(Resource):
    def get(self):
        args = parser.parse_args()

        if None in [args.email]:
            return Response.check_none_response([args.email],['email'])
        
        user = db.session.query(DB_Objects.User).filter(DB_Objects.User.email == args.email).first()

        if user is None:
            return Response(success=False, messages="User is not found.").text()
        else:
            return Response(success=True,messages="User found",data={"id":user.id,"fname":user.fname,"lname":user.lname,"email":user.email}).text()

class Upload1(Resource):
    def post(self):
        p1_parser = parser.copy()
        p1_parser.add_argument('velocity', type=float, help="No velocity specified")
        p1_parser.add_argument('acceleration',type=float, help="No acceleration specified")
        p1_parser.add_argument('deceleration',type=float, help="No deceleration specified")
        p1_parser.add_argument('distance',type=float, help="No distance specified")
        p1_parser.add_argument('time',type=float, help="No time specified")
        p1_parser.add_argument('pointx',type=float, help="No point specified")
        p1_parser.add_argument('pointy',type=float, help="No point specified")
        args = p1_parser.parse_args()

        if None in [args.email,args.velocity,args.acceleration,args.deceleration,args.distance,args.time,args.pointx,args.pointy]:
            return Response.check_none_response([args.email,args.velocity,args.acceleration,args.deceleration,args.distance,args.time,args.pointx,args.pointy],['email','velocity','acceleration','deceleration','distance','time','pointx','pointy'])
        
        user = db.session.query(DB_Objects.User).filter(DB_Objects.User.email == args.email).first()
        if user is None:
            return Response(success = False, messages="User is not found").text()
        try:
            new_pd1 = DB_Objects.Paradigm1(velocity=args.velocity, acceleration=args.acceleration, deceleration=args.deceleration,distance=args.distance,time=args.time,pointx=args.pointx,pointy=args.pointy,user_id=user.id)
            db.session.add(new_pd1)
            db.session.commit()
            return Response(success=True, messages='New pd1 is created.',
                            data={"id": new_pd1.id, "fname": user.fname, "lname":user.lname}).text()
        except:
            return Response(success=False, messages='Unknown issue when adding a new paradigm.').text()


class Upload2(Resource):
    def post(self):
        p2_parser = parser.copy()
        p2_parser.add_argument('time', type=float, help="No time specified")
        p2_parser.add_argument('distanceFromEndpoint',type=float, help="No distance specified")
        p2_parser.add_argument('initialVelocity',type=float, help="No velocity specified")
        p2_parser.add_argument('pointx',type=float, help="No point specified")
        p2_parser.add_argument('pointy',type=float, help="No point specified")
        args = p2_parser.parse_args()

        if None in [args.email,args.time,args.distanceFromEndpoint,args.initialVelocity,args.pointx,args.pointy]:
            return Response.check_none_response([args.email,args.time,args.distanceFromEndpoint,args.initialVelocityargs.pointx,args.pointy],['email','time','distanceFromEndpoint','initialVelocity','pointx','pointy'])
        
        user = db.session.query(DB_Objects.User).filter(DB_Objects.User.email == args.email).first()
        if user is None:
            return Response(success = False, messages="User is not found").text()
        try:
            new_pd2 = DB_Objects.Paradigm2(time=args.time,distanceFromEndpoint=args.distanceFromEndpoint,initialVelocity=args.initialVelocity,pointx=args.pointx,pointy=args.pointy,user_id=user.id)
            db.session.add(new_pd2)
            db.session.commit()
            return Response(success=True, messages='New pd2 is created.',
                            data={"id": new_pd2.id, "fname": user.fname, "lname":user.lname}).text()
        except:
            return Response(success=False, messages='Unknown issue when adding a new paradigm.').text()
class Upload3(Resource):
    def post(self):
        p3_parser = parser.copy()
        p3_parser.add_argument('shape', type=str, help="No shape specified")
        args = p3_parser.parse_args()

        if None in [args.email,args.shape]:
            return Response.check_none_response([args.email,args.shape],['email','shape'])
        
        user = db.session.query(DB_Objects.User).filter(DB_Objects.User.email == args.email).first()
        if user is None:
            return Response(success = False, messages="User is not found").text()
        try:
            new_pd3 = DB_Objects.Paradigm3(shape=args.shape,user_id=user.id)
            db.session.add(new_pd3)
            db.session.commit()
            return Response(success=True, messages='New pd3 is created.',
                            data={"id": new_pd3.id, "fname": user.fname, "lname":user.lname}).text()
        except:
            return Response(success=False, messages='Unknown issue when adding a new paradigm.').text()

class Results1(Resource):
    def get(self):
        arg = parser.parse_args()

        if None in [arg.email]:
            return Response.check_none_response([arg.email],['email'])
        
        user = db.session.query(DB_Objects.User).filter(DB_Objects.User.email == arg.email).first()

        if user is None:
            return Response(success=False, messages="User is not found.").text()
        
        results = db.session.query(DB_Objects.Paradigm1).filter(DB_Objects.Paradigm1.user_id == user.id).all()
        li = [{'velocity':args.velocity, 'acceleration':args.acceleration,'deceleration':args.deceleration,'distance':args.distance,'time':args.time,'pointx':args.pointx,'pointy':args.pointy,'user_id':user.id} for args in results]
        return Response(success=True,messages="User found",data=li).text()


class Results2(Resource):
    def get(self):
        arg = parser.parse_args()

        if None in [arg.email]:
            return Response.check_none_response([arg.email],['email'])
        
        user = db.session.query(DB_Objects.User).filter(DB_Objects.User.email == arg.email).first()

        if user is None:
            return Response(success=False, messages="User is not found.").text()
        
        results = db.session.query(DB_Objects.Paradigm2).filter(DB_Objects.Paradigm2.user_id == user.id).all()
        li = [{'time':args.time,'distanceFromEndpoint':args.distanceFromEndpoint,'initialVelocity':args.initialVelocity,'pointx':args.pointx,'pointy':args.pointy,'user_id':user.id} for args in results]
        return Response(success=True,messages="User found",data=li).text()
class Results3(Resource):
    def get(self):
        arg = parser.parse_args()

        if None in [arg.email]:
            return Response.check_none_response([arg.email],['email'])
        
        user = db.session.query(DB_Objects.User).filter(DB_Objects.User.email == arg.email).first()

        if user is None:
            return Response(success=False, messages="User is not found.").text()
        
        results = db.session.query(DB_Objects.Paradigm3).filter(DB_Objects.Paradigm3.user_id == user.id).all()
        li = [{'shape':args.shape,'user_id':user.id} for args in results]
        return Response(success=True,messages="User found",data=li).text()

class Predict(Resource):
    return {"hello":"world"}

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
api.add_resource(FindUser, '/user/find')
api.add_resource(Results1, '/paradigm1/results')
api.add_resource(Upload1, '/paradigm1/upload')
api.add_resource(Results2, '/paradigm2/results')
api.add_resource(Upload2, '/paradigm2/upload')
api.add_resource(Results3, '/paradigm3/results')
api.add_resource(Upload3, '/paradigm3/upload')
api.add_resource(Predict, '/predict')


if __name__ == "__main__":
    app.run(debug=True)
