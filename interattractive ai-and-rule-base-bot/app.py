from flask import Flask, render_template, request, jsonify, send_from_directory

import openai

app = Flask(__name__)

# Set your OpenAI API key here
openai.api_key = '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'

# Function to send message to OpenAI and get a response
def ask_openai(message):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": message}
        ],
    )
    return response.choices[0].message['content']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/img/bot-icon.avif')
def serve_static(filename):
    return send_from_directory('static', filename)


@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']

    if "Website" in user_message or "website" in user_message:
        print("user message: ", user_message)
        bot_response = ask_openai(user_message)
        print("bot response: ", bot_response)
        a = """<div class='card'>
          <img style='width:100%'; src='https://c0.wallpaperflare.com/preview/944/356/969/concept-construction-page-site.jpg' >
          <div class='container'>
            <h4><b>Indenta Ai</b></h4>
            <a class='clickme'>visit</a>
            <a class='clickme'>details</a>
            <a class='clickme'>installment plan</a>
            <a class='clickme'>contact us</a> <br>
            <a  href='https://www.google.com' class='clickme' target='blank'>Click Me</a> 
          </div>
        </div>"""
    elif "package" in user_message or "packages" in user_message:
        a = """
 """

    return jsonify({'bot_response': a})

   

    
if __name__ == '__main__':
    app.run(debug=True)
