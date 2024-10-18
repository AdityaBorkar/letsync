"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = clientDb;
var flush_js_1 = require("./flush.js");
var pull_js_1 = require("./pull.js");
var push_js_1 = require("./push.js");
var live_js_1 = require("./live.js");
var close_js_1 = require("./close.js");
var register_js_1 = require("./device/register.js");
var deregister_js_1 = require("./device/deregister.js");
var subscribe_js_1 = require("./event/subscribe.js");
var unsubscribe_js_1 = require("./event/unsubscribe.js");
var sql_js_1 = require("./sql.js");
var migrate_js_1 = require("./schema/migrate.js");
var getAvailableUpgrades_js_1 = require("./schema/getAvailableUpgrades.js");
function clientDb(props) {
    var database = props.dbOpsAdapter, pubsub = props.pubsub, dbSchema = props.dbSchema, apiBaseUrl = props.apiBaseUrl;
    if (pubsub.__brand !== "LETSYNC_PUBSUB_FRONTEND")
        throw new Error("Invalid pubsub");
    var storageMetrics = database.storageMetrics, exportData = database.exportData;
    var MetadataManager = {
        remove: function (name) {
            return database.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["DELETE FROM metadata WHERE name = ", ""], ["DELETE FROM metadata WHERE name = ", ""])), name);
        },
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        upsert: function (name, content) {
            var contentJSON = JSON.stringify(content);
            return database.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["INSERT INTO metadata (name, content, lastUpdated) VALUES (", ", ", ", ", ") ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated"], ["INSERT INTO metadata (name, content, lastUpdated) VALUES (", ", ", ", ", ") ON CONFLICT (name) DO UPDATE SET content = EXCLUDED.content, lastUpdated = EXCLUDED.lastUpdated"])), name, contentJSON, new Date().toISOString());
        },
        get: function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var record, content;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, database.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["SELECT * FROM metadata WHERE name = ", ""], ["SELECT * FROM metadata WHERE name = ", ""])), name)];
                        case 1:
                            record = _a.sent();
                            content = record.rows[0].content;
                            return [2 /*return*/, JSON.parse(content)];
                    }
                });
            });
        },
    };
    var superProps = {
        name: "SET THIS",
        metadata: MetadataManager,
        database: database,
        pubsub: pubsub,
        dbSchema: dbSchema,
        apiBaseUrl: apiBaseUrl,
    };
    return {
        exportData: exportData,
        storageMetrics: storageMetrics,
        sql: function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return (0, sql_js_1.default)(params, superProps);
        },
        // query: (query: string) => query(query, Props),
        // txn: (tx: any) => txn({ tx, ...Props }),
        close: function () { return (0, close_js_1.default)({}, superProps); },
        flush: function () { return (0, flush_js_1.default)({}, superProps); },
        pull: function () { return (0, pull_js_1.default)({}, superProps); },
        push: function () { return (0, push_js_1.default)({}, superProps); },
        live: function (endpoints) { return (0, live_js_1.default)({ endpoints: endpoints }, superProps); },
        device: {
            register: function () { return (0, register_js_1.register)({}, superProps); },
            deregister: function () { return (0, deregister_js_1.deregister)({}, superProps); },
        },
        event: {
            subscribe: function (eventName, callback) {
                return (0, subscribe_js_1.default)({ eventName: eventName, callback: callback }, superProps);
            },
            unsubscribe: function (eventName, callback) {
                return (0, unsubscribe_js_1.default)({ eventName: eventName, callback: callback }, superProps);
            },
        },
        schema: {
            migrate: function (version) { return (0, migrate_js_1.default)({ version: version }, superProps); },
            getAvailableUpgrades: function () { return (0, getAvailableUpgrades_js_1.default)(undefined, superProps); },
        },
    };
}
var templateObject_1, templateObject_2, templateObject_3;
// TODO - REPLACE NAMES WITH ARCHITECTURE DESIGN PATTERNS
