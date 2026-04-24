// index.js
const args = process.argv.slice(2);
const [method, resource, ...params] = args;

const BASE_URL = "https://fakestoreapi.com";

async function main() {
  try {
    if (method === "GET") {
      if (resource === "products") {
        // GET products
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        console.log(data);
      } else if (resource.startsWith("products/")) {
        // GET products/:id
        const productId = resource.split("/")[1];
        const res = await fetch(`${BASE_URL}/products/${productId}`);
        const data = await res.json();
        console.log(data);
      }
    }

    else if (method === "POST" && resource === "products") {
      const [title, price, category] = params;
      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        body: JSON.stringify({
          title,
          price: Number(price),
          category
        }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      console.log(data);
    }

    else if (method === "DELETE" && resource.startsWith("products/")) {
      const productId = resource.split("/")[1];
      const res = await fetch(`${BASE_URL}/products/${productId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      console.log(data);
    }

    else {
      console.log("Comando no reconocido. Revisa la sintaxis.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
