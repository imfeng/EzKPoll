# Web3 application

## How to Run
change .env.example to .env and add openai key to .env
```
OPENAI_API_KEY = "sk-..."
```

build virtual env
```
python3 -m venv venv
```

Activate virtual env
```
source ./venv/bin/activate
```

Install requirements
```
pip install -r requirements.txt
```

Run Server
```
uvicorn server:app --reload
```

See Swagger docs in
```
http://127.0.0.1:8000/docs
```