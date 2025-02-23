import os
import time
from datetime import datetime
import threading
from flask import Flask, request, jsonify
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from datetime import datetime
from config import init_db
from dotenv import load_dotenv
import uuid
import jwt
import requests
from flask_socketio import SocketIO, emit
import json
from dotenv import load_dotenv

from flask_cors import CORS
load_dotenv(".env")  # Explicitly load the .env file
print(os.getenv("TWILIO_ACCOUNT_SID"))

app = Flask(__name__)
CORS(app)
mysql = init_db(app)
socketio = SocketIO(app, cors_allowed_origins="*") 
# print(TWILIO_ACCOUNT_SID)
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
ADMIN_PHONE_NUMBER='whatsapp:+62' #ur twilio phone number
TWILIO_PHONE_NUMBER='whatsapp:+14155238886'
SECRET_KEY='TEST'

if not all([TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, ADMIN_PHONE_NUMBER]):
    print("Missing one or more environment variables for Twilio.")

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

running = True
timer_thread = None
stop_timer_event = threading.Event()


@socketio.on('connect')
def handle_connect():
    print("Client connected")

@socketio.on('updateMessage')
def handle_update_message():
    socketio.emit('update-value')

@socketio.on('new_ticket')
def handle_new_ticket():
    socketio.emit('update-ticket')

# @socketio.on('disconnect')
# def handle_disconnect():
#     print('Client disconnected')

def classify_greetings():


def generate_ticket_code():
    cur = mysql.connection.cursor()
    cur.execute("SELECT ticket_code FROM tickets ORDER BY request_submitted DESC LIMIT 1")
    last_ticket = cur.fetchone()
    cur.close()
    if (last_ticket == None):
        new_number=1
    else:
        last_code = last_ticket[0]
        last_number = int(last_code.split('CODE')[1]) if last_code.startswith('CODE') else False
        new_number = last_number + 1

    # if last_ticket:
    #     last_code = last_ticket[0]
    #     last_number = int(last_code.split('CODE')[1]) if last_code.startswith('CODE') else False
    #     new_ticket_code = f"CODE{str(last_number+1).zfill(4)}"

    #     new_number = last_number + 1
    # else:
    #     new_number = 1

    return f'CODE{new_number:04d}'  



def get_operational_hours():
    now = datetime.now()
    if now.weekday() < 5 and 8 <= now.hour < 24:
        messagage = 
        return ("Selamat siang,\n\nTerima kasih telah menghubungi WhatsApp Center.\n\n"
                "Untuk mendapatkan update terbaru mengenai, silahkan follow dan pantau terus "
                
                )
    return None

def get_all_categories():
    cur = mysql.connection.cursor()
    cur.execute("SELECT text, number FROM categories")
    categories = cur.fetchall()
    cur.close()
    return categories

