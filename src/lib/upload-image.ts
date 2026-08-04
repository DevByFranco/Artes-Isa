"use server";

import cloudinary from "@/lib/cloudinary";

export async function uploadImage(file: File): Promise<string> {
  // Convertimos el archivo de la imagen a un Buffer de Node.js
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "artes-isa" }, // Organiza todas las fotos en una carpeta 'artes-isa' en Cloudinary
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Error al subir la imagen a Cloudinary"));
          } else {
            resolve(result.secure_url); // Retorna la URL segura (https)
          }
        }
      )
      .end(buffer);
  });
}