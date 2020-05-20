const Joi = require("joi");

module.exports = {
  async LoginValidator(req, res, next) {
    const schema = Joi.object()
      .keys({
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(3)
          .required()
      })
      .with("email", "password");

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async SignupValidator(req, res, next) {
    const schema = Joi.object()
      .keys({
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(8)
          .required(),
        last_name: Joi.string()
          .min(3)
          .max(30)
          .required(),
        first_name: Joi.string()
          .min(3)
          .max(30)
          .required(),
        phone_number: Joi.string()
          .min(3)
          .max(15)
          .required(),
        gender: Joi.string()
          .min(3)
          .max(10),
      })
      .with("email", "password");

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async VerifyToken(req, res, next) {
    const schema = Joi.object().keys({
      token: Joi.string()
        .min(3)
        .required()
    });

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async ForgotPassword(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
    });

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async ResetPassword(req, res, next) {
    const schema = Joi.object()
      .keys({
        token: Joi.string()
          .min(3)
          .required(),
        newPassword: Joi.string()
          .min(8)
          .required()
      })
      .with("token", "newPassword");

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async ChangePassword(req, res, next) {
    const schema = Joi.object()
      .keys({
        oldPassword: Joi.string() // remove for old users
          .min(3)
          .required(),
        newPassword: Joi.string()
          .min(8)
          .required()
      })
      .with("oldPassword", "newPassword");

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async CheckEmail(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
    });

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async UpdateUserValidator(req, res, next) {
    const schema = Joi.object().keys({
      last_name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      first_name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      middle_name: Joi.string()
        .min(3)
        .max(30),
      dob: Joi.date()
        .max("now")
        .required(),
      gender: Joi.string()
        .min(3)
        .max(10)
        .required(),
      contactAddress: Joi.string()
        .min(3)
        .max(100)
        .required(),
      phone: Joi.string()
        .min(5)
        .max(20)
        .required()
    });

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async UpdateBankValidator(req, res, next) {
    const schema = Joi.object().keys({
      bank_name: Joi.string()
        .min(2)
        .max(60)
        .required(),
      bank_account_name: Joi.string()
        .min(3)
        .max(100)
        .required(),
      bank_account_number: Joi.string()
        .min(5)
        .max(30),
      bank_code: Joi.string()
        .min(3)
        .max(9)
    });

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
  async VerifyBankValidator(req, res, next) {
    const schema = Joi.object().keys({
      bank_code: Joi.string()
        .min(2)
        .max(4)
        .required(),
      bank_account_number: Joi.string()
        .min(5)
        .max(30)
    });

    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send(`${error.details[0].message}`);
    } else {
      return next();
    }
  },
};
