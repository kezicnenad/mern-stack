import {
  dodajNoviStatic,
  dohvatiStatic,
  dohvatiJedanStatic,
  updateJedanStatic,
  izbrisiJedanStatic,
} from "../controllers/staticController.js";

const routes = (app) => {
  app
    .route("/static")
    .get(
      ensureToken,
      (req, res, next) => {
        // MIDDLEWARE
        next();
      },
      dohvatiStatic
    )

    // POST ENDPOINT
    .post(ensureToken, dodajNoviStatic);

  app
    .route("/static/:id")
    // DOHVAĆA SPECIFIČNI Static
    .get(ensureToken, dohvatiJedanStatic)

    // NADOGRAĐUJE SPECIFIČNI Static
    .put(ensureToken, updateJedanStatic)

    // BRIŠE SPECIFIČNI Static
    .delete(ensureToken, izbrisiJedanStatic);
}

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403)
    console.log("Neovlašten upad korištenjem metode", req.method.toString().toLowerCase(), 'na lokaciji', (req.originalUrl).toString().slice(1));

  }
};

export default routes