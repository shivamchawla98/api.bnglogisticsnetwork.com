import { registerEnumType } from '@nestjs/graphql';

/**
 * Timezone enum with standard IANA timezone identifiers
 * Note: The enum values must match exactly with the database enum values
 */
export enum Timezone {
    // Asia
    Asia_Calcutta = "Asia_Calcutta",  // Keep this for backward compatibility
    Asia_Kolkata = "Asia_Kolkata",    // Add this for new registrations
    Asia_Bangkok = "Asia_Bangkok",
    Asia_Colombo = "Asia_Colombo",
    Asia_Dhaka = "Asia_Dhaka",
    Asia_Dubai = "Asia_Dubai",
    Asia_Hong_Kong = "Asia_Hong_Kong",
    Asia_Ho_Chi_Minh = "Asia_Ho_Chi_Minh",
    Asia_Almaty = "Asia_Almaty",
    Asia_Amman = "Asia_Amman",
    Asia_Baghdad = "Asia_Baghdad",
    Asia_Beirut = "Asia_Beirut",
    Asia_Jakarta = "Asia_Jakarta",
    Asia_Jerusalem = "Asia_Jerusalem",
    Asia_Kabul = "Asia_Kabul",
    Asia_Karachi = "Asia_Karachi",
    Asia_Singapore = "Asia_Singapore",
    Asia_Tokyo = "Asia_Tokyo",
    Asia_Shanghai = "Asia_Shanghai",
    Asia_Seoul = "Asia_Seoul",
    Asia_Manila = "Asia_Manila",
    Asia_Kuala_Lumpur = "Asia_Kuala_Lumpur",
    Asia_Riyadh = "Asia_Riyadh",
    Asia_Tehran = "Asia_Tehran",

    // Europe
    Europe_London = "Europe_London",
    Europe_Paris = "Europe_Paris",
    Europe_Berlin = "Europe_Berlin",
    Europe_Rome = "Europe_Rome",
    Europe_Madrid = "Europe_Madrid",
    Europe_Moscow = "Europe_Moscow",
    Europe_Istanbul = "Europe_Istanbul",
    Europe_Amsterdam = "Europe_Amsterdam",
    Europe_Brussels = "Europe_Brussels",
    Europe_Stockholm = "Europe_Stockholm",
    Europe_Vienna = "Europe_Vienna",
    Europe_Warsaw = "Europe_Warsaw",

    // Americas
    America_New_York = "America_New_York",
    America_Chicago = "America_Chicago",
    America_Los_Angeles = "America_Los_Angeles",
    America_Toronto = "America_Toronto",
    America_Mexico_City = "America_Mexico_City",
    America_Sao_Paulo = "America_Sao_Paulo",
    America_Buenos_Aires = "America_Buenos_Aires",
    America_Vancouver = "America_Vancouver",
    America_Denver = "America_Denver",
    America_Phoenix = "America_Phoenix",

    // Pacific
    Pacific_Auckland = "Pacific_Auckland",
    Pacific_Sydney = "Pacific_Sydney",
    Australia_Melbourne = "Australia_Melbourne",
    Australia_Perth = "Australia_Perth",

    // Africa
    Africa_Cairo = "Africa_Cairo",
    Africa_Lagos = "Africa_Lagos",
    Africa_Johannesburg = "Africa_Johannesburg",
    Africa_Nairobi = "Africa_Nairobi",
    Africa_Casablanca = "Africa_Casablanca",

    // UTC
    UTC = "UTC"
}

registerEnumType(Timezone, {
    name: 'Timezone',
    description: 'Standard IANA timezone identifiers with underscores instead of slashes'
});
