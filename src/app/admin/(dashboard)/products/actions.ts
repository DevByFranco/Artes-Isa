"use server";

import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/upload-image";
import { revalidatePath } from "next/cache";

// 1. Crear producto
export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string);
    const category = formData.get("category") as string;
    
    // CORRECCIÓN 1: Capturamos la subcategoría (puede ser string o null)
    const subcategory = formData.get("subcategory") as string | null; 
    
    const file = formData.get("image") as File;

    if (!name || !price || !file.size) {
      throw new Error("El nombre, precio y la imagen son obligatorios.");
    }

    const imageUrl = await uploadImage(file);

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        category,
        subcategory, // CORRECCIÓN 2: Ahora sí lo guardamos en la base de datos
        images: [imageUrl],
      },
    });

    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
}

// 2. Eliminar producto
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin/products");
    return { success: true };
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Subimos el console.error antes de los return para que sí se ejecute en los logs del servidor
    console.error("Error al eliminar producto:", error);

    // Revisamos tanto layaway minúscula como Mayúscula (como viene en el error de Prisma)
    if (error?.message?.toLowerCase().includes('layaway')) {
      return {
        error: "🚫 No puedes eliminar este producto porque está vinculado a uno o más apartados. Debes eliminar o completar el apartado primero."
      };
    }
    
    return {
      error: "Ocurrió un error al eliminar el producto. Por favor, inténtalo de nuevo más tarde."
    };
  }
}

// 3. Actualizar producto
export async function updateProduct(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const subcategory = formData.get("subcategory") as string | null; 
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string);

    await prisma.product.update({
      where: { id },
      data: {
        name,
        category,
        subcategory,
        description,
        price,
        stock,
      },
    });

    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Error al actualizar producto:", error);
  }
}