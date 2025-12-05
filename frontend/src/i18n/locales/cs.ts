export default {
    common: {
        selectOption: 'Vyberte možnost'
    },
    header: {
        title: 'TechStore',
        cart: 'Přejít do košíku',
        switchLanguage: 'Přepnout na {language}'
    },
    products: {
        title: 'Naše Produkty',
        loading: 'Načítání produktů...',
        addToCart: 'Přidat do Košíku',
        removeFromCart: 'Odebrat z Košíku',
        addToCartAria: 'Klikněte pro přidání {product} do košíku',
        removeFromCartAria: 'Klikněte pro odebrání {product} z košíku',
        addedToCart: 'Přidáno do košíku:',
        removedFromCart: 'Odebráno z košíku:',
    },
    productDetail: {
        backToProducts: 'Zpět na Produkty',
        notFound: 'Produkt nenalezen',
        description: 'Popis',
        specifications: 'Technické Specifikace',
    },
    cart: {
        title: 'Nákupní Košík',
        empty: 'Váš košík je prázdný',
        continueShopping: 'Pokračovat v Nákupu',
        subtotal: 'Mezisoučet',
        clearCart: 'Vysypat Košík',
        continue: 'Pokračovat',
        checkout: 'Pokračovat k Pokladně',
        checkoutAlert: 'Funkce pokladny bude brzy dostupná!',
        removeItem: 'Odebrat položku',
        increaseQuantity: 'Zvýšit množství na',
        decreaseQuantity: 'Snížit množství na',
        clearedCart: 'Košík byl vysypán',
        steps: {
            cart: 'Košík',
            deliveryInformation: 'Dodací údaje a Platba',
            summary: 'Souhrn Objednávky a Odeslání',
            confirmation: 'Potvrzení'
        }
    },
    filters: {
        category: 'Kategorie',
        sortBy: 'Seřadit',
        search: 'Hledat',
        searchPlaceholder: 'Hledat produkty...',
        minPrice: 'Min. Cena (€)',
        maxPrice: 'Max. Cena (€)',
        minPricePlaceholder: '0,00',
        maxPricePlaceholder: '999,99',
        resetFilters: 'Zrušit Filtry',
        resetFiltersLabel: 'klikněte pro resetování všech filtrů',
        openFilters: 'Filtry',
        applyFilters: 'Použít Filtry',
        categories: {
            all: 'Všechny Kategorie',
            audio: 'Audio',
            keyboardsAndMice: 'Klávesnice a Myši',
            monitors: 'Monitory a Displeje',
            accessories: 'Příslušenství',
            storage: 'Úložiště',
            cables: 'Kabely a Adaptéry'
        },
        sort: {
            default: 'Výchozí',
            priceAsc: 'Cena: Od Nejnižší',
            priceDesc: 'Cena: Od Nejvyšší',
            nameAsc: 'Název: A až Z',
            nameDesc: 'Název: Z až A'
        }
    },
    pagination: {
        previous: 'Předchozí',
        next: 'Další',
        page: 'Stránka {current} z {total}'
    },
    validation: {
        invalidEmail: 'Zadejte prosím platnou e-mailovou adresu',
        invalidPhone: 'Telefonní číslo může obsahovat pouze číslice a znak +'
    },
    deliveryInfo: {
        title: 'Dodací údaje',
        emptyCart: 'Váš košík je prázdný. Přidejte položky pro pokračování k pokladně.',
        customerInfo: 'Informace o Zákazníkovi',
        addressInfo: 'Dodací Adresa',
        name: 'Celé Jméno',
        namePlaceholder: 'Jan Novák',
        email: 'Email',
        emailPlaceholder: "jan.novak{'@'}example.com",
        phone: 'Telefonní Číslo',
        phonePlaceholder: '+420 123 456 789',
        address: 'Ulice a Číslo Popisné',
        addressPlaceholder: 'Hlavní 123',
        city: 'Město',
        cityPlaceholder: 'Praha',
        postalCode: 'PSČ',
        postalCodePlaceholder: '110 00',
        country: 'Země',
        countryPlaceholder: 'Česká Republika',
        notes: 'Poznámky k Objednávce (Volitelné)',
        notesTitle: 'Další Poznámky',
        notesPlaceholder: 'Jakékoli speciální instrukce nebo komentáře...',
        orderSummary: 'Souhrn Objednávky',
        subtotal: 'Mezisoučet',
        deliveryCost: 'Doprava',
        free: 'Zdarma',
        total: 'Celkem',
        itemsCount: '{count} položka | {count} položky | {count} položek',
        back: 'Zpět',
        placeOrder: 'Závazně Objednat',
        processing: 'Zpracování...',
        success: 'Objednávka byla úspěšně vytvořena! Číslo objednávky: #{orderId}',
        error: 'Nepodařilo se vytvořit objednávku. Zkuste to prosím znovu.',
        orderError: 'Odeslání Objednávky Selhalo',
        deliveryMethod: 'Způsob Doručení',
        delivery: 'Doručení - 10€',
        deliveryDescription: 'Nechte si objednávku doručit na vaši adresu',
        pickup: 'Osobní Odběr - zdarma',
        pickupDescription: 'Vyzvedněte si objednávku v naší prodejně',
        paymentMethod: 'Způsob Platby',
        cash: 'Hotovost',
        cashDescription: 'Plaťte hotově při doručení nebo odběru',
        bankTransfer: 'Bankovní Převod',
        bankTransferDescription: 'Zaplaťte bankovním převodem před doručením'
    },
    confirmation: {
        title: 'Objednávka Odeslána!',
        thankYou: 'Děkujeme za Vaši objednávku',
        orderNumber: 'Číslo Objednávky',
        demoNotice: 'Toto je demo e-shop',
        demoMessage: 'Upozorňujeme, že se jedná o demonstrační projekt. Žádné skutečné položky nebudou odeslány a není vyžadována žádná platba. Vaše objednávka byla zaznamenána v naší demo databázi pouze pro testovací účely.',
        backToShopping: 'Zpět na Produkty'
    }
}
