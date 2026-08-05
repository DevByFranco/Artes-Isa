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
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
}

// 3. Actualizar producto
export async function updateProduct(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string);

    await prisma.product.update({
      where: { id },
      data: {
        name,
        category,
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