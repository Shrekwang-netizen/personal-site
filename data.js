/* Content for the personal site. This is JavaScript, not a JSON file.
   Edit the values below; keep quotes and commas intact.
   Page headings and interface labels also live in HTML and assets/app.js.
   Cocktail notes preserve the supplied ingredients and ratios; they are not
   necessarily complete recipes. An empty note leaves only the source link. */

const SITE = {
  "name": "Shrek",
  "title": "Shrek Wang",
  "email": "ziwangshrek@deepseek.com",
  "wechat": "imtheshrekwz",
  "hero": {
    "subtitle": "Recruiter · Bartender · Ex-boxer",
    "line2": "Hi, I'm Shrek. I recruit engineers at DeepSeek AI."
  },
  "socials": [
    {
      "label": "GitHub",
      "url": "https://github.com/Shrekwang-netizen"
    },
    {
      "label": "Instagram",
      "url": "https://instagram.com/shrek_wangzi"
    },
    {
      "label": "Email",
      "url": "mailto:ziwangshrek@deepseek.com"
    }
  ]
};

const JOBS = [
  {
    "id": "backend-engineer",
    "title": "Backend Engineer",
    "track": "Experienced",
    "team": "Training Data",
    "city": "Beijing",
    "oneLiner": "Build services in C++ or Go to store and deliver training data, with a focus on I/O performance.",
    "why": [
      "Build high-throughput storage and sample delivery services.",
      "Profile performance and maintain data integrity."
    ],
    "looking": [
      "Strong C++ or Go skills.",
      "Experience profiling services and debugging issues across systems."
    ]
  },
  {
    "id": "elastic-compute-engineer",
    "title": "Elastic Compute Engineer",
    "track": "Experienced",
    "team": "Compute",
    "city": "Beijing",
    "oneLiner": "Build and operate elastic compute clusters, with a focus on scheduling, isolation and reliability.",
    "why": [
      "Work on cluster scheduling and resource isolation.",
      "Improve performance, observability and reliability."
    ],
    "looking": [
      "Experience operating production infrastructure.",
      "In-depth knowledge of scheduling, container isolation or observability."
    ]
  }
];

const FEATURED_SITE = {
  "name": "AIFLOW",
  "desc": "My side project following hiring, career moves and team changes across the AI industry.",
  "url": "https://shrekwang-netizen.github.io/aiflow-site/"
};

