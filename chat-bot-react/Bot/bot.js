const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')

const TOKEN = '6595887265:AAG7pXe3XCJrDOY83XzXARWdlDkRfDIkCPQ'
const bot = new Telegraf(TOKEN)

const web_link = 'https://stalwart-cupcake-93d44b.netlify.app'

bot.start((ctx) => ctx.reply('Welcome',{
        reply_markup: { 
            keyboard: [[{text: "Web app", web_app: { url: web_link } }]],
        },
    })
);
bot.launch()