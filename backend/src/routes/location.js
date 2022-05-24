const { Router } = require("express");
const router = Router();
const axios = require("axios");
const BASE_URL = "https://apis.datos.gob.ar/georef/api";

router.get("/user/:latitude/:longitude", async (req, res) => {
  const { latitude, longitude } = req.params;

  try {
    const json = await axios.get(
      `${BASE_URL}/ubicacion?lat=${latitude}&lon=${longitude}&aplanar=true&campos=estandar`
    );
    const { provincia_id: provinceId, provincia_nombre: provinceName } =
      json.data.ubicacion;

    const api = await axios.get(
      `${BASE_URL}/municipios?provincia=${provinceId}&orden=nombre&aplanar=true&campos=basico&max=1000&exacto=true`
    );
    const cities = api.data.municipios;

    const citiesMapped = cities.map((city) => {
      return {
        id: city.id,
        city: city.nombre,
        province: provinceName,
      };
    });

    return res
      .status(200)
      .send({ cities: citiesMapped, province: provinceName });
  } catch (error) {
    res.send(error);
    return res.status(400).send({ msg: "Error al obtener la ubicación" });
  }
});

router.get("/user/provinces", async (req, res) => {
  try {
    const json = await axios.get(
      `${BASE_URL}/provincias?orden=nombre&aplanar=true&campos=basico&exacto=true`
    );
    const provinces = json.data;

    if (!provinces.length)
      return res.status(400).send({ msg: "No se encontraron provincias" });

    console.log(json);
    return res.send(provinces);
  } catch (error) {
    res.send(error);
    return res.status(400).send({ msg: "Error al obtener la ubicación" });
  }
});

router.get("/cities", async (req, res) => {
  const { name } = req.query;

  try {
    const json = await axios.get(
      `${BASE_URL}/municipios?nombre=${name}&aplanar=true&campos=estandar`
    );
    const cities = json.data.municipios;
    console.log(cities);

    if (!cities.length)
      return res.status(404).send({ msg: "No se encontraron ciudades." });

    const citiesMapped = cities.map((city) => {
      return {
        id: city.id,
        city: city.nombre,
        province: city.provincia_nombre,
      };
    });

    return res.send(citiesMapped);
  } catch (error) {
    res.send(error);
    return res.status(400).send({ msg: "Error al obtener la ubicación" });
  }
});

// router.get("/cities/:idProvince", async (req, res) => {
//   const { idProvince } = req.params;
//   console.log(req.params);
//   try {
//     const api = await axios.get(
//       `${BASE_URL}/municipios?provincia=${idProvince}&orden=nombre&aplanar=true&campos=basico&max=1000&exacto=true`
//     );
//     const municipios = await api.json();
//     return res.send(municipios);
//   } catch (error) {
//     res.send(error);
//     return res.status(400).send({ msg: "Error al obtener la ubicación" });
//   }
// });

module.exports = router;
