import { Markup } from "telegraf";
import { buttons } from "./keyboards.js";
import { getOrderStatusAndCompare, getOrderStatusNoSmile } from "../helpers/order.js";

export const adminButtons = {
    orders: {
        uz: "🛵 Buyurtmalar",
        en: "🛵 Orders",
        ru: "🛵 Заказы"
    },
    menu: {
        uz: "🥘 Menyu",
        en: "🥘 Menu",
        ru: "🥘 Меню"
    },
    foods: {
        uz: "🍲 Ta'omlar",
        en: "🍲 Foods",
        ru: "🍲 Еда"
    },
    add_food: {
        uz: "➕ Ovqat qo'shish",
        en: "➕ Add food",
        ru: "➕ Добавить блюдо"
    },
    edit: {
        uz: "✏️ Tahrirlash",
        en: "✏️ Edit",
        ru: "✏️ Редактировать"
    },
    delete: {
        uz: "🗑️ O'chirish",
        en: "🗑️ Delete",
        ru: "🗑️ Удалить"
    },
    change_price: {
        uz: "💰 Narxini o'zgartirish",
        en: "💰 Change Price",
        ru: "💰 Изменить цену"
    },
    previous: "⬅️",
    next: "➡️",
    categories_menu: {
        uz: "🍱 Kategoriyalar",
        en: "🍱 Categories",
        ru: "🍱 Категории"
    },
    categories: {
        uz: "🍟 Kategoriyalar",
        en: "🍟 Categories",
        ru: "🍟 Категории"
    },
    add_category: {
        uz: "➕ Kategoriya qo'shish",
        en: "➕ Add category",
        ru: "➕ Добавить категорию"
    },
    next: {
        uz: "➡️ Keyingisi",
        en: "➡️ Next",
        ru: "➡️ Далее"
    },
    changeOrderStatus: {
        uz: "♻️ Buyurtma holatini o'zgartirish",
        en: "♻️ Change order status",
        ru: "♻️ Изменить статус заказа"
    },
    // edit_category: {
    //     uz: "✏️ Kategoriyani tahrirlash",
    //     en: "✏️ Edit Category",
    //     ru: "✏️ Редактировать категорию"
    // },
    // delete_category: {
    //     uz: "🗑️ Kategoriyani o'chirish",
    //     en: "🗑️ Delete Category",
    //     ru: "🗑️ Удалить категорию"
    // },
    // manage_users: {
    //     uz: "👥 Foydalanuvchilarni boshqarish",
    //     en: "👥 Manage Users",
    //     ru: "👥 Управление пользователями"
    // },
    view_bookings: {
        uz: "📅 Band qilingan joylar",
        en: "📅 Bookings",
        ru: "📅 Забронировано"
    },
    // search_bookings: {
    //     uz: "🔍 Band qilingan joylarni qidirish",
    //     en: "🔍 Search Bookings",
    //     ru: "🔍 Поиск бронирований"
    // },
    // edit_booking: {
    //     uz: "✏️ Band qilingan joylarni tahrirlash",
    //     en: "✏️ Edit Booking",
    //     ru: "✏️ Редактировать бронирование"
    // },
    // delete_booking: {
    //     uz: "🗑️ Band qilingan joylarni o'chirish",
    //     en: "🗑️ Delete Booking",
    //     ru: "🗑️ Удалить бронирование"
    // },
    view_orders: {
        uz: "📦 Buyurtmalar ro'yxati",
        en: "📦 View Orders",
        ru: "📦 Просмотр заказов"
    },
    change_order_status: {
        uz: "✏️ Buyurtma holatini o'zgartirish",
        en: "✏️ Change Order Status",
        ru: "✏️ Изменить статус заказа"
    },
    delete_order: {
        uz: "🗑️ Buyurtmani o'chirish",
        en: "🗑️ Delete Order",
        ru: "🗑️ Удалить заказ"
    },
    back_to_admin_menu: {
        uz: "🏠 Admin menyuga qaytish",
        en: "🏠 Back to Admin Menu",
        ru: "🏠 Вернуться в меню администратора"
    },
    view_reports: {
        uz: "📊 Hisobotlar",
        en: "📊 Reports",
        ru: "📊 Отчеты"
    },
    // system_settings: {
    //     uz: "⚙️ Tizim sozlamalari",
    //     en: "⚙️ System Settings",
    //     ru: "⚙️ Системные настройки"
    // },
    // logout: {
    //     uz: "🚪 Chiqish",
    //     en: "🚪 Logout",
    //     ru: "🚪 Выйти"
    // }
};

// Admin menyu tugmalari
export const adminMainMenuKeyboard = (lang) => Markup.keyboard([
    [ Markup.button.text(adminButtons.orders[lang]), Markup.button.text(adminButtons.view_reports[lang]) ],
    [ Markup.button.text(adminButtons.menu[lang]), Markup.button.text(adminButtons.categories_menu[lang]) ],
    [ Markup.button.text(adminButtons.view_bookings[lang]) ],
    [ Markup.button.text(buttons.back_to_main_menu[lang]) ]
]).resize();