const COCKTAILS = [
  {
    "name": "Japanese Drifter",
    "note": "1 egg white, 1 oz gin, 1 oz Midori, 0.5 oz yuzu ume, 0.5 oz bergamotto.",
    "url": "https://telling-winter-a1e.notion.site/Japanese-Drifter-2e35a83a701d80ae8ef5c24e8bb8fa81"
  },
  {
    "name": "Yuzu Negroni",
    "note": "7.5 ml yuzu liqueur, 22.5 ml Suze, 22.5 ml herbal gin (N.I.P / Kinobi), 15 ml Cocchi Americano.",
    "url": "https://telling-winter-a1e.notion.site/Yuzu-Negroni-29b5a83a701d8038af9ee05da4884474"
  },
  {
    "name": "Long Island Iced Tea",
    "note": "",
    "url": "https://telling-winter-a1e.notion.site/Long-Island-Iced-tea-1b15a83a701d80629770d634a892702e"
  },
  {
    "name": "Margarita",
    "note": "2 oz blanco tequila, 0.5 oz orange liqueur, 1 oz lime juice, optional 0.5 oz agave syrup.",
    "url": "https://telling-winter-a1e.notion.site/Margarita-1b15a83a701d805587abc482aad267de"
  },
  {
    "name": "Kiwi Iced Tea",
    "note": "0.5 oz each of gin, tequila, rum, Midori and vodka, 0.75 oz lemon juice, 1 oz pineapple juice, 0.1 oz simple syrup, half a kiwi (muddled).",
    "url": "https://telling-winter-a1e.notion.site/Kiwi-Iced-Tea-1b15a83a701d80099b2bc356f0ddc501"
  },
  {
    "name": "Espresso Martini",
    "note": "Vodka, coffee liqueur, fresh espresso.",
    "url": "https://telling-winter-a1e.notion.site/Espresso-Martini-1b15a83a701d8079aa1bf4b43db6c4f7"
  },
  {
    "name": "Gin Fizz",
    "note": "Gin, lemon, sugar, soda.",
    "url": "https://telling-winter-a1e.notion.site/Gin-Fizz-1b15a83a701d80e28c08cab03f291cbb"
  },
  {
    "name": "Strawberry Gin Fizz",
    "note": "3 strawberries, 0.75 oz lemon juice, 0.5 oz simple syrup, 0.75 oz dry vermouth, 1.5 oz gin, 1 egg white (0.5 oz), top with club soda.",
    "url": "https://telling-winter-a1e.notion.site/Strawberry-Gin-Fizz-1b15a83a701d8086b76bdaa7ae4e6738"
  },
  {
    "name": "Daiquiri",
    "note": "Rum, lime, sugar.",
    "url": "https://telling-winter-a1e.notion.site/Daiquiri-1b15a83a701d80fa82b8e5a6d9f33875"
  },
  {
    "name": "Whiskey Sour",
    "note": "Bourbon, lemon, sugar, optional egg white for the foam.",
    "url": "https://telling-winter-a1e.notion.site/Whiskey-Sour-1b15a83a701d808f99c4c0344c5fe01f"
  },
  {
    "name": "Gin n Tonic",
    "note": "Gin, tonic, lime.",
    "url": "https://telling-winter-a1e.notion.site/Gin-n-Tonic-1b15a83a701d80ea88c3eaa9bc874b10"
  },
  {
    "name": "Henny & Coke",
    "note": "Cognac and cola.",
    "url": "https://telling-winter-a1e.notion.site/Henny-Coke-1b15a83a701d80388447e7390a7cc60e"
  },
  {
    "name": "Campari Spritz",
    "note": "Campari, prosecco, soda water, orange.",
    "url": "https://telling-winter-a1e.notion.site/Campari-Spritz-1b15a83a701d80d19130f15ff2187a10"
  },
  {
    "name": "Negroni",
    "note": "1 oz gin, 1 oz Campari, 1 oz sweet vermouth.",
    "url": "https://telling-winter-a1e.notion.site/Negroni-1b15a83a701d8045afa7c21b0732fb83"
  },
  {
    "name": "Paloma",
    "note": "Tequila, grapefruit soda, lime, salt rim.",
    "url": "https://telling-winter-a1e.notion.site/Paloma-1b15a83a701d8093bd13f413829fe019"
  },
  {
    "name": "Rosita",
    "note": "Tequila's take on the Negroni.",
    "url": "https://telling-winter-a1e.notion.site/Rosita-1b15a83a701d8044a1acf4b6d8c3de34"
  },
  {
    "name": "Gimlet",
    "note": "Gin and lime cordial.",
    "url": "https://telling-winter-a1e.notion.site/Gimlet-1b15a83a701d8026be79ca4a085c0cbf"
  },
  {
    "name": "Gin Sour",
    "note": "Gin, lemon, sugar, egg white.",
    "url": "https://telling-winter-a1e.notion.site/Gin-Sour-1b15a83a701d806e9bb6dc259a71a35e"
  },
  {
    "name": "14 Hours Ahead",
    "note": "",
    "url": "https://telling-winter-a1e.notion.site/14-Hours-Ahead-1b15a83a701d80c6a40be1237245ead9"
  },
  {
    "name": "Rum Flip",
    "note": "Rum, sugar, whole egg, nutmeg on top.",
    "url": "https://telling-winter-a1e.notion.site/Rum-Flip-1b15a83a701d80719c89f6aaf0b551f5"
  },
  {
    "name": "Vodka Martini",
    "note": "Vodka and dry vermouth.",
    "url": "https://telling-winter-a1e.notion.site/Vodka-Martini-1b15a83a701d8024aacac093d5eb5743"
  },
  {
    "name": "Lincoln Club Cooler",
    "note": "",
    "url": "https://telling-winter-a1e.notion.site/Lincoln-Club-Cooler-1b15a83a701d801ca8a8dfb1ed6f6a3c"
  },
  {
    "name": "Reggae Punch",
    "note": "Rum-forward punch with tropical notes.",
    "url": "https://telling-winter-a1e.notion.site/Reggae-Punch-1b15a83a701d80cfbf92ca16c468a5ae"
  },
  {
    "name": "Mojito",
    "note": "Rum, mint, lime, sugar, soda.",
    "url": "https://telling-winter-a1e.notion.site/Mojito-1b15a83a701d8065acdbf01afd4fe5ba"
  },
  {
    "name": "Penicillin",
    "note": "Blended scotch, lemon, honey-ginger, peated float.",
    "url": "https://telling-winter-a1e.notion.site/Penicillin-1b15a83a701d80288889f061b72e1d87"
  },
  {
    "name": "Tea Ceremony (Martinis)",
    "note": "Tea-infused martini.",
    "url": "https://telling-winter-a1e.notion.site/Tea-Ceremony-Martinys-1b65a83a701d80f88885c4eb89cf200a"
  },
  {
    "name": "Lynchburg Lemonade",
    "note": "Whiskey, lemon, sugar, soda.",
    "url": "https://telling-winter-a1e.notion.site/Lynchburg-Lemonade-1b15a83a701d80608b29c15edb9cdb13"
  },
  {
    "name": "Hoji",
    "note": "Roasted tea and spirits.",
    "url": "https://telling-winter-a1e.notion.site/Hoji-1b15a83a701d80f0be65d737e62bb492"
  },
  {
    "name": "Cucumber Lime",
    "note": "",
    "url": "https://telling-winter-a1e.notion.site/Cucumber-Lime-1b25a83a701d800cad3ff28e98be1341"
  },
  {
    "name": "Jungle Bird",
    "note": "Dark rum, Campari, pineapple, lime.",
    "url": "https://telling-winter-a1e.notion.site/Jungle-Bird-1b45a83a701d80a28fa0d0692860d320"
  },
  {
    "name": "Siésta",
    "note": "Tequila, Campari, grapefruit, lime.",
    "url": "https://telling-winter-a1e.notion.site/Si-sta-1b65a83a701d80179f1ee6464dcc6c0c"
  },
  {
    "name": "Nordic Gibson",
    "note": "",
    "url": "https://telling-winter-a1e.notion.site/Nordic-Gibson-1ba5a83a701d80afbd91d683fb62c3a5"
  },
  {
    "name": "Clover Leaf",
    "note": "Gin, lemon, raspberry syrup, egg white.",
    "url": "https://telling-winter-a1e.notion.site/Clover-Leaf-1ff5a83a701d80e79ff3d545df28f3f0"
  },
  {
    "name": "Bushwick",
    "note": "Rye, sweet vermouth, maraschino, Campari.",
    "url": "https://telling-winter-a1e.notion.site/Bushwick-1ff5a83a701d806fb6f8f7940e828353"
  },
  {
    "name": "Brooklyn",
    "note": "Rye, dry vermouth, maraschino, Amer Picon.",
    "url": "https://telling-winter-a1e.notion.site/Brooklyn-1ff5a83a701d8074af0ee7d6dd1c3907"
  },
  {
    "name": "Cafe Royal Tequila Matador",
    "note": "Tequila, pineapple, lime.",
    "url": "https://telling-winter-a1e.notion.site/Cafe-Royal-Tequila-Matador-1ff5a83a701d8080b72bc1a39de72733"
  },
  {
    "name": "Pornstar Martini",
    "note": "Vanilla vodka, passionfruit, lime, prosecco chaser.",
    "url": "https://telling-winter-a1e.notion.site/PornStar-Martini-2025a83a701d8061a03fec308587a004"
  },
  {
    "name": "Wait This Ain't Water",
    "note": "",
    "url": "https://telling-winter-a1e.notion.site/Wait-This-Ain-t-Water-22d5a83a701d802ca724fb4d07987317"
  },
  {
    "name": "Ramos Gin Fizz",
    "note": "Gin, lemon, lime, sugar, cream, egg white, orange flower water.",
    "url": "https://telling-winter-a1e.notion.site/Ramos-Gin-Fizz-22d5a83a701d808192c6daac25914d02"
  },
  {
    "name": "Molly Flower",
    "note": "A floral house pour.",
    "url": "https://telling-winter-a1e.notion.site/Molly-Flower-22f5a83a701d80debd71fd488c37413e"
  }
];

const SPOTIFY = {
  "album": "6fsUzP5FKZDwW6atbi2wPi"
};

const ABOUT = {
  "headline": "About",
  "paragraphs": [
    "Hi, I'm Shrek. I recruit engineers at DeepSeek AI.",
    "I studied multilingualism at NYU. Outside work, I tend bar and play guitar. I'm a former boxer, too."
  ],
  "contactTitle": "Say hello",
  "contactText": "Curious about a role at DeepSeek, or just want to say hello? I'd be happy to hear from you by email or WeChat."
};
