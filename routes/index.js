"use strict";

module.exports = route => {
    require("./auth.route")(route)
    require("./user.route")(route)
}