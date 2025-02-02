export const calculate_total_price = (items) => {
    return items.reduce((acc, item) => {
        const discount = item.discountPercentage ? item.discountPercentage / 100 : 0;
        const priceWithDiscount = item.price - (item.price * discount);
        return acc + (priceWithDiscount * item.quantity);
    }, 0);
};