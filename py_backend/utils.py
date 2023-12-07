import openai
import time 
import tiktoken
import os
import re
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")


COMPLETIONS_MODEL = "gpt-3.5-turbo"


INSTRUCTION = f"""
Given provided content below is an activity about an address, Please summarize what is important for a user that need to know about this address, and extract some key points or insight to make it easy for users to understand about this address.
"""


def num_tokens_from_string(string: str, encoding_name = COMPLETIONS_MODEL) -> int:
    """Returns the number of tokens in a text string."""
    encoding = tiktoken.encoding_for_model(encoding_name)
    num_tokens = len(encoding.encode(string))
    return num_tokens


def preprocess(text):
    text = text.replace('\n', ' ').replace('/',' ').replace('..','')
    text = re.sub('\s+', ' ', text)
    return text

def openai_model(query):
    messages = [{"role":"system","content": INSTRUCTION}]
    messages.append({"role":"user", "content": query})
    num_token = num_tokens_from_string(messages[0]["content"] + messages[1]["content"])
    print("total token spend for prompt :" ,num_token)

    while True:
        try : 
            response = openai.ChatCompletion.create(
                            model = COMPLETIONS_MODEL,
                            messages = messages,
                            temperature = 0.8,
                            max_tokens = 4096 - num_token - 13
                        )
            break
        except Exception as err:
            print(err)
            time.sleep(0.1)
    answer = response.choices[0].message['content']
    return answer

