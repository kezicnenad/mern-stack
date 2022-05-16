import {
  dodajNoviApartman,
  dohvatiApartmane,
  dohvatiApartman,
  dohvatiApartmaneOcjenaVecaOdCetri,
  dohvatiApartmaneIzMjesta,
  updateApartman,
  izbrisiApartman,
} from "../controllers/apartmanController.js";

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

  // KATEGORIZIRANJE (SVE OCJENE VEĆE OD 4)
  app.route("/apartmani/ocjena").get(
    ensureToken,
    (req, res, next) => {
      // MIDDLEWARE
      next();
    },
    dohvatiApartmaneOcjenaVecaOdCetri
  );

  // KATEGORIZIRANJE (SVI IZ GRADA: PLOČE)
  app.route("/apartmani/mjesto/:postanskiBroj").get(
    ensureToken,
    (req, res, next) => {
      // MIDDLEWARE
      next();
    },
    dohvatiApartmaneIzMjesta
  );

  app
    .route("/apartmani/:id")
    // DOHVAĆA SPECIFIČNI Apartman
    .get(ensureToken, dohvatiApartman)

    // NADOGRAĐUJE SPECIFIČNI Apartman
    .put(ensureToken, updateApartman)

    // BRIŠE SPECIFIČNI Apartman
    .delete(ensureToken, izbrisiApartman);
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