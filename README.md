# Product Autocomplete Backend API

A FastAPI backend for product autocomplete, designed for scalable, real-time product search with pagination and scoring.  
**Seeded with real product data from [DummyJSON](https://dummyjson.com/docs/products).**

---

## 🚀 Setup Instructions

1. **Clone the repository**
    ```
    git clone https://github.com/yourusername/product-autocomplete-backend.git
    cd product-autocomplete-backend/backend
    ```

2. **Create a virtual environment (recommended)**
    ```
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. **Install dependencies**
    ```
    pip install -r requirements.txt
    ```

4. **Seed product data using DummyJSON**
    ```
    python generate_products_json.py
    ```
    This script fetches 100 products from [DummyJSON](https://dummyjson.com/docs/products) and saves them to `src/data/products.json`.

5. **Run the backend server**
    ```
    uvicorn src.app:app --reload
    ```
    The API will be available at [http://localhost:8000](http://localhost:8000).

6. **(Optional) Run backend tests**
    ```
    pytest
    ```

---

## 💡 Approach & Thought Process

- **Framework:** Used [FastAPI](https://fastapi.tiangolo.com/) for its speed, validation, and built-in docs.
- **Data Source:** Products are seeded from [DummyJSON](https://dummyjson.com/docs/products) and stored in a local JSON file.
- **API Design:**  
    - Main endpoint: `/api/products/search?q=...&limit=...&skip=...`
    - Returns products where the title or brand contains the query (case-insensitive).
    - Results are paginated and scored: titles starting with the query rank highest, then brand, then substring matches.
- **Validation:**  
    - Minimum query length: 2 characters (returns 400 if shorter).
    - All parameters validated with FastAPI and Pydantic.
- **Error Handling:**  
    - Returns meaningful HTTP status codes and messages.
- **Modularity:**  
    - Code is split into models, routes, services, and utils for clarity and maintainability.
- **Bonus:**  
    - Pydantic models, test coverage, Dockerfile, and CORS for frontend integration.

---

## 🧪 Sample API Usage (with `curl`)

### **Search Products**
curl "http://localhost:8000/api/products/search?q=phone&limit=10&skip=0"

text
**Response:**
{
"products": [
{
"id": 1,
"title": "iPhone 9",
"brand": "Apple",
"category": "smartphones",
"price": 549
}
// ...
],
"total": 12,
"skip": 0,
"limit": 10
}

text

### **Invalid Query (Too Short)**
curl "http://localhost:8000/api/products/search?q=p"

text
**Response:**
{
"detail": "Query parameter 'q' must be at least 2 characters long."
}

text

### **No Results**
curl "http://localhost:8000/api/products/search?q=notfound"

text
**Response:**
{
"products": [],
"total": 0,
"skip": 0,
"limit": 10
}

text

---

## 🛠️ API Documentation

Interactive docs are available at:  
[http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🧩 Project Structure

backend/
├── src/
│ ├── app.py
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── data/products.json
├── tests/
├── requirements.txt
├── Dockerfile
├── README.md
└── design_doc.md

text

---

## 📝 Notes

- Backend is designed for easy integration with any frontend (e.g., React autocomplete).
- **CORS is enabled** for `http://localhost:3000` by default for local development.
- See `design_doc.md` for API structure, data schema, and logic details.

---

## 📄 References

- [Backend Engineer Assignment II PDF][assignment-pdf]
- [DummyJSON Products API](https://dummyjson.com/docs/products)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
