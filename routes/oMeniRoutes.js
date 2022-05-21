import {
  dodajNoviOMeni,
  dohvatiOMenie,
  dohvatiOMeni,
  dohvatiOMenieOcjenaVecaOdTri,
  dohvatiOMenieIzMjesta,
  updateOMeni,
  izbrisiOMeni,
} from "../controllers/oMeniController.js";

const routes = (app) => {
  app
    .route("/oMeni")
    .get(
      ensureToken,
      (req, res, next) => {
        // MIDDLEWARE
        next();
      },
      dohvatiOMenie
    )

    // POST ENDPOINT
    .post(ensureToken, dodajNoviOMeni);

  // KATEGORIZIRANJE (SVE OCJENE VEĆE OD 4)
  app.route("/oMeni/ocjena").get(
    ensureToken,
    (req, res, next) => {
      // MIDDLEWARE
      next();
    },
    dohvatiOMenieOcjenaVecaOdTri
  );

  // KATEGORIZIRANJE (SVI IZ GRADA: PLOČE)
  app.route("/oMeni/mjesto/:postanskiBroj").get(
    ensureToken,
    (req, res, next) => {
      // MIDDLEWARE
      next();
    },
    dohvatiOMenieIzMjesta
  );

  app
    .route("/oMeni/:id")
    // DOHVAĆA SPECIFIČNI OMeni
    .get(ensureToken, dohvatiOMeni)

    // NADOGRAĐUJE SPECIFIČNI OMeni
    .put(ensureToken, updateOMeni)

    // BRIŠE SPECIFIČNI OMeni
    .delete(ensureToken, izbrisiOMeni);
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