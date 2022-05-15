import stripe from 'stripe'

const routes = (app) => {

  // KOJE SU USLUGE I PO KOJOJ CJENI (U LIPAMA)
  const storeItems = new Map([
    [1, { priceInCents: 20, name: "Lekcija #1" }],
    [2, { priceInCents: 10, name: "Lekcija #2" }],
  ]);

  app.post("/izvrsi-placanje", ensureToken, async (req, res) => {
    try {
      const placanje = stripe(process.env.TEST_STRIPE_SECRET_KEY);
      const session = await placanje.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map((item) => {
          const storeItem = storeItems.get(item.id);
          return {
            price_data: {
              currency: "hrk",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${process.env.CLIENT_URL}/`,
        cancel_url: `${process.env.CLIENT_URL}/greska/`,
      });
      res.json({ url: session.url });
      console.log("Success");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
};

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
    console.log(
      "Neovlašten upad korištenjem metode",
      req.method.toString().toLowerCase(),
      "na lokaciji",
      req.originalUrl.toString().slice(1)
    );
  }
};

export default routes;
