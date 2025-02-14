"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactType = void 0;
const graphql_1 = require("@nestjs/graphql");
var ContactType;
(function (ContactType) {
    ContactType["FINANCIAL"] = "Financial";
    ContactType["OPERATION"] = "Operation";
    ContactType["PARTNERSHIPS"] = "Partnerships";
    ContactType["QUOTES"] = "Quotes";
})(ContactType || (exports.ContactType = ContactType = {}));
(0, graphql_1.registerEnumType)(ContactType, {
    name: 'ContactType',
    description: 'Type of contact',
});
//# sourceMappingURL=contact-type.enums.js.map