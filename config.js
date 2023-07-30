const TESTMODE = "TST";
let DOMAIN;
switch (TESTMODE) {
  case "TST":
    DOMAIN = "xxx";
    break;
  case "PRE":
    DOMAIN = "xxx";
    break;
  case "PRD":
    DOMAIN = "xxx";
  default:
    DOMAIN = "xxx";
    break;
}
const config = {
  DOMAIN,
};
module.exports = config;