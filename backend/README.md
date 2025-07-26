# MD Tours & Travels Backend

## Setup

1. Create a `.env` file in the backend directory:

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/md_travels?retryWrites=true&w=majority
DB_NAME=md_travels
```

2. Install dependencies:

```
pip install -r requirements.txt
```

3. Run the server:

```
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`. 