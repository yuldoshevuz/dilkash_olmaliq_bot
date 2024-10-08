import prisma from "../config/prisma.client.js";
import Model from "./index.js";
import repository from "./repository.js";

class CartItem extends Model {
    constructor() {
        super(prisma.cartItem);
    }

    async findByFoodID(foodId, lang) {
        const cartItem = await this.model.findFirst({
            select: {
                id: true,
                foodId: true,
                cartId: true,
                quantity: true
            },
            where: { foodId }
        });

        if (!cartItem) {
            return null;
        }

        const food = await repository.food.findById(cartItem.foodId, lang);

        return { ...cartItem, food };
    }

    async new({foodId, cartId, quantity = 1}) {
        return await this.model.upsert({
            where: {
                cartId_foodId: {
                    cartId,
                    foodId
                }
            },
            create: {
                cartId,
                foodId,
                quantity
            },
            update: {
                quantity
            }
        });
    }
}

export default CartItem;