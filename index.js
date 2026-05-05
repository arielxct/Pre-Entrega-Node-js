// index.js
/* 
COMANDO A INGRESAR POR CONSOLA
npm run start GET products
npm run start GET products/5
npm run start POST products "Remera" 200 ropa
npm run start DELETE products/5
*/
const args = process.argv.slice(2);
const [method, resource, ...params] = args;

const BASE_URL = "https://fakestoreapi.com";

async function main() {
  try {
    if (method === "GET") {
      if (resource === "products") {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        console.log("📦 Lista de Productos:");        
        console.table(data, ["id", "title", "price","category"]);
      } else if (resource.startsWith("products/")) {
        // GET products/:id
        const productId = resource.split("/")[1];
        const res = await fetch(`${BASE_URL}/products/${productId}`);
        const data = await res.json();
        
         console.log("📦 Detalle del Producto:"); 
        console.table([data], ["id", "title", "price"]);
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
      console.log("📦 Detalle del Producto nuevo:");
      console.table([data], ["id", "title", "price","category"]);
    }

    else if (method === "DELETE" && resource.startsWith("products/")) {
      const productId = resource.split("/")[1];
      const res = await fetch(`${BASE_URL}/products/${productId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      console.log(data);
      //------------------------------------
      if (data) {
      console.log(`✨ Éxito: El producto con ID ${productId} ha sido eliminado.`);
      console.table([data], ["id", "title", "price","category"]);
      } else {
      console.log("⚠️ El servidor no devolvió datos del producto eliminado.");
      }

      //---------------------------
    }

    else {
      console.log("⚠️Comando no reconocido. Revisa la sintaxis.");
    }
  } catch (error) {
    console.error("❌Error:", error.message);
  }
}

main();
