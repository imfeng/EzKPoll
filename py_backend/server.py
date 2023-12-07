import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import JSONResponse

import io
from pydantic import BaseModel
from utils import openai_model
import uvicorn
import requests

app = FastAPI()


# middleware
app.add_middleware(
    CORSMiddleware, 
    allow_credentials=True, 
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)


class get_account_info(BaseModel):
    account : str


@app.post("/get_account_info/")
async def get_account_info(item: get_account_info):
    print(item.account)
    url = f"https://testnet.rss3.io/data/accounts/{str(item.account)}/activities"
    headers = {"accept": "application/json"}

    try:

        response = requests.get(url, headers=headers)
        text_input = response.text
        final_response = openai_model(text_input[:2800])
        print(final_response)
        return JSONResponse(content={"code": 0, "data": final_response}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"code": 1, "error": str(e)}, status_code=500)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)