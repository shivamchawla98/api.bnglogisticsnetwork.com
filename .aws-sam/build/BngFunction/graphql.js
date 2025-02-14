"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMutation = exports.IQuery = exports.Plan = exports.LoginResponse = exports.UserInfo = exports.Invitation = exports.Team = exports.User = exports.Company = exports.Certification = exports.CompanyService = exports.CompanyLocation = exports.Invoice = exports.Payment = exports.ISubscription = exports.UserAdditionalInfo = exports.UpdateCompanyServicesInput = exports.CreateCompanyLocationInput = exports.CreateCompanyInput = exports.InviteTeamMemberInput = exports.UpdateUserInput = exports.CreateUserAdditionalInfoInput = exports.CreateUserInput = exports.ResetPasswordInput = exports.LoginUserInput = exports.Timezone = exports.location = exports.JobProfile = exports.ContactType = void 0;
var ContactType;
(function (ContactType) {
    ContactType["FINANCIAL"] = "FINANCIAL";
    ContactType["OPERATION"] = "OPERATION";
    ContactType["PARTNERSHIPS"] = "PARTNERSHIPS";
    ContactType["QUOTES"] = "QUOTES";
})(ContactType || (exports.ContactType = ContactType = {}));
var JobProfile;
(function (JobProfile) {
    JobProfile["Owner_Director"] = "Owner_Director";
    JobProfile["Pricing"] = "Pricing";
    JobProfile["Financial"] = "Financial";
    JobProfile["Manager"] = "Manager";
    JobProfile["Partnership_Dev"] = "Partnership_Dev";
    JobProfile["Business_Dev_Sales"] = "Business_Dev_Sales";
})(JobProfile || (exports.JobProfile = JobProfile = {}));
var location;
(function (location) {
    location["Chandigarh_India"] = "Chandigarh_India";
    location["Chennai_India"] = "Chennai_India";
    location["Dehradun_India"] = "Dehradun_India";
    location["Kochin_India"] = "Kochin_India";
    location["Mumbai_India"] = "Mumbai_India";
    location["Noida_India"] = "Noida_India";
})(location || (exports.location = location = {}));
var Timezone;
(function (Timezone) {
    Timezone["Asia_Calcutta"] = "Asia_Calcutta";
    Timezone["Asia_Bangkok"] = "Asia_Bangkok";
    Timezone["Asia_Colombo"] = "Asia_Colombo";
    Timezone["Asia_Dhaka"] = "Asia_Dhaka";
    Timezone["Asia_Dubai"] = "Asia_Dubai";
    Timezone["Asia_HongKong"] = "Asia_HongKong";
    Timezone["Asia_Ho_Chi_Minh"] = "Asia_Ho_Chi_Minh";
    Timezone["Asia_Hovd"] = "Asia_Hovd";
    Timezone["Asia_Almaty"] = "Asia_Almaty";
    Timezone["Asia_Amman"] = "Asia_Amman";
    Timezone["Asia_Baghdad"] = "Asia_Baghdad";
    Timezone["Asia_Bhaku"] = "Asia_Bhaku";
    Timezone["Asia_Beirut"] = "Asia_Beirut";
    Timezone["Asia_jakarta"] = "Asia_jakarta";
    Timezone["Asia_Jerusalem"] = "Asia_Jerusalem";
    Timezone["Asia_Kabul"] = "Asia_Kabul";
    Timezone["Asia_Karachi"] = "Asia_Karachi";
})(Timezone || (exports.Timezone = Timezone = {}));
class LoginUserInput {
}
exports.LoginUserInput = LoginUserInput;
class ResetPasswordInput {
}
exports.ResetPasswordInput = ResetPasswordInput;
class CreateUserInput {
}
exports.CreateUserInput = CreateUserInput;
class CreateUserAdditionalInfoInput {
}
exports.CreateUserAdditionalInfoInput = CreateUserAdditionalInfoInput;
class UpdateUserInput {
}
exports.UpdateUserInput = UpdateUserInput;
class InviteTeamMemberInput {
}
exports.InviteTeamMemberInput = InviteTeamMemberInput;
class CreateCompanyInput {
}
exports.CreateCompanyInput = CreateCompanyInput;
class CreateCompanyLocationInput {
}
exports.CreateCompanyLocationInput = CreateCompanyLocationInput;
class UpdateCompanyServicesInput {
}
exports.UpdateCompanyServicesInput = UpdateCompanyServicesInput;
class UserAdditionalInfo {
}
exports.UserAdditionalInfo = UserAdditionalInfo;
class ISubscription {
}
exports.ISubscription = ISubscription;
class Payment {
}
exports.Payment = Payment;
class Invoice {
}
exports.Invoice = Invoice;
class CompanyLocation {
}
exports.CompanyLocation = CompanyLocation;
class CompanyService {
}
exports.CompanyService = CompanyService;
class Certification {
}
exports.Certification = Certification;
class Company {
}
exports.Company = Company;
class User {
}
exports.User = User;
class Team {
}
exports.Team = Team;
class Invitation {
}
exports.Invitation = Invitation;
class UserInfo {
}
exports.UserInfo = UserInfo;
class LoginResponse {
}
exports.LoginResponse = LoginResponse;
class Plan {
}
exports.Plan = Plan;
class IQuery {
}
exports.IQuery = IQuery;
class IMutation {
}
exports.IMutation = IMutation;
//# sourceMappingURL=graphql.js.map