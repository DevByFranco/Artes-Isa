"use server";

import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/upload-image";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  try {
    // 1. Extraer los datos del formulario
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string);
    const file = formData.get("image") as File;

    if (!name || !price || !file.size) {
      throw new Error("El nombre, precio y la imagen son obligatorios.");
    }

    // 2. Subir la imagen a Cloudinary
    const imageUrl = await uploadImage(file);

    // 3. Guardar el producto en la base de datos (Neon)
    await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        imageUrl, 
      },
    });

    // 4. Refrescar la página para ver los cambios
    revalidatePath("/admin/products");
    
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
}