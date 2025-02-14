"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRole = void 0;
const graphql_1 = require("@nestjs/graphql");
var JobRole;
(function (JobRole) {
    JobRole["Owner_Director"] = "Owner/Director";
    JobRole["Pricing"] = "Pricing";
    JobRole["Financial"] = "Financial";
    JobRole["Manager"] = "Manager";
    JobRole["Partnership_Dev"] = "Partnership Dev";
    JobRole["Business_Dev_Sales"] = "Business Dev/Sales";
})(JobRole || (exports.JobRole = JobRole = {}));
(0, graphql_1.registerEnumType)(JobRole, {
    name: 'JobProfile',
    description: 'Designation of the job profile',
});
//# sourceMappingURL=job-profile.enums.js.map