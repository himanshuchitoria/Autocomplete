import requests
import json
import os

# Fetch all products from DummyJSON , change limit by chaning the value 100
url = "https://dummyjson.com/products?limit=100"
response = requests.get(url)
response.raise_for_status()
data = response.json()

# extracting the required fields
products = [
    {
        "id": p.get("id"),
        "title": p.get("title"),
        "brand": p.get("brand", "Unknown"),
        "category": p.get("category", "Unknown"),
        "price": p.get("price")
    }
    for p in data.get("products", [])
]

# for getting the directory of its location
script_dir = os.path.dirname(os.path.abspath(__file__))
save_path = os.path.join(script_dir, "products.json")

# Save to products.json in the same directory as this script
with open(save_path, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Saved {len(products)} products to {save_path}")
