import { dodajNoviArtikl, dohvatiArtikle, dohvatiJedanArtikl, updateJedanArtikl, izbrisiJedanArtikl } from '../controllers/artikliController.js'

const routes = (app) => {
  app.route('/artikli')
    .get((req, res, next) => {
      // MIDDLEWARE
      console.log(`Request from: ${req.originalUrl}`)
      console.log(`Request type: ${req.method}`)
      next()
    }, dohvatiArtikle)

    // POST ENDPOINT
    .post(dodajNoviArtikl)

  app.route("/artikli/:id")
    // DOHVAĆA SPECIFIČNI ARTIKL
    .get(dohvatiJedanArtikl)

    // NADOGRAĐUJE SPECIFIČNI ARTIKL
    .put(updateJedanArtikl)

    // BRIŠE SPECIFIČNI ARTIKL
    .delete(izbrisiJedanArtikl)
}

export default routes