// Ovqatlar menyusi
export const adminMenuKeyboard = (lang) => Markup.keyboard([
    [ Markup.button.text(adminButtons.foods[lang]) ],
    [ Markup.button.text(adminButtons.add_food[lang]), Markup.button.text(adminButtons.delete[lang]) ],
    [ Markup.button.text(adminButtons.back_to_admin_menu[lang]) ]
]).resize();

export const backToAdminMenuKeyboard = (lang) => Markup.keyboard([
    [ Markup.button.text(adminButtons.back_to_admin_menu[lang]) ]
]).resize();

export const orderKeyboard = (lang, orderId) => Markup.inlineKeyboard([
    [ Markup.button.callback(adminButtons.changeOrderStatus[lang], `changeOrderStatus:${orderId}:change`) ]
]);

export const changeOrderStatusKeyboard = (lang, currentStatus, orderId) => Markup.inlineKeyboard([
    [
        Markup.button.callback(getOrderStatusAndCompare(currentStatus, "pending", lang), `changeOrderStatus:${orderId}:pending`),
        Markup.button.callback(getOrderStatusAndCompare(currentStatus, "process", lang), `changeOrderStatus:${orderId}:process`)
    ],
    [
        Markup.button.callback(getOrderStatusAndCompare(currentStatus,"canceled", lang), `changeOrderStatus:${orderId}:canceled`),
        Markup.button.callback(getOrderStatusAndCompare(currentStatus,"completed", lang), `changeOrderStatus:${orderId}:completed`)
    ],
    [ Markup.button.callback(buttons.back[lang], `changeOrderStatus:${orderId}:back`) ]
]);

export const adminFoodsKeyboard = (foods, lang, add) => {
    const keyboards = [[]];

    for (const food of foods) {
        const lastItem = keyboards[ keyboards.length - 1 ];
        const button = Markup.button.text(food.title);

        if (lastItem.length < 2) {
            lastItem.push(button);
        } else {
            keyboards.push([ button ]);
        }
    }

    add && keyboards.unshift([ Markup.button.text(adminButtons.add_food[lang]) ]);
    keyboards.push([ Markup.button.text(buttons.back[lang]) ]);
    return Markup.keyboard(keyboards).resize();
}

// Kategoriyalar menyusi
export const adminCategoryKeyboard = (lang) => Markup.keyboard([
    [ Markup.button.text(adminButtons.categories[lang]) ],
    [ Markup.button.text(adminButtons.add_category[lang]), Markup.button.text(adminButtons.delete[lang]) ],
    [ Markup.button.text(adminButtons.back_to_admin_menu[lang]) ]
]).resize();

export const adminCategoriesKeyboard = (categories, lang) => {
    const keyboards = [[]]

    for (const category of categories) {
        const lastItem = keyboards[ keyboards.length - 1 ];
        const button = Markup.button.text(category.title);

        if (lastItem.length < 2) {
            lastItem.push(button);
        } else {
            keyboards.push([ button ]);
        }
    }

    keyboards.push([ Markup.button.text(buttons.back[lang]) ]);
    return Markup.keyboard(keyboards).resize();
};

export const adminCategorySettings = (lang, id) => Markup.inlineKeyboard([
    [ Markup.button.callback(adminButtons.foods[lang], `viewFoods:${id}`) ],
    [ Markup.button.callback(adminButtons.add_food[lang], `addFood:${id}`), Markup.button.callback(adminButtons.delete[lang], `deleteCategory:${id}`) ],
    [ Markup.button.callback(adminButtons.back_to_admin_menu[lang], `back:admin`) ]
]);

export const adminFoodSettings = (lang, id) => Markup.inlineKeyboard([
    [ Markup.button.callback(adminButtons.change_price[lang], `changePrice:${id}`), Markup.button.callback(adminButtons.delete[lang], `deleteFood:${id}`) ],
    [ Markup.button.callback(adminButtons.back_to_admin_menu[lang], `back:admin`) ]
]);

export const adminNextOrCancelKeyboard = (lang) => Markup.keyboard([
    [ Markup.button.text(adminButtons.next[lang]) ],
    [ Markup.button.text(buttons.cancel[lang]) ]
]).resize();

// Buyurtmalar menyusi
export const ordersKeyboard = (lang) => Markup.keyboard([
    [Markup.button.text(adminButtons.view_orders[lang])],
    [Markup.button.text(adminButtons.change_order_status[lang])],
    [Markup.button.text(adminButtons.delete_order[lang])],
    [Markup.button.text(adminButtons.back_to_admin_menu[lang])]
]).resize();

// Band qilingan joylar menyusi
export const bookingsKeyboard = (lang) => Markup.keyboard([
    [Markup.button.text(adminButtons.view_bookings[lang])],
    [Markup.button.text(adminButtons.search_bookings[lang])],
    [Markup.button.text(adminButtons.edit_booking[lang])],
    [Markup.button.text(adminButtons.delete_booking[lang])],
    [Markup.button.text(adminButtons.back_to_admin_menu[lang])]
]).resize();