var nodemailer = require("nodemailer");
const env = require("./.env");
const Telegraf = require("telegraf");
const bot = new Telegraf(env.token);
const email = "noreplydaparaconfiar@gmail.com";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: "Dd6qWdD2De9ZxqV",
  },
});

bot.start((ctx) => {
  const from = ctx.update.message.from;

  console.log(from);
  ctx.reply(`Muito bem-vindo, ${from.first_name}!`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "→ 💲 Melhor preço", callback_data: "MP" }],
        [{ text: "→ 💸 Promoções Imperdíveis", callback_data: "PI" }],
        [{ text: "→ 🔍 Ver reputação de uma empresa", callback_data: "RP" }],
        [{ text: "→ ❓ Ajuda", callback_data: "AJ" }],
      ],
    },
  });
});

bot.action("MP", (ctx) => {
  ctx.deleteMessage();
  ctx.reply("Digite o nome do produto");
  
  /*bot.on("text", (ctx) => {
  let nomeproduto = ctx.message.text;




    



  })
  */





});



bot.action("PI", (ctx) => {
  ctx.deleteMessage();
  ctx.reply("A função Promoções Imperdíveis está por vir");




});





bot.action("RP", (ctx) => {
  ctx.deleteMessage();
  ctx.reply("A função Reputação está por vir");



  
});



bot.action("AJ", (ctx) => {
  ctx.deleteMessage();

  ctx.reply("Ajuda: \n→Suporte: \nE-Mail: suporte@transversal.com", {
    reply_markup: {
      inline_keyboard: [[{ text: "→ Reportar Erro", callback_data: "ERR" }]],
    },
  });

  bot.action("ERR", (ctx) => {
    let erroreport;

    ctx.reply("Digite o problema que está tendo");

    bot.on("text", (ctx) => {
      erroreport = ctx.message.text;
      var mailOptions = {
        from: email,
        to: email,
        subject: "Report de ERRO",
        text: `Report de erro de usuário: ${erroreport}\n ${new Date()}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          ctx.reply("Serviço Indisponível");
        } else {
          ctx.reply("O erro foi reportado!\n Obrigado");
        }
      });
    });
  });
});

bot.startPolling();
