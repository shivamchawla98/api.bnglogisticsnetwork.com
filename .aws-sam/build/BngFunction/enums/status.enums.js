"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitationTeamMember = void 0;
const graphql_1 = require("@nestjs/graphql");
var invitationTeamMember;
(function (invitationTeamMember) {
    invitationTeamMember["pending"] = "pending";
    invitationTeamMember["accepted"] = "accepted";
    invitationTeamMember["rejected"] = "rejected";
})(invitationTeamMember || (exports.invitationTeamMember = invitationTeamMember = {}));
(0, graphql_1.registerEnumType)(invitationTeamMember, {
    name: "invitationTeamMember",
    description: "Status of team member invitation"
});
//# sourceMappingURL=status.enums.js.map