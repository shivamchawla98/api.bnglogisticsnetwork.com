"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = void 0;
const graphql_1 = require("@nestjs/graphql");
var location;
(function (location) {
    location["Chandigarh_India"] = "Chandigarh_India";
    location["Chennai_India"] = "Chennai_India";
    location["Dehradun_India"] = "Dehradun_India";
    location["Kochin_India"] = "Kochin_India";
    location["Mumbai_India"] = "Mumbai_India";
    location["Noida_India"] = "Noida,India";
})(location || (exports.location = location = {}));
(0, graphql_1.registerEnumType)(location, {
    name: "location",
    description: "Location of member"
});
//# sourceMappingURL=location.enums.js.map