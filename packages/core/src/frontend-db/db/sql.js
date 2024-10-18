"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sql;
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function sql(params, props) {
    var database = props.database;
    // TODO -
    // GRANT UPDATE ON dbo.tblTest(f1,f3) TO user1;
    // DENY UPDATE ON dbo.tblTest(f2 ) TO user1;
    // TODO - IMPLEMENT DATABASE SCHEMA PROTECTION RULES (OR ACCESS CONTROL RULES)
    return "OK"; // database.sql(query);
}
