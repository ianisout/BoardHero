const express = require("express");
const { Router, request } = require("express");
const { User } = require("../database/models");
const UserController = require("../controllers/UserController");
const UserModel = require("../models/User");

const router = Router();

router.get("/signup", (request, response, next) => {
    response.render("signup")
})

router.post("/signup", async (request, response, next) => {
  const { nome, nickname, email, confirmEmail, password, confirmPassword } =
    request.body;

  await UserController.createUser(
    nome,
    nickname,
    email,
    confirmEmail,
    password,
    confirmPassword
  );

  response.status(201).redirect("/homepage");
});
