export interface Country {
    code: string
    name: string
}

export const COUNTRIES: Country[] = [
    // Central Europe (priority)
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'DE', name: 'Germany' },
    { code: 'AT', name: 'Austria' },
    { code: 'PL', name: 'Poland' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'HU', name: 'Hungary' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'LI', name: 'Liechtenstein' },

    // Western Europe
    { code: 'FR', name: 'France' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'BE', name: 'Belgium' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'IE', name: 'Ireland' },
    { code: 'MC', name: 'Monaco' },

    // Southern Europe
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'PT', name: 'Portugal' },
    { code: 'GR', name: 'Greece' },
    { code: 'MT', name: 'Malta' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'AD', name: 'Andorra' },
    { code: 'SM', name: 'San Marino' },
    { code: 'VA', name: 'Vatican City' },

    // Northern Europe
    { code: 'SE', name: 'Sweden' },
    { code: 'NO', name: 'Norway' },
    { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' },
    { code: 'IS', name: 'Iceland' },
    { code: 'EE', name: 'Estonia' },
    { code: 'LV', name: 'Latvia' },
    { code: 'LT', name: 'Lithuania' },

    // Eastern Europe
    { code: 'RO', name: 'Romania' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'BY', name: 'Belarus' },
    { code: 'MD', name: 'Moldova' },

    // Balkans
    { code: 'HR', name: 'Croatia' },
    { code: 'RS', name: 'Serbia' },
    { code: 'BA', name: 'Bosnia and Herzegovina' },
    { code: 'ME', name: 'Montenegro' },
    { code: 'MK', name: 'North Macedonia' },
    { code: 'XK', name: 'Kosovo' },
    { code: 'AL', name: 'Albania' },

    // Russia & CIS
    { code: 'RU', name: 'Russia' },
    { code: 'AM', name: 'Armenia' },
    { code: 'AZ', name: 'Azerbaijan' },
    { code: 'GE', name: 'Georgia' },
    { code: 'KG', name: 'Kyrgyzstan' },
    { code: 'TJ', name: 'Tajikistan' },
    { code: 'TM', name: 'Turkmenistan' },
    { code: 'UZ', name: 'Uzbekistan' },
    { code: 'KZ', name: 'Kazakhstan' },

    // North America
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },

    // Asia - East
    { code: 'JP', name: 'Japan' },
    { code: 'CN', name: 'China' },
    { code: 'KR', name: 'South Korea' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'MO', name: 'Macau' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'MN', name: 'Mongolia' },

    // Asia - Southeast
    { code: 'SG', name: 'Singapore' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'TH', name: 'Thailand' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'PH', name: 'Philippines' },
    { code: 'KH', name: 'Cambodia' },
    { code: 'LA', name: 'Laos' },
    { code: 'MM', name: 'Myanmar' },
    { code: 'BN', name: 'Brunei' },
    { code: 'TL', name: 'Timor-Leste' },

    // Asia - South
    { code: 'IN', name: 'India' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'BD', name: 'Bangladesh' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'NP', name: 'Nepal' },
    { code: 'BT', name: 'Bhutan' },
    { code: 'MV', name: 'Maldives' },
    { code: 'AF', name: 'Afghanistan' },

    // Middle East
    { code: 'TR', name: 'Turkey' },
    { code: 'IL', name: 'Israel' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'QA', name: 'Qatar' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'OM', name: 'Oman' },
    { code: 'JO', name: 'Jordan' },
    { code: 'LB', name: 'Lebanon' },
    { code: 'SY', name: 'Syria' },
    { code: 'IQ', name: 'Iraq' },
    { code: 'IR', name: 'Iran' },
    { code: 'YE', name: 'Yemen' },
    { code: 'PS', name: 'Palestine' },

    // Oceania
    { code: 'AU', name: 'Australia' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'FJ', name: 'Fiji' },
    { code: 'PG', name: 'Papua New Guinea' },
    { code: 'NC', name: 'New Caledonia' },
    { code: 'PF', name: 'French Polynesia' },
    { code: 'SB', name: 'Solomon Islands' },
    { code: 'VU', name: 'Vanuatu' },
    { code: 'WS', name: 'Samoa' },
    { code: 'TO', name: 'Tonga' },

    // South America
    { code: 'BR', name: 'Brazil' },
    { code: 'AR', name: 'Argentina' },
    { code: 'CL', name: 'Chile' },
    { code: 'CO', name: 'Colombia' },
    { code: 'PE', name: 'Peru' },
    { code: 'VE', name: 'Venezuela' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'BO', name: 'Bolivia' },
    { code: 'PY', name: 'Paraguay' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'GY', name: 'Guyana' },
    { code: 'SR', name: 'Suriname' },
    { code: 'GF', name: 'French Guiana' },

    // Central America & Caribbean
    { code: 'MX', name: 'Mexico' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'PA', name: 'Panama' },
    { code: 'GT', name: 'Guatemala' },
    { code: 'SV', name: 'El Salvador' },
    { code: 'HN', name: 'Honduras' },
    { code: 'NI', name: 'Nicaragua' },
    { code: 'BZ', name: 'Belize' },
    { code: 'CU', name: 'Cuba' },
    { code: 'HT', name: 'Haiti' },
    { code: 'DO', name: 'Dominican Republic' },
    { code: 'JM', name: 'Jamaica' },
    { code: 'TT', name: 'Trinidad and Tobago' },
    { code: 'BS', name: 'Bahamas' },
    { code: 'BB', name: 'Barbados' },

    // Africa - North
    { code: 'EG', name: 'Egypt' },
    { code: 'MA', name: 'Morocco' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'LY', name: 'Libya' },
    { code: 'SD', name: 'Sudan' },

    // Africa - Sub-Saharan
    { code: 'ZA', name: 'South Africa' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'KE', name: 'Kenya' },
    { code: 'GH', name: 'Ghana' },
    { code: 'TZ', name: 'Tanzania' },
    { code: 'UG', name: 'Uganda' },
    { code: 'ET', name: 'Ethiopia' },
    { code: 'CI', name: 'Ivory Coast' },
    { code: 'SN', name: 'Senegal' },
    { code: 'CM', name: 'Cameroon' },
    { code: 'ZW', name: 'Zimbabwe' },
    { code: 'ZM', name: 'Zambia' },
    { code: 'MZ', name: 'Mozambique' },
    { code: 'MU', name: 'Mauritius' },
    { code: 'BW', name: 'Botswana' },
    { code: 'NA', name: 'Namibia' },
    { code: 'AO', name: 'Angola' },
    { code: 'RW', name: 'Rwanda' },
]
