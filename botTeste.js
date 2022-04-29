var nodemailer = require("nodemailer");
const env = require("./.env");
const Telegraf = require("telegraf");
const bot = new Telegraf(env.token);
const email = "noreplydaparaconfiar@gmail.com";
const puppeteer = require("puppeteer");




bot.command("start", (ctx) => {
  sendStartMessage(ctx);
});

bot.action("start", (ctx) => {
  ctx.deleteMessage();
  sendStartMessage(ctx);
});

function sendStartMessage(ctx) {
  ctx.reply("Olá. Por favor escolha umas das opções abaixo.\n Como estamos na versão beta, pedimos desculpas pela demora nas funcionalidades.", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "→ 💲 Melhor Preço", callback_data: "MP" }],
        [{ text: "→ 🔍 Ver reputação de uma empresa", callback_data: "RP" }],
        [{ text: "→ 💸 Promoções Imperdíveis", callback_data: "PI" }],
        [{ text: "→ ❓ Ajuda", callback_data: "AJ" }],
        [{ text: "→ 📒 Manual", callback_data: "MAN" }],
      ],
    },
  });
}

bot.action("MP", (ctx) => {
  ctx.reply("😎 Por favor, digite o nome do produto que deseja achar o melhor preço:");
  bot.on("text", (ctx) => {
    const searchFor = ctx.message.text;
    
      var url1 = "https://www.mercadolivre.com.br/";
      let c = 1;
      ctx.reply(
        "Por favor, aguarde. Estamos procurando o melhor produto para você! 😀 "
      );
      async function precoconsulta(searchFor) {
        const browser = await puppeteer.launch({
          headless: false,
          defaultViewport: null,
        });

        const page = await browser.newPage();
        const pages = await browser.pages();
        if (pages.length > 1) {
          await pages[0].close();
        }

        await page.goto(`${url1}`, { waitUntil: "networkidle2" });

        await page.waitForSelector("#cb1-edit");
        await page.type("#cb1-edit", searchFor);

        await Promise.all([
          page.waitForNavigation(),
          page.click(".nav-search-btn"),
        ]);
        const links = await page.$$eval(".ui-search-result__image > a", (el) =>
          el.map((link) => link.href)
        );

        for (const link of links) {
          if (c == 4) continue;

          await page.goto(link);
          await page.waitForSelector(".ui-pdp-title");
          const reputacao = await page.$eval(
            ".ui-seller-info",
            (element) => element.innerText
          );
          const title = await page.$eval(
            ".ui-pdp-title",
            (element) => element.innerText
          );
          const price = await page.$eval(
            ".andes-money-amount__fraction",
            (element) => element.innerText
          );  

          const seller = await page.evaluate(() => {
            const ntem = "\n"
            const el = document.querySelector(".ui-pdp-seller__link-trigger");
            if (!el) return ntem;
            return el.innerText;
          });

          ctx.reply(
            title +
              "\n" +
              "R$" +
              price +
              "\n" +
              "Vendedor: " +
              seller +
              reputacao+
              "\n " +
              link+" ", {
                reply_markup: {
                  inline_keyboard: [[{ text: "← Voltar", callback_data: "start" }]],
                },
              }
          );

          c++;
          

          await page.close();
        }
      } 
      precoconsulta(searchFor);
      
      var delayInMilliseconds33 = 13000;
      
      setTimeout(function() {
       
        
          process.exit(1)

      }, delayInMilliseconds33);

      
    
  });
});

bot.action("PI",(ctx) =>{     
    
      var url1 = "https://www.zoom.com.br/";
      let c = 1;
      ctx.reply(
        "Por favor, aguarde. Estamos procurando as melhores promoções! 😀 "
      );
      async function precoconsulta() {
        const browser = await puppeteer.launch({
          headless: false,
          defaultViewport: null,
        });

        const page = await browser.newPage();
        const pages = await browser.pages();
        if (pages.length > 1) {
          await pages[0].close();
        }

        await page.goto(`${url1}`, { waitUntil: "networkidle2" });
                 
        
        await page.screenshot({
          path: 'nova-screenshot.png',
          clip: {x: 50, y: 900, width: 1700, height: 800}
      });
        
        ctx.replyWithPhoto({ source: 'nova-screenshot.png' });
        ctx.reply("Por favor, visite https://www.zoom.com.br/ para realizar sua compra.")
        

      
        await page.close();
        var delay244 = 2000;
        var delay555 = 2000;
        setTimeout(function() {
          ctx.reply("Obrigado pela paciência!", {
            reply_markup: {
              inline_keyboard: [[{ text: "← Voltar", callback_data: "start" }]],
            },
          });
          setTimeout(function() {
          process.exit(1)
          
          },delay555);
         
        }, delay244);

        

        
      } 
      precoconsulta();
      
      

});


