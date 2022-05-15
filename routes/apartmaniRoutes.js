import {
  dodajNoviApartman,
  dohvatiApartmane,
  dohvatiJedanApartman,
  updateJedanApartman,
  izbrisiJedanApartman,
} from "../controllers/apartmaniController.js";

const routes = (app) => {
  app
    .route("/apartmani")
    .get(
      ensureToken,
      (req, res, next) => {
        // MIDDLEWARE
        next();
      },
      dohvatiApartmane
    )

    // POST ENDPOINT
    .post(ensureToken, dodajNoviApartman);

  app
    .route("/apartmani/:id")
    // DOHVAĆA SPECIFIČNI Apartman
    .get(ensureToken, dohvatiJedanApartman)

    // NADOGRAĐUJE SPECIFIČNI Apartman
    .put(ensureToken, updateJedanApartman)

    // BRIŠE SPECIFIČNI Apartman
    .delete(ensureToken, izbrisiJedanApartman);
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