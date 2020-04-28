const express = require("express");
const Signup = require("../models/Signup");

const router = express.Router();

router.get("/getRestaurants", (request, response) => {
  Signup.getRestaurants((err, result) => {
    if (err.error) {
      return response.status(404).json(err);
    }
    return response.status(200).json(result);
  });
});

router.post("/checkAvailableAccountId", (request, response) => {
  const account_id = request.body.account_id;
  Signup.checkAvailableAccountId(account_id, (err, result) => {
    if (err.error) {
      return response.status(404).json(err);
    }
    return response.status(200).json(result);
  });
});

module.exports = router;
