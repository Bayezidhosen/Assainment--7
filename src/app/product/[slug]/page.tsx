import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";

import ProductDetails from "@/components/ProductDetails";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: Props) {
  const { slug } = await params;

  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session) {
    redirect(
      `/signin?callbackUrl=/product/${slug}`
    );
  }

  const product =
    await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetails
      product={product}
    />
  );
}