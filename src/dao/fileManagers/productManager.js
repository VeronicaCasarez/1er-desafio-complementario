import fs from "fs";
import { __dirname } from "../../utils.js";

const path=__dirname+'/files/products.json'

class ProductManager {
 

  constructor() {
   
    
  }


  readCounterFromFile() {
    try {
      const counterData = fs.readFileSync("./counter.json", "utf-8");
      const { productId } = JSON.parse(counterData);
      ProductManager.productId = productId;
    } catch (err) {
      console.log("No se pudo leer el contador de ID. Se utilizará el valor inicial de 1.");
    }
  }
  
 
  async addProduct(product) {
    try {
      // Verificar si el producto ya existe por su ID
      if (this.products.some((p) => p.id === product.id)) {
        console.log("El producto ya existe");
        return;
      }
  
      product.id = ProductManager.productId++;
  
      this.products.push(product);
  
      await this.writeDataToFile(this.products);
      await this.writeCounterToFile();
  
      console.log("Producto agregado correctamente");
    } catch (err) {
      console.log(err);
    }
  }
  
  
  async writeCounterToFile() {
    try {
      const counterData = JSON.stringify({ productId: ProductManager.productId });
      fs.writeFileSync("./counter.json", counterData, "utf-8");
    } catch (err) {
      console.log(err);
    }
  }
  


  async getAll() {
    try {
      const products = await this.readDataFromFile();
      return products; // Devolver los productos encontrados
    } catch (err) {
      console.log(err);
      return []; // Devolver un arreglo vacío en caso de error
    }
  }

  async getById(productId) {
    try {
      const products = await this.readDataFromFile();
      const productFind = products.find((product) => product.id === productId);
      if (!productFind) {
        console.log("Producto no encontrado");
        return null; // Devolver null si el producto no se encuentra
      } else {
        return productFind; // Devolver el producto encontrado
      }
    } catch (err) {
      console.log(err);
      return null; // Devolver null en caso de error
    }
  }

  async update(id, updatedFields) {
    try {
      const products = await this.readDataFromFile();
      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex !== -1) {
        const updatedProduct = { ...products[productIndex], ...updatedFields };
        products[productIndex] = updatedProduct;

        await this.writeDataToFile(products);

        console.log("Producto actualizado correctamente");
      } else {
        console.log("Producto no encontrado");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    try {
      const products = await this.readDataFromFile();
      const updatedProducts = products.filter((product) => parseInt(product.id) !== parseInt(id));
  
      await this.writeDataToFile(updatedProducts);
  
      console.log("Producto eliminado correctamente");
    } catch (err) {
      console.log(err);
    }
  }
  

  async readDataFromFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

async writeDataToFile(data) {
  try {
    const existingData = await this.readDataFromFile(); 
    const updatedData = [...existingData, ...data]; 

    await fs.promises.writeFile(this.path, JSON.stringify(updatedData), "utf-8"); 
  } catch (err) {
    console.log(err);
  }
}



async getProductByCode(code) {
  try {
    const products = await this.readDataFromFile();
    const product = products.find((product) => product.code === code);
    return product || null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
}

export default ProductManager;
