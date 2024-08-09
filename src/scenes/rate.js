import { WizardScene } from "telegraf/scenes";
import { cancelKeyboard, rateInlineKeyboard } from "../utils/keyboards.js";
import i18n from "../config/i18n.config.js";
import { phoneValidation } from "../helpers/validations.js";
import sendMessageToAdmin from "../helpers/sendMsg.admin.js";
import parseHtml from "../helpers/parse.html.js";

const rateScene = new WizardScene(
    "rate",
    async (ctx) => {
        try {
            if (ctx.callbackQuery) {
                ctx.answerCbQuery()
                const [ cursor, data ] = ctx.callbackQuery.data.split(":");

                if (cursor === "rateService") {
                    ctx.session.rating = { service: data };

                    await ctx.editMessageText(i18n.t("rateFoods"), {
                        ...rateInlineKeyboard("rateFoods")
                    })
                    return ctx.wizard.next();
                }
            }

            if (ctx.message) {
                await ctx.deleteMessage();
            }
        } catch (error) {
            console.log(error)
        }
    },
    async (ctx) => {
        try {
            if (ctx.callbackQuery) {
                ctx.answerCbQuery()
                const [ cursor, data ] = ctx.callbackQuery.data.split(":");

                if (cursor === "rateFoods") {
                    ctx.session.rating.foods = data;

                    await ctx.editMessageText(i18n.t("rateComment"))
                    return ctx.wizard.next();
                }
            }

            if (ctx.message) {
                await ctx.deleteMessage();
            }
        } catch (error) {
            console.log(error)
        }
    },
    async (ctx) => {
        try {
            if (ctx.message?.text) {
                ctx.session.rating.comment = parseHtml(ctx.message.text);

                await ctx.reply(i18n.t("rateContact"))
                return ctx.wizard.next();
            }

            if (ctx.message && !ctx.message.text) {
                await ctx.deleteMessage();
            }
        } catch (error) {
            console.log(error)
        }
    },
    async (ctx) => {
        try {
            if (ctx.message?.text) {
                const phoneContact = ctx.message?.text;

                if (!phoneValidation(phoneContact)) {
                    await ctx.reply(i18n.t("invalidPhone"));
                    return;
                }

                await sendMessageToAdmin("ratedMessage", {
                    firstName: parseHtml(ctx.from.first_name),
                    phoneContact,
                    ...ctx.session.rating
                });

                delete ctx.session.rating;

                await ctx.reply(i18n.t("rateAccepted"));
                await ctx.scene.leave();
                await ctx.scene.enter("start");
            }

            if (ctx.message && !ctx.message.text) {
                await ctx.deleteMessage();
            }
        } catch (error) {
            console.log(error)
        }
    }
);

rateScene.enter(async (ctx) => {
    try {
        await ctx.reply(ctx.message.text,
            cancelKeyboard(ctx.session.lang)
        );
        await ctx.reply(i18n.t("rateService"), 
            rateInlineKeyboard("rateService")
        );
    } catch (error) {
        console.error(error);
    }
});

rateScene.hears(/^\/start|🚫 (Bekor qilish|Cancel|Отменить)$/, async (ctx) => {
    delete ctx.session?.rating;
    ctx.scene.enter("start");
});

export default rateScene;