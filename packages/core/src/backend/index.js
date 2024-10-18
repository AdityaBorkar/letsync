"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = exports.db = exports.device = void 0;
var delete_js_1 = require("./cache/delete.js");
var retrieve_js_1 = require("./cache/retrieve.js");
var upsert_js_1 = require("./cache/upsert.js");
var add_js_1 = require("./db/changes/add.js");
var get_js_1 = require("./db/changes/get.js");
var status_js_1 = require("./db/changes/status.js");
var index_js_1 = require("./db/init/index.js");
var register_js_1 = require("./device/register.js");
var unregister_js_1 = require("./device/unregister.js");
var capture_js_1 = require("./db/cdc/capture.js");
exports.device = {
    register: register_js_1.default,
    unregister: unregister_js_1.default,
};
exports.db = {
    init: index_js_1.default,
    cdc: {
        capture: capture_js_1.default,
    },
    changes: {
        add: add_js_1.default,
        get: get_js_1.default,
        status: status_js_1.default,
    },
};
exports.cache = {
    delete: delete_js_1.default,
    retrieve: retrieve_js_1.default,
    upsert: upsert_js_1.default,
};
