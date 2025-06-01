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


# Product Autocomplete Frontend

A modern React application featuring an autocomplete search component for products, fully integrated with a FastAPI backend.  
The UI is responsive, debounced, paginated, and provides a seamless user experience for product lookup.

---

## 🚀 Setup Instructions

1. **Clone the repository**
    ```
    git clone https://github.com/yourusername/product-autocomplete-frontend.git
    cd product-autocomplete-frontend
    ```

2. **Install dependencies**
    ```
    npm install
    ```
    or
    ```
    yarn install
    ```

3. **Configure backend API endpoint (if needed)**
    - By default, the app expects the backend at `http://localhost:8000/api/products/search`.
    - If your backend runs elsewhere, update `src/utils/constants.ts` or your `.env`:
      ```
      REACT_APP_API_BASE_URL=http://localhost:8000
      ```

4. **Start the frontend**
    ```
    npm start
    ```
    or
    ```
    yarn start
    ```
    The app will open at [http://localhost:3000](http://localhost:3000).

---

## 💡 Thought Process & Approach

- **Component Structure:**  
  - The main component (`AutocompleteInput`) manages input, debouncing, dropdown state, and pagination.
  - Results are rendered in a dropdown list (`ProductList`), with error and loading states handled gracefully.
  - All API logic is separated into hooks (`useProductSearch`) and services for modularity and reusability.

- **API Integration:**  
  - The frontend fetches product suggestions from the backend (`/api/products/search`), which is seeded from [DummyJSON](https://dummyjson.com/docs/products).
  - Supports pagination via `limit` and `skip` parameters.

- **Optimizations:**  
  - **Debounced** API requests (300ms) to prevent excessive network calls.
  - Only triggers search when input has **at least 2 characters**.
  - Loading spinner shown while fetching.
  - "No results found" message for empty results.
  - Error handling for network/API issues.

- **UI/UX:**  
  - Clean, minimal, and responsive design.
  - Accessible keyboard navigation and screen reader support.
  - Modular CSS for easy customization.

- **Tech Stack:**  
  - React (with Hooks)
  - TypeScript for type safety (optional, but used here)
  - No external UI libraries—pure React and CSS for full control

---

## 🧪 Sample API Usage

The frontend sends requests to:
GET http://localhost:8000/api/products/search?q=phone&limit=10&skip=0

text
- **Response:**
    ```
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
    ```

---

## 🖥️ UI Features Checklist

- [x] Autocomplete input with dropdown results
- [x] Debounced search (300ms)
- [x] Pagination controls (next/prev)
- [x] Loading spinner while fetching
- [x] Error and "No results found" messages
- [x] Modular, readable codebase
- [x] React Hooks throughout
- [x] TypeScript support

---

## 📝 Notes

- **Backend Required:**  
  This frontend expects the FastAPI backend running at `http://localhost:8000`.  
  See the [backend README](../backend/README.md) for setup.
- **CORS:**  
  Ensure CORS is enabled in your backend for `http://localhost:3000`.
- **Customization:**  
  Update API URLs or styles as needed in `src/utils/constants.ts` and CSS files.

---

## 📄 References

- [Software Engineering Intern Assignment - Autocomplete Component PDF][frontend-pdf]
- [Backend Engineer Assignment II PDF][backend-pdf]
- [DummyJSON Products API](https://dummyjson.com/docs/products)
- [React Documentation](https://react.dev/)

[frontend-pdf]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/51126410/854d7e2e-348a-4b3c-a168-0e36f9abaca3/Software-Engineering-Intern-Assignment_-Autocomplete-Component.pdf
[backend-pdf]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/51126410/44c49e84-6387-4072-885e-461cc4b8405c/Backend-Engineer-Assignment-II.pdf
