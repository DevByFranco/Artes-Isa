"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createLayawayAction(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const productId = formData.get("productId") as string;
  const initialPayment = Number(formData.get("initialPayment"));
  const paymentMethod = formData.get("paymentMethod") as string;

  // 1. Buscar el producto para obtener su precio real
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Producto no encontrado");

  // 2. Buscar al cliente por teléfono, si no existe, lo creamos
  let customer = await prisma.customer.findUnique({ where: { phone } });
  if (!customer) {
    customer = await prisma.customer.create({ data: { name, phone } });
  }

  // 3. Crear el Apartado y registrar el abono inicial al mismo tiempo
  const layaway = await prisma.layaway.create({
    data: {
      customerId: customer.id,
      productId: product.id,
      totalPrice: product.price,
      payments: { 
        create: { amount: initialPayment, method: paymentMethod } 
      }
    }
  });

  // 4. Restar 1 al stock del producto para que no se venda doble
  await prisma.product.update({
    where: { id: product.id },
    data: { stock: product.stock - 1 }
  });

  // 5. Redirigir a la vista de detalles del nuevo apartado
  redirect(`/admin/apartados/${layaway.id}`);
} 
// ↑ AQUÍ ESTÁ LA MAGIA: Faltaba cerrar esta llave para separar las funciones

export async function addPaymentAction(formData: FormData) {
  const layawayId = formData.get("layawayId") as string;
  const amount = Number(formData.get("amount"));
  const method = formData.get("paymentMethod") as string;

  // 1. Buscamos el apartado actual
  const layaway = await prisma.layaway.findUnique({
    where: { id: layawayId },
    include: { payments: true }
  });

  if (!layaway) throw new Error("Apartado no encontrado");

  // 2. Registramos el nuevo abono
  await prisma.payment.create({
    data: {
      layawayId,
      amount,
      method,
    }
  });

  // 3. Verificamos si con este abono se completa el total
  const totalPaid = layaway.payments.reduce((sum, p) => sum + p.amount, 0) + amount;

  if (totalPaid >= layaway.totalPrice) {
    await prisma.layaway.update({
      where: { id: layawayId },
      data: { status: "PAID" }
    });
  }

  // 4. Recargamos la página para ver los cambios
  const { revalidatePath } = await import("next/cache");
  revalidatePath(`/admin/apartados/${layawayId}`);
}