bot.action("RP", (ctx) => {
  ctx.reply("🕵️ Por favor, digite o nome da empresa que quer procurar a reputação:");
  bot.on("text", (ctx) => {
    let consultaproduto66 = ctx.message.text;

    var url2 = "https://www.reclameaqui.com.br/";
    async function botamazon(consulta1) {
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
      });

      const page = await browser.newPage();
      const pages = await browser.pages();
      if (pages.length > 1) {
        await pages[0].close();
      }

      await page.goto(`${url2}`, { waitUntil: "networkidle2" });

      await page.waitForSelector(".form-search.input-auto-complete-search");
      await page.type(".form-search.input-auto-complete-search", consulta1);
      await page.keyboard.press("Enter");

      await page.waitForTimeout(2000);
      await page.waitForSelector(".score");

      let vlrpreco = "";
      const valor = await page.evaluate(() => {
        let centena = document.querySelector(".score");

        if (centena != null) {
          let centena = document.querySelector(".score").textContent;

          let valor = `${centena}`;
          let semvirgula = valor.replace(",", ".");
          return semvirgula;
        } else {
          vlrpreco = 0;
        }
        return vlrpreco;
      });
      const empresalink = consultaproduto66.replace(/ /, "-");

      ctx.reply("Aguarde...");
      if (isNaN(valor)) {
        //se avaliação tiver '--' no site != de numero
        ctx.reply(
          `A avaliação de ${consultaproduto66} não é informada ` +
            ` Atenção 🛑🛑\nhttps://www.reclameaqui.com.br/empresa/${empresalink.toLowerCase()}/`
        );
      }
      if (valor == 0 || valor < 2) {
        ctx.reply(
          ` Reputação de ${consultaproduto66} no Reclame Aqui: ` +
            valor +
            ` \nNão recomendada 😬\nhttps://www.reclameaqui.com.br/empresa/${empresalink.toLowerCase()}/`
        );
      } else if (valor == 2 || valor < 4) {
        ctx.reply(
          `Reputação de ${consultaproduto66} no Reclame Aqui: ` +
            valor +
            ` \nAtenção 😐\nhttps://www.reclameaqui.com.br/empresa/${empresalink.toLowerCase()}/`
        );
      } else if (valor == 4 || valor < 6) {
        ctx.reply(
          `Reputação de ${consultaproduto66} no Reclame Aqui: ` +
            valor +
            ` \nNeutra 🤔\nhttps://www.reclameaqui.com.br/empresa/${empresalink.toLowerCase()}/`
        );
      } else if (valor == 6 || valor < 8) {
        ctx.reply(
          `Reputação de ${consultaproduto66} no Reclame Aqui: ` +
            valor +
            ` \nBoa empresa 😏\nhttps://www.reclameaqui.com.br/empresa/${empresalink.toLowerCase()}/`
        );
      } else if (valor == 8 || valor < 10) {
        ctx.reply(
          `Reputação de ${consultaproduto66} no Reclame Aqui: ` +
            valor +
            ` \nAí sim! 😀\nhttps://www.reclameaqui.com.br/empresa/${empresalink.toLowerCase()}/`
        );
      }
      await page.close();
      
    }
    var delayInMilliseconds = 10000;
    var delay2 = 2000;
    
    botamazon(consultaproduto66);
    
    setTimeout(function() {
      ctx.reply("Obrigado pela paciência!", {
        reply_markup: {
          inline_keyboard: [[{ text: "← Voltar", callback_data: "start" }]],
        },
      });
      setTimeout(function() {
      
        process.exit(1)
      }, delay2);
    }, delayInMilliseconds);

    
    
  });
});

bot.action("PI", (ctx) => {
  ctx.deleteMessage();
  ctx.reply("A função Promoções Imperdíveis está por vir");
  ctx.reply("Obrigado pela paciência!", {
    reply_markup: {
      inline_keyboard: [[{ text: "← Voltar", callback_data: "start" }]],
    },
  });
});

bot.action("AJ", (ctx) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: "Dd6qWdD2De9ZxqV",
    },
  });
  ctx.deleteMessage();

  ctx.reply("Ajuda: \n→Suporte: \nE-Mail: suporte@transversal.com", {
    reply_markup: {
      inline_keyboard: [[{ text: "→ Reportar Erro", callback_data: "ERR" }]],
    },
  });

  bot.action("ERR", (ctx) => {
    let erroreport;

    ctx.reply("Digite o problema que está tendo:");

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
          ctx.reply("O erro foi reportado! \n Obrigado por ajudar o bot a crescer. 😀");
        }
        var delayInMilliseconds = 1000;
        var delay3 = 3000;
    
    
        setTimeout(function() {
          ctx.reply("Obrigado pela paciência!", {
            reply_markup: {
              inline_keyboard: [[{ text: "← Voltar", callback_data: "start" }]],
            },
          });
          setTimeout(function() {
          
            process.exit(1)
          }, delay3);
        }, delayInMilliseconds);
      });
    });
  });
});

bot.action("MAN", (ctx) => {
  
  
  var delay4 = 1000;


  ctx.replyWithPhoto({ source: 'manual.jpeg' });

  setTimeout(function() {
    ctx.reply("Obrigado pela paciência!", {
      reply_markup: {
        inline_keyboard: [[{ text: "← Voltar", callback_data: "start" }]],
      },
    });        
    
  }, delay4);

  


});


bot.startPolling();



