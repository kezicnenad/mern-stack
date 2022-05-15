import { dodajNoviArtikl, dohvatiArtikle, dohvatiJedanArtikl, updateJedanArtikl, izbrisiJedanArtikl } from '../controllers/artikliController.js'

const routes = (app) => {
  app
    .route("/artikli")
    .get(
      ensureToken,
      (req, res, next) => {
        // MIDDLEWARE
        next();
      },
      dohvatiArtikle
    )

    // POST ENDPOINT
    .post(ensureToken, dodajNoviArtikl);

  app
    .route("/artikli/:id")
    // DOHVAĆA SPECIFIČNI ARTIKL
    .get(ensureToken, dohvatiJedanArtikl)

    // NADOGRAĐUJE SPECIFIČNI ARTIKL
    .put(ensureToken, updateJedanArtikl)

    // BRIŠE SPECIFIČNI ARTIKL
    .delete(ensureToken, izbrisiJedanArtikl);
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