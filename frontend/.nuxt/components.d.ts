
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AtomsButton': typeof import("../components/atoms/Button.vue")['default']
    'AtomsCartBadge': typeof import("../components/atoms/CartBadge.vue")['default']
    'AtomsCheckIcon': typeof import("../components/atoms/CheckIcon.vue")['default']
    'AtomsCountryAutocomplete': typeof import("../components/atoms/CountryAutocomplete.vue")['default']
    'AtomsEmailIcon': typeof import("../components/atoms/EmailIcon.vue")['default']
    'AtomsErrorIcon': typeof import("../components/atoms/ErrorIcon.vue")['default']
    'AtomsFilterTag': typeof import("../components/atoms/FilterTag.vue")['default']
    'AtomsFlagAutocomplete': typeof import("../components/atoms/FlagAutocomplete.vue")['default']
    'AtomsInput': typeof import("../components/atoms/Input.vue")['default']
    'AtomsOrderReviewField': typeof import("../components/atoms/OrderReviewField.vue")['default']
    'AtomsPhonePrefixAutocomplete': typeof import("../components/atoms/PhonePrefixAutocomplete.vue")['default']
    'AtomsProfileField': typeof import("../components/atoms/ProfileField.vue")['default']
    'AtomsRadio': typeof import("../components/atoms/Radio.vue")['default']
    'AtomsScrollToTop': typeof import("../components/atoms/ScrollToTop.vue")['default']
    'AtomsSelect': typeof import("../components/atoms/Select.vue")['default']
    'AtomsSpinner': typeof import("../components/atoms/Spinner.vue")['default']
    'AtomsWarningIcon': typeof import("../components/atoms/WarningIcon.vue")['default']
    'AtomsIconsArrowUp': typeof import("../components/atoms/icons/ArrowUp.vue")['default']
    'AtomsIconsCart': typeof import("../components/atoms/icons/Cart.vue")['default']
    'AtomsIconsClose': typeof import("../components/atoms/icons/Close.vue")['default']
    'AtomsIconsLogOut': typeof import("../components/atoms/icons/LogOut.vue")['default']
    'AtomsIconsTrash': typeof import("../components/atoms/icons/Trash.vue")['default']
    'AtomsIconsUser': typeof import("../components/atoms/icons/User.vue")['default']
    'AtomsIconsUserPlus': typeof import("../components/atoms/icons/UserPlus.vue")['default']
    'CartForm': typeof import("../components/cart/CartForm.vue")['default']
    'CartForm1': typeof import("../components/cart/CartForm1.vue")['default']
    'CartForm2': typeof import("../components/cart/CartForm2.vue")['default']
    'CartForm3': typeof import("../components/cart/CartForm3.vue")['default']
    'CartForm4': typeof import("../components/cart/CartForm4.vue")['default']
    'CartItem': typeof import("../components/cart/CartItem.vue")['default']
    'CartSummary': typeof import("../components/cart/CartSummary.vue")['default']
    'CartCustomerData': typeof import("../components/cart/CustomerData.vue")['default']
    'CartDeliveryAddress': typeof import("../components/cart/DeliveryAddress.vue")['default']
    'CartDeliveryOptions': typeof import("../components/cart/DeliveryOptions.vue")['default']
    'CartOrderNotes': typeof import("../components/cart/OrderNotes.vue")['default']
    'CartOrderSummary': typeof import("../components/cart/OrderSummary.vue")['default']
    'CartPaymentOptions': typeof import("../components/cart/PaymentOptions.vue")['default']
    'CartSteps': typeof import("../components/cart/Steps.vue")['default']
    'MoleculesAlert': typeof import("../components/molecules/Alert.vue")['default']
    'MoleculesContainer': typeof import("../components/molecules/Container.vue")['default']
    'MoleculesDropdownButton': typeof import("../components/molecules/DropdownButton.vue")['default']
    'MoleculesFlagOption': typeof import("../components/molecules/FlagOption.vue")['default']
    'MoleculesFormField': typeof import("../components/molecules/FormField.vue")['default']
    'MoleculesOrderReviewSection': typeof import("../components/molecules/OrderReviewSection.vue")['default']
    'MoleculesPagination': typeof import("../components/molecules/Pagination.vue")['default']
    'MoleculesProductItem': typeof import("../components/molecules/ProductItem.vue")['default']
    'MoleculesProductItemDesktop': typeof import("../components/molecules/ProductItemDesktop.vue")['default']
    'MoleculesProductItemMobile': typeof import("../components/molecules/ProductItemMobile.vue")['default']
    'MoleculesProfileSection': typeof import("../components/molecules/ProfileSection.vue")['default']
    'MoleculesSearchInput': typeof import("../components/molecules/SearchInput.vue")['default']
    'MoleculesSuccessHeader': typeof import("../components/molecules/SuccessHeader.vue")['default']
    'OrganismsAuthForm': typeof import("../components/organisms/AuthForm.vue")['default']
    'OrganismsFilterDrawer': typeof import("../components/organisms/FilterDrawer.vue")['default']
    'OrganismsFooter': typeof import("../components/organisms/Footer.vue")['default']
    'OrganismsHeader': typeof import("../components/organisms/Header.vue")['default']
    'OrganismsProductFilters': typeof import("../components/organisms/ProductFilters.vue")['default']
    'RegisterForm': typeof import("../components/register/RegisterForm.vue")['default']
    'RegisterForm1': typeof import("../components/register/RegisterForm1.vue")['default']
    'RegisterForm2': typeof import("../components/register/RegisterForm2.vue")['default']
    'RegisterForm3': typeof import("../components/register/RegisterForm3.vue")['default']
    'VerifyResendVerificationForm': typeof import("../components/verify/ResendVerificationForm.vue")['default']
    'VerifyError': typeof import("../components/verify/VerifyError.vue")['default']
    'VerifyLoading': typeof import("../components/verify/VerifyLoading.vue")['default']
    'VerifySuccess': typeof import("../components/verify/VerifySuccess.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyAtomsButton': LazyComponent<typeof import("../components/atoms/Button.vue")['default']>
    'LazyAtomsCartBadge': LazyComponent<typeof import("../components/atoms/CartBadge.vue")['default']>
    'LazyAtomsCheckIcon': LazyComponent<typeof import("../components/atoms/CheckIcon.vue")['default']>
    'LazyAtomsCountryAutocomplete': LazyComponent<typeof import("../components/atoms/CountryAutocomplete.vue")['default']>
    'LazyAtomsEmailIcon': LazyComponent<typeof import("../components/atoms/EmailIcon.vue")['default']>
    'LazyAtomsErrorIcon': LazyComponent<typeof import("../components/atoms/ErrorIcon.vue")['default']>
    'LazyAtomsFilterTag': LazyComponent<typeof import("../components/atoms/FilterTag.vue")['default']>
    'LazyAtomsFlagAutocomplete': LazyComponent<typeof import("../components/atoms/FlagAutocomplete.vue")['default']>
    'LazyAtomsInput': LazyComponent<typeof import("../components/atoms/Input.vue")['default']>
    'LazyAtomsOrderReviewField': LazyComponent<typeof import("../components/atoms/OrderReviewField.vue")['default']>
    'LazyAtomsPhonePrefixAutocomplete': LazyComponent<typeof import("../components/atoms/PhonePrefixAutocomplete.vue")['default']>
    'LazyAtomsProfileField': LazyComponent<typeof import("../components/atoms/ProfileField.vue")['default']>
    'LazyAtomsRadio': LazyComponent<typeof import("../components/atoms/Radio.vue")['default']>
    'LazyAtomsScrollToTop': LazyComponent<typeof import("../components/atoms/ScrollToTop.vue")['default']>
    'LazyAtomsSelect': LazyComponent<typeof import("../components/atoms/Select.vue")['default']>
    'LazyAtomsSpinner': LazyComponent<typeof import("../components/atoms/Spinner.vue")['default']>
    'LazyAtomsWarningIcon': LazyComponent<typeof import("../components/atoms/WarningIcon.vue")['default']>
    'LazyAtomsIconsArrowUp': LazyComponent<typeof import("../components/atoms/icons/ArrowUp.vue")['default']>
    'LazyAtomsIconsCart': LazyComponent<typeof import("../components/atoms/icons/Cart.vue")['default']>
    'LazyAtomsIconsClose': LazyComponent<typeof import("../components/atoms/icons/Close.vue")['default']>
    'LazyAtomsIconsLogOut': LazyComponent<typeof import("../components/atoms/icons/LogOut.vue")['default']>
    'LazyAtomsIconsTrash': LazyComponent<typeof import("../components/atoms/icons/Trash.vue")['default']>
    'LazyAtomsIconsUser': LazyComponent<typeof import("../components/atoms/icons/User.vue")['default']>
    'LazyAtomsIconsUserPlus': LazyComponent<typeof import("../components/atoms/icons/UserPlus.vue")['default']>
    'LazyCartForm': LazyComponent<typeof import("../components/cart/CartForm.vue")['default']>
    'LazyCartForm1': LazyComponent<typeof import("../components/cart/CartForm1.vue")['default']>
    'LazyCartForm2': LazyComponent<typeof import("../components/cart/CartForm2.vue")['default']>
    'LazyCartForm3': LazyComponent<typeof import("../components/cart/CartForm3.vue")['default']>
    'LazyCartForm4': LazyComponent<typeof import("../components/cart/CartForm4.vue")['default']>
    'LazyCartItem': LazyComponent<typeof import("../components/cart/CartItem.vue")['default']>
    'LazyCartSummary': LazyComponent<typeof import("../components/cart/CartSummary.vue")['default']>
    'LazyCartCustomerData': LazyComponent<typeof import("../components/cart/CustomerData.vue")['default']>
    'LazyCartDeliveryAddress': LazyComponent<typeof import("../components/cart/DeliveryAddress.vue")['default']>
    'LazyCartDeliveryOptions': LazyComponent<typeof import("../components/cart/DeliveryOptions.vue")['default']>
    'LazyCartOrderNotes': LazyComponent<typeof import("../components/cart/OrderNotes.vue")['default']>
    'LazyCartOrderSummary': LazyComponent<typeof import("../components/cart/OrderSummary.vue")['default']>
    'LazyCartPaymentOptions': LazyComponent<typeof import("../components/cart/PaymentOptions.vue")['default']>
    'LazyCartSteps': LazyComponent<typeof import("../components/cart/Steps.vue")['default']>
    'LazyMoleculesAlert': LazyComponent<typeof import("../components/molecules/Alert.vue")['default']>
    'LazyMoleculesContainer': LazyComponent<typeof import("../components/molecules/Container.vue")['default']>
    'LazyMoleculesDropdownButton': LazyComponent<typeof import("../components/molecules/DropdownButton.vue")['default']>
    'LazyMoleculesFlagOption': LazyComponent<typeof import("../components/molecules/FlagOption.vue")['default']>
    'LazyMoleculesFormField': LazyComponent<typeof import("../components/molecules/FormField.vue")['default']>
    'LazyMoleculesOrderReviewSection': LazyComponent<typeof import("../components/molecules/OrderReviewSection.vue")['default']>
    'LazyMoleculesPagination': LazyComponent<typeof import("../components/molecules/Pagination.vue")['default']>
    'LazyMoleculesProductItem': LazyComponent<typeof import("../components/molecules/ProductItem.vue")['default']>
    'LazyMoleculesProductItemDesktop': LazyComponent<typeof import("../components/molecules/ProductItemDesktop.vue")['default']>
    'LazyMoleculesProductItemMobile': LazyComponent<typeof import("../components/molecules/ProductItemMobile.vue")['default']>
    'LazyMoleculesProfileSection': LazyComponent<typeof import("../components/molecules/ProfileSection.vue")['default']>
    'LazyMoleculesSearchInput': LazyComponent<typeof import("../components/molecules/SearchInput.vue")['default']>
    'LazyMoleculesSuccessHeader': LazyComponent<typeof import("../components/molecules/SuccessHeader.vue")['default']>
    'LazyOrganismsAuthForm': LazyComponent<typeof import("../components/organisms/AuthForm.vue")['default']>
    'LazyOrganismsFilterDrawer': LazyComponent<typeof import("../components/organisms/FilterDrawer.vue")['default']>
    'LazyOrganismsFooter': LazyComponent<typeof import("../components/organisms/Footer.vue")['default']>
    'LazyOrganismsHeader': LazyComponent<typeof import("../components/organisms/Header.vue")['default']>
    'LazyOrganismsProductFilters': LazyComponent<typeof import("../components/organisms/ProductFilters.vue")['default']>
    'LazyRegisterForm': LazyComponent<typeof import("../components/register/RegisterForm.vue")['default']>
    'LazyRegisterForm1': LazyComponent<typeof import("../components/register/RegisterForm1.vue")['default']>
    'LazyRegisterForm2': LazyComponent<typeof import("../components/register/RegisterForm2.vue")['default']>
    'LazyRegisterForm3': LazyComponent<typeof import("../components/register/RegisterForm3.vue")['default']>
    'LazyVerifyResendVerificationForm': LazyComponent<typeof import("../components/verify/ResendVerificationForm.vue")['default']>
    'LazyVerifyError': LazyComponent<typeof import("../components/verify/VerifyError.vue")['default']>
    'LazyVerifyLoading': LazyComponent<typeof import("../components/verify/VerifyLoading.vue")['default']>
    'LazyVerifySuccess': LazyComponent<typeof import("../components/verify/VerifySuccess.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AtomsButton: typeof import("../components/atoms/Button.vue")['default']
export const AtomsCartBadge: typeof import("../components/atoms/CartBadge.vue")['default']
export const AtomsCheckIcon: typeof import("../components/atoms/CheckIcon.vue")['default']
export const AtomsCountryAutocomplete: typeof import("../components/atoms/CountryAutocomplete.vue")['default']
export const AtomsEmailIcon: typeof import("../components/atoms/EmailIcon.vue")['default']
export const AtomsErrorIcon: typeof import("../components/atoms/ErrorIcon.vue")['default']
export const AtomsFilterTag: typeof import("../components/atoms/FilterTag.vue")['default']
export const AtomsFlagAutocomplete: typeof import("../components/atoms/FlagAutocomplete.vue")['default']
export const AtomsInput: typeof import("../components/atoms/Input.vue")['default']
export const AtomsOrderReviewField: typeof import("../components/atoms/OrderReviewField.vue")['default']
export const AtomsPhonePrefixAutocomplete: typeof import("../components/atoms/PhonePrefixAutocomplete.vue")['default']
export const AtomsProfileField: typeof import("../components/atoms/ProfileField.vue")['default']
export const AtomsRadio: typeof import("../components/atoms/Radio.vue")['default']
export const AtomsScrollToTop: typeof import("../components/atoms/ScrollToTop.vue")['default']
export const AtomsSelect: typeof import("../components/atoms/Select.vue")['default']
export const AtomsSpinner: typeof import("../components/atoms/Spinner.vue")['default']
export const AtomsWarningIcon: typeof import("../components/atoms/WarningIcon.vue")['default']
export const AtomsIconsArrowUp: typeof import("../components/atoms/icons/ArrowUp.vue")['default']
export const AtomsIconsCart: typeof import("../components/atoms/icons/Cart.vue")['default']
export const AtomsIconsClose: typeof import("../components/atoms/icons/Close.vue")['default']
export const AtomsIconsLogOut: typeof import("../components/atoms/icons/LogOut.vue")['default']
export const AtomsIconsTrash: typeof import("../components/atoms/icons/Trash.vue")['default']
export const AtomsIconsUser: typeof import("../components/atoms/icons/User.vue")['default']
export const AtomsIconsUserPlus: typeof import("../components/atoms/icons/UserPlus.vue")['default']
export const CartForm: typeof import("../components/cart/CartForm.vue")['default']
export const CartForm1: typeof import("../components/cart/CartForm1.vue")['default']
export const CartForm2: typeof import("../components/cart/CartForm2.vue")['default']
export const CartForm3: typeof import("../components/cart/CartForm3.vue")['default']
export const CartForm4: typeof import("../components/cart/CartForm4.vue")['default']
export const CartItem: typeof import("../components/cart/CartItem.vue")['default']
export const CartSummary: typeof import("../components/cart/CartSummary.vue")['default']
export const CartCustomerData: typeof import("../components/cart/CustomerData.vue")['default']
export const CartDeliveryAddress: typeof import("../components/cart/DeliveryAddress.vue")['default']
export const CartDeliveryOptions: typeof import("../components/cart/DeliveryOptions.vue")['default']
export const CartOrderNotes: typeof import("../components/cart/OrderNotes.vue")['default']
export const CartOrderSummary: typeof import("../components/cart/OrderSummary.vue")['default']
export const CartPaymentOptions: typeof import("../components/cart/PaymentOptions.vue")['default']
export const CartSteps: typeof import("../components/cart/Steps.vue")['default']
export const MoleculesAlert: typeof import("../components/molecules/Alert.vue")['default']
export const MoleculesContainer: typeof import("../components/molecules/Container.vue")['default']
export const MoleculesDropdownButton: typeof import("../components/molecules/DropdownButton.vue")['default']
export const MoleculesFlagOption: typeof import("../components/molecules/FlagOption.vue")['default']
export const MoleculesFormField: typeof import("../components/molecules/FormField.vue")['default']
export const MoleculesOrderReviewSection: typeof import("../components/molecules/OrderReviewSection.vue")['default']
export const MoleculesPagination: typeof import("../components/molecules/Pagination.vue")['default']
export const MoleculesProductItem: typeof import("../components/molecules/ProductItem.vue")['default']
export const MoleculesProductItemDesktop: typeof import("../components/molecules/ProductItemDesktop.vue")['default']
export const MoleculesProductItemMobile: typeof import("../components/molecules/ProductItemMobile.vue")['default']
export const MoleculesProfileSection: typeof import("../components/molecules/ProfileSection.vue")['default']
export const MoleculesSearchInput: typeof import("../components/molecules/SearchInput.vue")['default']
export const MoleculesSuccessHeader: typeof import("../components/molecules/SuccessHeader.vue")['default']
export const OrganismsAuthForm: typeof import("../components/organisms/AuthForm.vue")['default']
export const OrganismsFilterDrawer: typeof import("../components/organisms/FilterDrawer.vue")['default']
export const OrganismsFooter: typeof import("../components/organisms/Footer.vue")['default']
export const OrganismsHeader: typeof import("../components/organisms/Header.vue")['default']
export const OrganismsProductFilters: typeof import("../components/organisms/ProductFilters.vue")['default']
export const RegisterForm: typeof import("../components/register/RegisterForm.vue")['default']
export const RegisterForm1: typeof import("../components/register/RegisterForm1.vue")['default']
export const RegisterForm2: typeof import("../components/register/RegisterForm2.vue")['default']
export const RegisterForm3: typeof import("../components/register/RegisterForm3.vue")['default']
export const VerifyResendVerificationForm: typeof import("../components/verify/ResendVerificationForm.vue")['default']
export const VerifyError: typeof import("../components/verify/VerifyError.vue")['default']
export const VerifyLoading: typeof import("../components/verify/VerifyLoading.vue")['default']
export const VerifySuccess: typeof import("../components/verify/VerifySuccess.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyAtomsButton: LazyComponent<typeof import("../components/atoms/Button.vue")['default']>
export const LazyAtomsCartBadge: LazyComponent<typeof import("../components/atoms/CartBadge.vue")['default']>
export const LazyAtomsCheckIcon: LazyComponent<typeof import("../components/atoms/CheckIcon.vue")['default']>
export const LazyAtomsCountryAutocomplete: LazyComponent<typeof import("../components/atoms/CountryAutocomplete.vue")['default']>
export const LazyAtomsEmailIcon: LazyComponent<typeof import("../components/atoms/EmailIcon.vue")['default']>
export const LazyAtomsErrorIcon: LazyComponent<typeof import("../components/atoms/ErrorIcon.vue")['default']>
export const LazyAtomsFilterTag: LazyComponent<typeof import("../components/atoms/FilterTag.vue")['default']>
export const LazyAtomsFlagAutocomplete: LazyComponent<typeof import("../components/atoms/FlagAutocomplete.vue")['default']>
export const LazyAtomsInput: LazyComponent<typeof import("../components/atoms/Input.vue")['default']>
export const LazyAtomsOrderReviewField: LazyComponent<typeof import("../components/atoms/OrderReviewField.vue")['default']>
export const LazyAtomsPhonePrefixAutocomplete: LazyComponent<typeof import("../components/atoms/PhonePrefixAutocomplete.vue")['default']>
export const LazyAtomsProfileField: LazyComponent<typeof import("../components/atoms/ProfileField.vue")['default']>
export const LazyAtomsRadio: LazyComponent<typeof import("../components/atoms/Radio.vue")['default']>
export const LazyAtomsScrollToTop: LazyComponent<typeof import("../components/atoms/ScrollToTop.vue")['default']>
export const LazyAtomsSelect: LazyComponent<typeof import("../components/atoms/Select.vue")['default']>
export const LazyAtomsSpinner: LazyComponent<typeof import("../components/atoms/Spinner.vue")['default']>
export const LazyAtomsWarningIcon: LazyComponent<typeof import("../components/atoms/WarningIcon.vue")['default']>
export const LazyAtomsIconsArrowUp: LazyComponent<typeof import("../components/atoms/icons/ArrowUp.vue")['default']>
export const LazyAtomsIconsCart: LazyComponent<typeof import("../components/atoms/icons/Cart.vue")['default']>
export const LazyAtomsIconsClose: LazyComponent<typeof import("../components/atoms/icons/Close.vue")['default']>
export const LazyAtomsIconsLogOut: LazyComponent<typeof import("../components/atoms/icons/LogOut.vue")['default']>
export const LazyAtomsIconsTrash: LazyComponent<typeof import("../components/atoms/icons/Trash.vue")['default']>
export const LazyAtomsIconsUser: LazyComponent<typeof import("../components/atoms/icons/User.vue")['default']>
export const LazyAtomsIconsUserPlus: LazyComponent<typeof import("../components/atoms/icons/UserPlus.vue")['default']>
export const LazyCartForm: LazyComponent<typeof import("../components/cart/CartForm.vue")['default']>
export const LazyCartForm1: LazyComponent<typeof import("../components/cart/CartForm1.vue")['default']>
export const LazyCartForm2: LazyComponent<typeof import("../components/cart/CartForm2.vue")['default']>
export const LazyCartForm3: LazyComponent<typeof import("../components/cart/CartForm3.vue")['default']>
export const LazyCartForm4: LazyComponent<typeof import("../components/cart/CartForm4.vue")['default']>
export const LazyCartItem: LazyComponent<typeof import("../components/cart/CartItem.vue")['default']>
export const LazyCartSummary: LazyComponent<typeof import("../components/cart/CartSummary.vue")['default']>
export const LazyCartCustomerData: LazyComponent<typeof import("../components/cart/CustomerData.vue")['default']>
export const LazyCartDeliveryAddress: LazyComponent<typeof import("../components/cart/DeliveryAddress.vue")['default']>
export const LazyCartDeliveryOptions: LazyComponent<typeof import("../components/cart/DeliveryOptions.vue")['default']>
export const LazyCartOrderNotes: LazyComponent<typeof import("../components/cart/OrderNotes.vue")['default']>
export const LazyCartOrderSummary: LazyComponent<typeof import("../components/cart/OrderSummary.vue")['default']>
export const LazyCartPaymentOptions: LazyComponent<typeof import("../components/cart/PaymentOptions.vue")['default']>
export const LazyCartSteps: LazyComponent<typeof import("../components/cart/Steps.vue")['default']>
export const LazyMoleculesAlert: LazyComponent<typeof import("../components/molecules/Alert.vue")['default']>
export const LazyMoleculesContainer: LazyComponent<typeof import("../components/molecules/Container.vue")['default']>
export const LazyMoleculesDropdownButton: LazyComponent<typeof import("../components/molecules/DropdownButton.vue")['default']>
export const LazyMoleculesFlagOption: LazyComponent<typeof import("../components/molecules/FlagOption.vue")['default']>
export const LazyMoleculesFormField: LazyComponent<typeof import("../components/molecules/FormField.vue")['default']>
export const LazyMoleculesOrderReviewSection: LazyComponent<typeof import("../components/molecules/OrderReviewSection.vue")['default']>
export const LazyMoleculesPagination: LazyComponent<typeof import("../components/molecules/Pagination.vue")['default']>
export const LazyMoleculesProductItem: LazyComponent<typeof import("../components/molecules/ProductItem.vue")['default']>
export const LazyMoleculesProductItemDesktop: LazyComponent<typeof import("../components/molecules/ProductItemDesktop.vue")['default']>
export const LazyMoleculesProductItemMobile: LazyComponent<typeof import("../components/molecules/ProductItemMobile.vue")['default']>
export const LazyMoleculesProfileSection: LazyComponent<typeof import("../components/molecules/ProfileSection.vue")['default']>
export const LazyMoleculesSearchInput: LazyComponent<typeof import("../components/molecules/SearchInput.vue")['default']>
export const LazyMoleculesSuccessHeader: LazyComponent<typeof import("../components/molecules/SuccessHeader.vue")['default']>
export const LazyOrganismsAuthForm: LazyComponent<typeof import("../components/organisms/AuthForm.vue")['default']>
export const LazyOrganismsFilterDrawer: LazyComponent<typeof import("../components/organisms/FilterDrawer.vue")['default']>
export const LazyOrganismsFooter: LazyComponent<typeof import("../components/organisms/Footer.vue")['default']>
export const LazyOrganismsHeader: LazyComponent<typeof import("../components/organisms/Header.vue")['default']>
export const LazyOrganismsProductFilters: LazyComponent<typeof import("../components/organisms/ProductFilters.vue")['default']>
export const LazyRegisterForm: LazyComponent<typeof import("../components/register/RegisterForm.vue")['default']>
export const LazyRegisterForm1: LazyComponent<typeof import("../components/register/RegisterForm1.vue")['default']>
export const LazyRegisterForm2: LazyComponent<typeof import("../components/register/RegisterForm2.vue")['default']>
export const LazyRegisterForm3: LazyComponent<typeof import("../components/register/RegisterForm3.vue")['default']>
export const LazyVerifyResendVerificationForm: LazyComponent<typeof import("../components/verify/ResendVerificationForm.vue")['default']>
export const LazyVerifyError: LazyComponent<typeof import("../components/verify/VerifyError.vue")['default']>
export const LazyVerifyLoading: LazyComponent<typeof import("../components/verify/VerifyLoading.vue")['default']>
export const LazyVerifySuccess: LazyComponent<typeof import("../components/verify/VerifySuccess.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
