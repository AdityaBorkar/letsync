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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initialize;
function initialize(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var database, device, ON_INIT_UPGRADE_SCHEMA_TO_LATEST, schemaUpgrades, latestSchema, pubsub;
        var workers = _b.workers, _pubsub = _b.pubsub, _database = _b.database;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // TODO - RUN BOTH IN SEPARATE SHARED-WORKERS
                    if (workers)
                        throw new Error("WORKERS ARE CURRENTLY NOT SUPPORTED. WORK IN PROGRESS.");
                    if (!_pubsub || _pubsub.__brand !== "LETSYNC_PUBSUB_FRONTEND")
                        throw new Error("INVALID LETSYNC_PUBSUB. Expected: LETSYNC_PUBSUB_FRONTEND, Found: ".concat(_pubsub.__brand));
                    database = _database;
                    if (!database || database.__brand !== "LETSYNC_CLIENT_DATABASE")
                        throw new Error("INVALID LETSYNC_CLIENT_DATABASE. Expected: LETSYNC_CLIENT_DATABASE, Found: ".concat(database.__brand));
                    return [4 /*yield*/, database.device.register()];
                case 1:
                    device = _c.sent();
                    ON_INIT_UPGRADE_SCHEMA_TO_LATEST = true;
                    return [4 /*yield*/, database.schema.getAvailableUpgrades()];
                case 2:
                    schemaUpgrades = _c.sent();
                    if (!(schemaUpgrades.length > 0 && ON_INIT_UPGRADE_SCHEMA_TO_LATEST)) return [3 /*break*/, 4];
                    latestSchema = schemaUpgrades[schemaUpgrades.length - 1];
                    return [4 /*yield*/, database.schema.migrate(latestSchema)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [4 /*yield*/, _pubsub.connect({
                        clientId: (device === null || device === void 0 ? void 0 : device.device.deviceId) || "",
                        token: (device === null || device === void 0 ? void 0 : device.pubsub.token) || "",
                    })];
                case 5:
                    pubsub = _c.sent();
                    // const ON_INIT_PUSH_AUTOMATICALLY = true;
                    // if (ON_INIT_PUSH_AUTOMATICALLY) await database.push();
                    // const ON_INIT_PULL_AUTOMATICALLY = true;
                    // if (ON_INIT_PULL_AUTOMATICALLY) await database.pull();
                    // const ON_INIT_LIVE_AUTOMATICALLY = true;
                    // if (ON_INIT_LIVE_AUTOMATICALLY) {
                    // 	await database.live(device?.pubsub.endpoints || [""]);
                    // }
                    return [2 /*return*/, {
                            pubsub: pubsub,
                            database: database,
                            close: function () {
                                pubsub.disconnect();
                                database.close();
                            },
                        }];
            }
        });
    });
}
