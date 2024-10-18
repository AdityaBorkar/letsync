"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deviceRegister;
var cuid2_1 = require("@paralleldrive/cuid2");
var jsonwebtoken_1 = require("jsonwebtoken");
var getLatestSchema_js_1 = require("@/backend/utils/getLatestSchema.js");
function deviceRegister(params) {
    return __awaiter(this, void 0, void 0, function () {
        var database, pubsub, request, auth, acl, userId, device, metadata, ACL, endpoints, schema, token, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    database = params.database, pubsub = params.pubsub, request = params.request, auth = params.auth, acl = params.acl;
                    userId = auth.userId;
                    device = { userId: userId, isActive: true, deviceId: (0, cuid2_1.createId)() };
                    metadata = decodeURI(new URL(request.url).searchParams.get("metadata") || "");
                    ACL = acl({ userId: userId, metadata: metadata });
                    if (!ACL)
                        return [2 /*return*/, new Response(JSON.stringify({ error: "Unauthorized" }), {
                                status: 401,
                            })];
                    endpoints = __spreadArray(__spreadArray([], (ACL.roles || []).map(function (role) { return "role:".concat(role); }), true), [
                        "user:".concat(userId),
                    ], false);
                    return [4 /*yield*/, (0, getLatestSchema_js_1.default)()];
                case 1:
                    schema = _a.sent();
                    return [4 /*yield*/, params.database.waitUntilReady()];
                case 2:
                    _a.sent();
                    if (!(database.type === "SQL")) return [3 /*break*/, 4];
                    return [4 /*yield*/, database.query("INSERT INTO devices (deviceId, userId, isActive, schemaVersion) VALUES ('".concat(device.deviceId, "', '").concat(device.userId, "', TRUE, ").concat(schema.version, ")"))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    token = jsonwebtoken_1.default.sign({ userId: userId, deviceId: device.deviceId }, pubsub.secret, { expiresIn: "24h" });
                    response = {
                        device: device,
                        schema: schema,
                        pubsub: { token: token, endpoints: endpoints },
                    };
                    return [2 /*return*/, new Response(JSON.stringify(response), { status: 200 })];
                case 5:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [2 /*return*/, new Response(JSON.stringify({ error: "Internal Server Error" }), {
                            status: 500,
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
