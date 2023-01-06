import sys
import json
import ast #abstract syntax tree

data_to_pass_back = 'send this to node process'

# string
# input = sys.argv[1]
# output = data_to_pass_back
# print(output)

#list
input = ast.literal_eval(sys.argv[1])
# print(sys.argv[1])
output = input
output.append(data_to_pass_back)
print(json.dumps((output)))

sys.stdout.flush()


# Ref: https://dataanalyticsireland.ie/2021/12/13/how-to-pass-a-javascript-variable-to-python-using-json/

# from flask import request
# from flask import Flask, render_template

# app = Flask(__name__)
# @app.route('/test', methods=['POST'])
# def test():
#     output = request.get_json()
#     print(output) # This is the output that was stored in the JSON within the browser
#     print(type(output))
#     result = json.loads(output) #this converts the json output to a python dictionary
#     print(result) # Printing the new dictionary
#     print(type(result))#this shows the json converted as a python dictionary
#     return result

from subprocess import Popen
Popen(['date', '-R'])