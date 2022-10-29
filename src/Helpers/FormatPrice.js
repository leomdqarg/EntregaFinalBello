export const formatPrice = (price, locale='es-AR') => {
    let localPrice = new Intl.NumberFormat(locale, {style: 'currency', currency: 'ARS'}).format(price)
    return localPrice
}
