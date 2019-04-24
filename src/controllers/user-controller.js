"use strict";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/user-repository");
const md5 = require("md5");
const authService = require("../services/auth-service");
const emailService = require("../services/email-service");

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    let id = req.body.id;
    await repository.delete(id);

    res.status(201).send({
      message: "Usuário excluido com sucesso!"
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.post = async (req, res, next) => {
  console.log(req.body.codeEmployee);
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.name,
    3,
    "O nome deve conter pelo menos 3 caracteres"
  );
  contract.isEmail(req.body.email, "E-mail inválido");
  contract.hasMinLen(
    req.body.password,
    6,
    "A senha deve conter pelo menos 6 caracteres"
  );

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res
      .status(400)
      .send(contract.errors())
      .end();
    return;
  }

  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + process.env.SALT_KEY),
      roles: ["admin"],
      allocated: req.body.allocated,
      officeHourInput: req.body.officeHourInput,
      officeHourExit: req.body.officeHourExit,
      codeEmployee: req.body.codeEmployee,
      active: req.body.active
    });

    emailService.send(
      req.body.email,
      "Bem vindo ao Node Store",
      process.env.TEMPLATE_EMAIL.replace("{0}", req.body.name)
    );

    res.status(201).send({
      message: "Cliente cadastrado com sucesso!"
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const user = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + process.env.SALT_KEY)
    });

    if (!user) {
      res.status(404).send({
        message: "Usuário ou senha inválidos"
      });
      return;
    }

    const token = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles
    });

    res.status(201).send({
      token: token,
      data: {
        email: user.email,
        name: user.name
      }
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);

    const user = await repository.getById(data.id);

    if (!user) {
      res.status(404).send({
        message: "Cliente não encontrado"
      });
      return;
    }

    const tokenData = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles
    });

    res.status(201).send({
      token: token,
      data: {
        email: user.email,
        name: user.name
      }
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};
