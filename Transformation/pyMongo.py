# Ref: https://ithelp.ithome.com.tw/articles/10238155
# Ref: https://stackoverflow.com/questions/42718547/how-to-connect-remote-mongodb-with-pymongo
# Ref: https://www.mongodb.com/languages/python/pymongo-tutorial
# Ref: https://learnopencv.com/blob-detection-using-opencv-python-c/

import sys

from dotenv import dotenv_values
config = dotenv_values(".env")
from pymongo import MongoClient
# import pymongo
import wand
from wand.image import Image as wImage

import base64
from PIL import Image
import io
import binascii
import requests
from io import BytesIO

# def trace(frame, event, arg):
#     print("%s, %s:%d" % (event, frame.f_code.co_filename, frame.f_lineno))
#     return trace
# sys.settrace(trace)

mongodb_client = MongoClient(config["MONGO_URL"])
# print(mongodb_client)
# database = mongodb_client[config["DB_NAME"]]
database = mongodb_client["test"]
# print(database)
print("Connected to the MongoDB database!")

temp = database["images"].find_one({"name": "306579.jpg"})
# print(temp)
print(temp.keys())
print('name: ',temp["name"])
print('link: ',temp["link"])
print('img:', temp['img'])

b_data = binascii.b2a_base64(temp['img'])
print('b_data',b_data)
# print(type(b_data))
imgdata = base64.b64decode(b_data)
print('imgdata',imgdata)
# print(type(imgdata))

url_data = binascii.b2a_base64(temp['link'])
# print(url_data)
# print(type(url_data))

# response = requests.get(url_data)
# img = Image.open(BytesIO(response.content))
# print(img)

filename = "some_image.jpeg"
with open(filename, "wb") as f:
    f.write(imgdata)

with wImage(blob=temp["link"]) as img:
    print('width =', img.width)
    print('height =', img.height)
    # wand.display.display(img)