def get_questions_by_category_id(category_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT number, text FROM table_questions WHERE category_id = %s", (category_id, ))
    questions = cur.fetchall()
    cur.close()
    return questions

def get_text_category_by_category_id(category_id):
    cur = mysql.connection.cursor()
    cur.excecute("Select text, text FROM table_category WHERE category_id = %s", (category_id, ))
    text = cur.fetchall()
    cur.close()
    return text

def get_ro_list():
    cur = mysql.connection.cursor()
    cur.execute("SELECT number, ro FROM table_regional_office")
    regional_office = cur.fetchall()
    cur.close()
    return regional_office

def get_ro_by_number(number):
    cur = mysql.connection.cursor()
    cur.execute("SELECT id FROM table_regional_office WHERE number= %s", (number,))
    id = cur.fetchone()
    cur.close()
    return id[0]


def get_ticket_by_phone(phone_number):
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, token FROM tickets WHERE phone_number = %s AND STATUS = 'active'", (phone_number,))
    result = cur.fetchone()
    cur.close()
    
    if result:
        id, token = result
        return id, token
    else:
        return None 

def get_token_by_id(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT token FROM tickets WHERE id = %s", (id, ))
    token = cur.fetchone()
    cur.close()
    return token[0]

def get_category_id_by_number(category_number):
    cur = mysql.connection.cursor()
    cur.execute("SELECT id FROM categories WHERE number = %s", (category_number,))
    category_data = cur.fetchone()
    cur.close()
    return category_data[0] if category_data else None

def get_answer_by_question_id(category_id, question_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT answer FROM table_questions WHERE category_id = %s AND number = %s", (category_id, question_id))
    question_data = cur.fetchone()
    cur.close()
    return question_data[0] if question_data else None

def update_user_status(phone_number, status):
    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE table_users 
        SET status = %s 
        WHERE id = (
            SELECT id FROM (SELECT id FROM table_users WHERE phone_number = %s ORDER BY id DESC LIMIT 1) AS subquery
        )
    """, (status, phone_number))
    mysql.connection.commit()
    cur.close()

def update_category_id(phone_number, category_id):
    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE table_users 
        SET category_id = %s 
        WHERE id = (
            SELECT id FROM (SELECT id FROM table_users WHERE phone_number = %s ORDER BY id DESC LIMIT 1) AS subquery
        )
    """, (category_id, phone_number))
    mysql.connection.commit()
    cur.close()

def create_new_user(phone_number, category_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT id FROM table_users WHERE phone_number = %s ORDER BY id DESC LIMIT 1", (phone_number,))
    latest_id = cur.fetchone()

    if latest_id:
        cur.execute("""
            UPDATE table_users 
            SET category_id = %s 
            WHERE id = (
                SELECT id FROM (SELECT id FROM table_users WHERE phone_number = %s ORDER BY id DESC LIMIT 1) AS subquery
            )
        """, (category_id, phone_number))
        update_user_status(phone_number, 1)
    else:
        cur.execute("INSERT INTO table_users (status, category_id, phone_number) VALUES (0, %s, %s)", (category_id, phone_number))

    mysql.connection.commit()
    cur.close()


def create_new_message(message, ticket_id):
    cur = mysql.connection.cursor()
    id = uuid.uuid4().hex
    updated_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Format datetime
    role = 'user'
    
    try:
        # Execute the query with parameters
        cur.execute("""
            INSERT INTO messages (id, ticket_id, message, role, updated_at)
            VALUES (%s, %s, %s, %s, %s)
        """, (id, ticket_id, message, role, updated_at))
        mysql.connection.commit()  # Commit the transaction
        return True
    except Exception as e:
        print(f"Error occurred: {e}")
        mysql.connection.rollback()
        return False
    finally:
        cur.close()

def create_new_ticket(phone_number, ro, category):
    ticket_code = generate_ticket_code()  # Generate ticket code
    request_submitted = datetime.now()
    status= 'non-active'
    id = uuid.uuid4().hex

    cur = mysql.connection.cursor()
    
    try:
        # Execute the query with parameters
        payload = {
            'id': id
        }

        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        cur.execute("""
            INSERT INTO tickets (id, phone_number, request_submitted, STATUS, ticket_code ,token, ro,category)
            VALUES (%s, %s, %s, %s, %s, %s, %s,%s)
        """, (id, phone_number, request_submitted, status,ticket_code, token, ro, category))
        mysql.connection.commit()

        return True, ticket_code, token
    except Exception as e:
        print(f"Error occurred: {e}")
        mysql.connection.rollback()
        return False
    finally:
        cur.close()


def get_length_table(table_name):
    cur = mysql.connection.cursor()
    cur.execute("SELECT COUNT(*) FROM {}".format(table_name)),
    count = cur.fetchone()[0]

    return count

def handle_initial_message(phone_number, message):
    categories = get_all_categories()

    count = len(categories) + 1
    category_id = get_category_id_by_number(message)
    if category_id is None:
        create_new_user(phone_number, category_id)
    elif int(message) == count:
        update_user_status(phone_number, 2)
    else:
        update_category_id(phone_number, category_id)
        update_user_status(phone_number, 1)

def handle_message(phone_number, message):
    cur = mysql.connection.cursor()
    cur.execute("SELECT category_id, status FROM table_users WHERE phone_number = %s ORDER BY id DESC LIMIT 1", (phone_number,))
    user_data = cur.fetchone()

    category_id = get_category_id_by_number(message)
    
    if user_data:
        category_id, status = user_data
        status = int(status)
        if status == 1 and message.isdigit():
            answer = get_answer_by_question_id(category_id, message)
            if answer:
                update_user_status(phone_number, 0)
                return answer
        elif status == 0 and message.isdigit():
            update_category_id(phone_number, category_id)
    
    return None

def handle_user_message(user_id, message):
    client.messages.create(
        body=f"ID {user_id}: {message}",
        from_=TWILIO_PHONE_NUMBER,
        to=ADMIN_PHONE_NUMBER
    )
    global running
    running = False

def new_timestamp():
    timestamp = time.time()
    datetime_format = datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')
    admin_phone_number = ADMIN_PHONE_NUMBER.split(':')[1]

    cur = mysql.connection.cursor()

    id = request.values.get('Body').split(':')[0]
    user_id = int(id)
    cur.execute("INSERT INTO admin(phone_number, user_id, updated_at) VALUES (%s, %s, %s)", (phone_number, user_id, datetime_format))
    mysql.connection.commit()
    cur.close()

def new_admin(admin_phone_number):
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO admin(phone_number) VALUES (%s)", (phone_number,))
    mysql.connection.commit()
    cur.close()

def delete_admin_rows(admin_phone_number):
    cur = mysql.connection.cursor()
    delete = f"""WITH CTE AS (
                    SELECT 
                        id,
                        ROW_NUMBER() OVER (PARTITION BY phone_number ORDER BY updated_at) AS rn
                    FROM 
                        table_admin
                    WHERE 
                        phone_number = {admin_phone_number}
            )
            DELETE FROM table_admin
            WHERE id IN (
                SELECT id
                FROM CTE
                WHERE rn > 1
        );
    """

    cur.execute(delete)
    mysql.connection.commit()
    cur.close()
    
def send_reminder(user_phone_number):
    client.messages.create(
        body='Apakah pertanyaan Anda sudah terjawab?',
        from_=TWILIO_PHONE_NUMBER,
        to='whatsapp:' + user_phone_number
    )

def send_end_session(user_phone_number):
    cur = mysql.connection.cursor()
    cur.execute("SELECT phone_number FROM admin ORDER BY id DESC LIMIT 1")
    admin_data = cur.fetchone()
    admin_phone_number = admin_data[0]

    client.messages.create(
        body='Terima kasih telah bertanya kepada kami.',
        from_=TWILIO_PHONE_NUMBER,
        to='whatsapp:' + user_phone_number
    )
    update_user_status(user_phone_number, 0)
    delete_admin_rows(admin_phone_number)
    
def start_timer(duration):
    global running, stop_timer_event
    print("Timer started for", duration, "second.")
    start_time = time.time()
    end_time = start_time + duration
    
    while time.time() < end_time:
        elapsed_time = time.time() - start_time
        if stop_timer_event.is_set():
            print("Timer was stopped")
            return False
        if not running:
            print("User sent a message during the timer.")
            return
        time.sleep(1)
        print(f"Elapsed time: {int(elapsed_time)} seconds.")

def start_timer_thread(duration):
    global timer_thread, stop_timer_event, running

    if timer_thread and timer_thread.is_alive():
        stop_timer_event.set()
        timer_thread.join()

    stop_timer_event.clear()
    running = True
    timer_thread = threading.Thread(target=start_timer, args=(duration,))
    timer_thread.start()

def main(user_phone_number, message):
    global running
    running = False
    user_data = handle_admin_message(user_phone_number, message)

    admin_phone_number = user_data[-1]
    last_updated_at = user_data[0]
    
    if last_updated_at:
        start_timer_thread(10)
        timer_thread.join()

        if running:
            print("Reminder set")
            print("Starting second timer for 30 seconds.")
            send_reminder(user_phone_number)
            start_timer_thread(10)
            timer_thread.join()

            if running:
                print("Session end")
                send_end_session(user_phone_number)

def handle_admin_message(user_phone_number, message):
    try:
        admin_phone_number = ADMIN_PHONE_NUMBER.split(':')[1]
        message_content = message.split(': ')[1]
        client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to='whatsapp:' + user_phone_number
        )
        new_timestamp()

        global running
        running = True
        
        cur = mysql.connection.cursor()
        cur.execute("SELECT updated_at FROM admin WHERE phone_number = %s ORDER BY id DESC LIMIT 1", (phone_number,))
        result = cur.fetchone()
        cur.close()

        if result:
            return result[0], user_phone_number
        else:
            print("No records found for the admin phone number")

    except Exception as e:
        print(f"An error occurred: {e}")

@app.route('/message', methods=['POST'])
def reply():
    role = request.args.get('role')
    if role == 'admin':
        data = request.get_json()
        message = data.get('message')
        phone_number = data.get('phone_number')
        client_message = client.messages.create(
            from_=TWILIO_PHONE_NUMBER,
            to="whatsapp:"+phone_number,
            body=message,
        )

        if client_message:
            return jsonify({'message': 'Post created successfully!'}), 201
        else:
            return jsonify({'message': 'Failed to create post!'}), 400
    else:
        response = MessagingResponse()
        message = request.form.get('Body').strip()
        phone_number = request.form.get('From').split(':')[1]
        menu_text = "Ketik _menu_ untuk kembali ke awal"
        
        operational_hours = get_operational_hours()
        if not operational_hours:
            response.message(
                "Terima Kasih Anda sudah menghubungi WhatsApp Center.\n\nMohon maaf saat ini fitur chat sedang tidak aktif. "
                "Silahkan hubungi kembali pada:\n\nSenin - Jumat : 08.00 - 16.30 WIB\n\n "
                
                
            )
            return str(response)

        cur = mysql.connection.cursor()
        cur.execute("SELECT category_id, status FROM table_users WHERE phone_number = %s ORDER BY id DESC LIMIT 1", (phone_number,))
        user_data = cur.fetchone()

        cur.execute("SELECT id FROM admin WHERE phone_number = %s ORDER BY id DESC LIMIT 1", (phone_number,))
        id_admin = cur.fetchone()
        cur.close()

        if user_data:
            category_id, status = user_data
            questions = get_questions_by_category_id(category_id)

            if status == '1':
                if message.isdigit():
                    if int(message) > len(questions) and category_id == 3:
                        ro_list = get_ro_list()
                        answer = '\n'.join(f"{number}. {ro}" for number, ro in ro_list)
                        response.message(f'Silahkan ketik nomor Regional Office\n{answer}\n\n{menu_text}')
                        update_user_status(phone_number, 3)
                    else:
                        answer = handle_message(phone_number, message)
                        if answer:
                            response.message(answer)
                        elif int(message) == len(questions) + 1:
                            update_user_status(phone_number, 2)
                            response.message('Anda sedang berbicara dengan admin sekarang')
                elif message.lower() == 'menu':
                    categories = get_all_categories()
                    update_user_status(phone_number, 0)
                    categories_text = "\n".join([f"Ketik {index} untuk informasi {cat[0]}" for index, cat in enumerate(categories, start=1)])
                    length_of_categories = len(categories)
                    # another_text = "Ketik {} untuk informasi lainnya".format(length_of_categories + 1)
                    response.message(f"{operational_hours}\nApa yang bisa kami bantu?\n{categories_text}")
                else:
                    response.message('Pesan yang Anda berikan tidak sesuai dengan ketentuan yang ada.')
            elif status == '3':
                data_ticket = get_ticket_by_phone(phone_number)
                if data_ticket is not None:
                    id, token = data_ticket
                    headers = {
                        'Authorization': f'Bearer {token}',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }   
                    body = {
                        'message': message,
                    }
                    api_url = f'http://localhost:3000/api/tickets/{id}?role=user' #nextjs API
                    res = requests.post(api_url, headers=headers, json=body)
                else:   
                    if message.isdigit():
                        id_ro = get_ro_by_number(message)
                        category=get_text_category_by_category_id(category_id)
                        # print(f"this is category :{category}") 
                        new_ticket, ticket_code, token = create_new_ticket(phone_number, id_ro,category)

                        if new_ticket:
                            headers = {
                                'Authorization': f'Bearer {token}',
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                            api_url = f'http://localhost:3000/api/tickets' #nextjs API
                            res = requests.post(api_url, headers=headers)
                            if(res):
                                response.message(f"Hallo ada yang bisa saya bantu? Tiket Anda: {ticket_code}")
                        else:
                            response.message("Maaf, bisa bantu ulangi?")
                    else:
                        response.message('Pesan yang Anda berikan tidak sesuai dengan ketentuan yang ada.')
            elif status == '0' or None:
                categories = get_all_categories()
                if message.isdigit():
                    handle_initial_message(phone_number, message)
                    category_id = get_category_id_by_number(message)
                    if category_id:
                        questions = get_questions_by_category_id(category_id)
                        length_of_questions = len(questions)
                        if category_id == 3:
                            another_text = "Ketik {} untuk informasi Chat admin program A masing-masing Regional Office".format(length_of_questions + 1)
                        else:
                            another_text = ""
                        questions_text = "".join([f"Ketik {index} untuk informasi {q[1]}\n" for index, q in enumerate(questions, start=1)])
                        response.message("Terima kasih telah menghubungi WhatsApp Center."
                                        f"\n\nApa yang bisa kami bantu?\n\n{questions_text}{another_text}\n\n{menu_text}")
                    elif int(message) == len(categories) + 1:
                        update_user_status(phone_number, 2)
                        response.message('Anda sedang berbicara dengan admin sekarang') 
                    else:
                        response.message('Pesan yang Anda berikan tidak sesuai dengan ketentuan yang ada.')
                else:
                    categories_text = "\n".join([f"Ketik {index} untuk informasi {cat[0]}" for index, cat in enumerate(categories, start=1)])
                    length_of_categories = len(categories)
                    # another_text = "Ketik {} untuk informasi lainnya".format(length_of_categories + 1)
                    response.message(f"{operational_hours}\nApa yang bisa kami bantu?\n{categories_text}")
            elif status == '2':
                cur = mysql.connection.cursor()
                cur.execute("SELECT id FROM table_users WHERE phone_number = %s ORDER BY id DESC LIMIT 1", (phone_number,))
                user_id = cur.fetchone()
                cur.close()
                user_id = user_id[0]

                handle_user_message(user_id, message)
        elif id_admin:
            id = request.values.get('Body').split(':')[0]
            user_id = int(id)

            cur = mysql.connection.cursor()
            cur.execute("SELECT phone_number FROM table_users WHERE id = %s AND status = 2 ORDER BY id DESC LIMIT 1", (user_id,))
            phone_number = cur.fetchone()
            cur.close()
            user_phone_number = phone_number[0]

            main(user_phone_number, message)
        else:
            if 'ADMIN' in message.upper():
                new_admin(phone_number)
                response.message('Anda telah didaftarkan sebagai admin.')
            elif message.isdigit():
                questions = get_questions_by_category_id(category_id)
                handle_initial_message(phone_number, message)
                category_id = get_category_id_by_number(message)
                if category_id:
                    questions_text = "".join([f"Ketik {q[0]} untuk informasi {q[1]}\n" for q in questions])
                    response.message("Terima kasih telah menghubungi WhatsApp Center."
                                    f"\n\nApa yang bisa kami bantu?\n\n{questions_text}")
                elif int(message) == len(questions) + 1 :
                    update_user_status(phone_number, 2)
                    response.message('Anda sedang berbicara dengan admin sekarang')
                else:
                    response.message('Pesan yang Anda berikan tidak sesuai dengan ketentuan yang ada.')
            else:
                handle_initial_message(phone_number, message)
                categories = get_all_categories()
                categories_text = "\n".join([f"Ketik {index} untuk informasi {cat[0]}" for index, cat in enumerate(categories, start=1)])
                response.message(f"{operational_hours}\nApa yang bisa kami bantu?\n{categories_text}")

    return str(response)

if __name__ == '__main__':
    socketio.run(app,debug=True, port=8080)