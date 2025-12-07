export interface PhonePrefix {
    value: string
    country: string
}

export const PHONE_PREFIXES: PhonePrefix[] = [
    // Central Europe (priority)
    { value: '+420', country: 'CZ' },
    { value: '+421', country: 'SK' },
    { value: '+49', country: 'DE' },
    { value: '+43', country: 'AT' },
    { value: '+48', country: 'PL' },
    { value: '+41', country: 'CH' },
    { value: '+36', country: 'HU' },
    { value: '+386', country: 'SI' },
    { value: '+423', country: 'LI' },

    // Western Europe
    { value: '+33', country: 'FR' },
    { value: '+44', country: 'GB' },
    { value: '+31', country: 'NL' },
    { value: '+32', country: 'BE' },
    { value: '+352', country: 'LU' },
    { value: '+353', country: 'IE' },
    { value: '+377', country: 'MC' },

    // Southern Europe
    { value: '+39', country: 'IT' },
    { value: '+34', country: 'ES' },
    { value: '+351', country: 'PT' },
    { value: '+30', country: 'GR' },
    { value: '+356', country: 'MT' },
    { value: '+357', country: 'CY' },
    { value: '+376', country: 'AD' },
    { value: '+378', country: 'SM' },
    { value: '+379', country: 'VA' },

    // Northern Europe
    { value: '+46', country: 'SE' },
    { value: '+47', country: 'NO' },
    { value: '+45', country: 'DK' },
    { value: '+358', country: 'FI' },
    { value: '+354', country: 'IS' },
    { value: '+372', country: 'EE' },
    { value: '+371', country: 'LV' },
    { value: '+370', country: 'LT' },

    // Eastern Europe
    { value: '+40', country: 'RO' },
    { value: '+359', country: 'BG' },
    { value: '+380', country: 'UA' },
    { value: '+375', country: 'BY' },
    { value: '+373', country: 'MD' },

    // Balkans
    { value: '+385', country: 'HR' },
    { value: '+381', country: 'RS' },
    { value: '+387', country: 'BA' },
    { value: '+382', country: 'ME' },
    { value: '+389', country: 'MK' },
    { value: '+383', country: 'XK' },
    { value: '+355', country: 'AL' },

    // Russia & CIS
    { value: '+7', country: 'RU' },
    { value: '+374', country: 'AM' },
    { value: '+994', country: 'AZ' },
    { value: '+995', country: 'GE' },
    { value: '+996', country: 'KG' },
    { value: '+992', country: 'TJ' },
    { value: '+993', country: 'TM' },
    { value: '+998', country: 'UZ' },

    // North America
    { value: '+1', country: 'US' },

    // Asia - East
    { value: '+81', country: 'JP' },
    { value: '+86', country: 'CN' },
    { value: '+82', country: 'KR' },
    { value: '+852', country: 'HK' },
    { value: '+853', country: 'MO' },
    { value: '+886', country: 'TW' },
    { value: '+976', country: 'MN' },

    // Asia - Southeast
    { value: '+65', country: 'SG' },
    { value: '+60', country: 'MY' },
    { value: '+66', country: 'TH' },
    { value: '+84', country: 'VN' },
    { value: '+62', country: 'ID' },
    { value: '+63', country: 'PH' },
    { value: '+855', country: 'KH' },
    { value: '+856', country: 'LA' },
    { value: '+95', country: 'MM' },
    { value: '+673', country: 'BN' },

    // Asia - South
    { value: '+91', country: 'IN' },
    { value: '+92', country: 'PK' },
    { value: '+880', country: 'BD' },
    { value: '+94', country: 'LK' },
    { value: '+977', country: 'NP' },
    { value: '+975', country: 'BT' },
    { value: '+960', country: 'MV' },

    // Middle East
    { value: '+90', country: 'TR' },
    { value: '+972', country: 'IL' },
    { value: '+971', country: 'AE' },
    { value: '+966', country: 'SA' },
    { value: '+974', country: 'QA' },
    { value: '+973', country: 'BH' },
    { value: '+965', country: 'KW' },
    { value: '+968', country: 'OM' },
    { value: '+962', country: 'JO' },
    { value: '+961', country: 'LB' },
    { value: '+963', country: 'SY' },
    { value: '+964', country: 'IQ' },
    { value: '+98', country: 'IR' },
    { value: '+967', country: 'YE' },

    // Oceania
    { value: '+61', country: 'AU' },
    { value: '+64', country: 'NZ' },
    { value: '+679', country: 'FJ' },
    { value: '+675', country: 'PG' },

    // South America
    { value: '+55', country: 'BR' },
    { value: '+54', country: 'AR' },
    { value: '+56', country: 'CL' },
    { value: '+57', country: 'CO' },
    { value: '+51', country: 'PE' },
    { value: '+58', country: 'VE' },
    { value: '+593', country: 'EC' },
    { value: '+591', country: 'BO' },
    { value: '+595', country: 'PY' },
    { value: '+598', country: 'UY' },

    // Central America & Caribbean
    { value: '+52', country: 'MX' },
    { value: '+506', country: 'CR' },
    { value: '+507', country: 'PA' },
    { value: '+502', country: 'GT' },
    { value: '+503', country: 'SV' },
    { value: '+504', country: 'HN' },
    { value: '+505', country: 'NI' },
    { value: '+501', country: 'BZ' },
    { value: '+53', country: 'CU' },
    { value: '+509', country: 'HT' },

    // Africa - North
    { value: '+20', country: 'EG' },
    { value: '+212', country: 'MA' },
    { value: '+213', country: 'DZ' },
    { value: '+216', country: 'TN' },
    { value: '+218', country: 'LY' },

    // Africa - Sub-Saharan
    { value: '+27', country: 'ZA' },
    { value: '+234', country: 'NG' },
    { value: '+254', country: 'KE' },
    { value: '+233', country: 'GH' },
    { value: '+255', country: 'TZ' },
    { value: '+256', country: 'UG' },
    { value: '+251', country: 'ET' },
    { value: '+225', country: 'CI' },
    { value: '+221', country: 'SN' },
    { value: '+237', country: 'CM' },
    { value: '+263', country: 'ZW' },
    { value: '+260', country: 'ZM' },
    { value: '+258', country: 'MZ' },
    { value: '+230', country: 'MU' },
]
