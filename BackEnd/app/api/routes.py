from flask import Blueprint, request, jsonify, render_template
from helpers import token_required
from models import db, User, Expense, Address, expense_schema, expenses_schema

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/getdata')
def getdata():
    return {'some': 'value'}

@api.route('/expense', methods = ['POST'])
@token_required
def create_expense(current_user_token):
    expense_type = request.json['expense_type']
    expense_dollar_amt = request.json['expense_dollar_amt']
    expense_mileage = request.json['expense_mileage']
    user_token = current_user_token.token

    print(f'BIG TESTER: {current_user_token.token}')

    expense = Expense(expense_type, expense_dollar_amt, expense_mileage, user_token = user_token)

    db.session.add(expense)
    db.session.commit()

    response = expense_schema.dump(expense)
    return jsonify(response)

@api.route('/expense', methods = ['GET'])
@token_required
def get_expense(current_user_token):
    a_user = current_user_token.token
    expense = Expense.query.filter_by(user_token = a_user).all()
    response = expenses_schema.dump(expense)
    return jsonify(response)

#Optional 
@api.route('/expense/<expense_id>', methods = ['GET'])
@token_required
def get_single_expense(current_user_token, expense_id):
    expense = Expense.query.get(expense_id)
    response = expense_schema.dump(expense)
    return jsonify(response)

#Update endpoint
@api.route('/expense/<id>', methods = ['POST','PUT'])
@token_required
def update_expense(current_user_token, expense_id):
    expense = Expense.query.get(expense_id) 
    expense.expense_type = request.json['expense_type']
    expense.expense_dollar_amt = request.json['expense_dollar_amt']
    expense.mileage = request.json['mileage']
    expense.user_token = current_user_token.token

    db.session.commit()
    response = expense_schema.dump(expense)
    return jsonify(response)

# Delete end
@api.route('/expense/<id>', methods = ['DELETE'])
@token_required
def delete_whiskey(current_user_token, expense_id):
    expense = Expense.query.get(expense_id)
    db.session.delete(expense)
    db.session.commit()
    response = expense_schema.dump(expense)
    return jsonify(response)