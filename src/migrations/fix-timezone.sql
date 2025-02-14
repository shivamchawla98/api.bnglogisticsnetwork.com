-- First, temporarily change the column to text type
ALTER TABLE "user" ALTER COLUMN timezone TYPE text;

-- Drop the existing enum
DROP TYPE IF EXISTS user_timezone_enum;

-- Create the new enum with correct values
CREATE TYPE user_timezone_enum AS ENUM (
    'Asia_Calcutta',
    'Asia_Bangkok',
    'Asia_Colombo',
    'Asia_Dhaka',
    'Asia_Dubai',
    'Asia_Hong_Kong',
    'Asia_Ho_Chi_Minh',
    'Asia_Almaty',
    'Asia_Amman',
    'Asia_Baghdad',
    'Asia_Beirut',
    'Asia_Jakarta',
    'Asia_Jerusalem',
    'Asia_Kabul',
    'Asia_Karachi',
    'Asia_Singapore',
    'Asia_Tokyo',
    'Asia_Shanghai',
    'Asia_Seoul',
    'Asia_Manila',
    'Asia_Kuala_Lumpur',
    'Asia_Riyadh',
    'Asia_Tehran',
    'Europe_London',
    'Europe_Paris',
    'Europe_Berlin',
    'Europe_Rome',
    'Europe_Madrid',
    'Europe_Moscow',
    'Europe_Istanbul',
    'UTC'
);

-- Update existing data
UPDATE "user"
SET timezone = CASE 
    WHEN timezone LIKE '%Calcutta%' THEN 'Asia_Calcutta'
    WHEN timezone LIKE '%Kolkata%' THEN 'Asia_Calcutta'
    ELSE 'UTC'
END;

-- Change the column back to enum type
ALTER TABLE "user" 
    ALTER COLUMN timezone TYPE user_timezone_enum 
    USING timezone::user_timezone_enum;
