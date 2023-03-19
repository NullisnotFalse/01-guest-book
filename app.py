from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://admin:<비밀번호>@cluster0.exhnk9h.mongodb.net/<>?retryWrites=true&w=majority')
db = client.dbsparta

from bson import ObjectId
from datetime import datetime
import pytz


@app.route('/')
def home():
    return render_template('index.html')


@app.route("/homework", methods=["POST"])
def homework_post():
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']
    password_receive = request.form['password_give']

    time_zone = pytz.timezone('Asia/Seoul')
    current_time = datetime.now(time_zone).strftime("%m-%d %H:%M")

    doc = {
        'name':name_receive,
        'comment':comment_receive,
        'password':password_receive,
        'time':current_time
    }
    db.homework.insert_one(doc)

    comment_list = []
    for doc in db.homework.find():
        doc['_id'] = str(doc['_id'])
        comment_list.append(doc)

    # 가장 마지막에 넣은 데이터의 '_id'값을 가져오는 코드
    # _id = str(db.homework.find_one(sort=[('_id', -1)])['_id'])

    return jsonify({'comment_list':comment_list,'msg':'응원 완료!'})


@app.route("/homework/check", methods=["POST"])
def homework_check():
    num_receive = request.form['num_give']
    pw_check_receive = request.form['pw_check_give']
    _id_receive = request.form['_id_give']

    comment_list = []
    for doc in db.homework.find():
        doc['_id'] = str(doc['_id'])
        comment_list.append(doc)

    if comment_list[int(num_receive)]['_id'] == _id_receive:
        if comment_list[int(num_receive)]['password'] == pw_check_receive:
            db.homework.delete_one({'_id': ObjectId(_id_receive)})
            return jsonify({'msg': '삭제 완료!','reload':'1'})
        else:
            return jsonify({'msg': '비밀번호가 일치하지 않습니다.', 'reload':'0'})
    else:
        return jsonify({'msg': '비밀번호가 일치하지 않습니다.', 'reload':'0'})


@app.route("/homework", methods=["GET"])
def homework_get():
    comment_list = []
    for doc in db.homework.find():
        doc['_id'] = str(doc['_id'])
        comment_list.append(doc)

    return jsonify({'comment_list':comment_list})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
