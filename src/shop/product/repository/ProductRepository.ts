import prisma from "../../../libs/prismaClient";
import { Product } from "../entities/Product.entitie";
import { IProductRepository } from "../interfaces/IProudctRepository";

export class ProductRepository implements IProductRepository {
    async getAllProduct(): Promise<Product[]> {
        const products = await prisma.product.findMany()

        return products as Product[]
    }
    async create(data: Product): Promise<Product> {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                description: data.description,
                stock: data.stock
            }
        })
        return product;
    }

}