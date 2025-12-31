// Packages
import { useMemo } from 'react'

// App
import { formatCurrency } from 'shared/utils/formatCurrency';
import { useCart } from 'features/cart/hooks/useCart';
import Card from "features/checkout/components/Card";
import CardBody from "features/checkout/components/CardBody";
import CardHeader from "features/checkout/components/CardHeader";
import CartItem from 'features/cart/components/CartItem';
import Divider from 'shared/components/Divider';

// Styles
import "./styles.scss"

const OrderSummary = () => {
    const {
        currency,
        items,
        totalPrice,
        totalShipping,
        totalTaxes,
    } = useCart();

    const totals = useMemo(() => {
        return [
            {
                label: 'Subtotal:',
                number: formatCurrency(totalPrice.toFixed(2), currency),
            }, {
                label: 'Shipping:',
                number: formatCurrency(totalShipping.toFixed(2), currency),
            }, {
                label: 'Taxes:',
                number: formatCurrency(totalTaxes.toFixed(2), currency),
            }
        ]
    }, [totalPrice, totalShipping, totalTaxes, currency])

    const totalNumber = useMemo(() => {
        const totalNumber = totalPrice + totalShipping + totalTaxes;
        return formatCurrency(totalNumber.toFixed(2), currency);
    }, [totalPrice, totalShipping, totalTaxes, currency])

    return (
        <Card>
            <CardHeader title={"Resumen de compra"} />
            <CardBody className="summary__body">
                <div className='cart__content'>
                    <div className='cart__items'>
                        {items?.map(item => (
                            <div className='cart__item'>
                                <CartItem
                                    key={item?.id}
                                    {...item}
                                />
                                <Divider />
                            </div>
                        ))}
                    </div>
                    <div className='cart__total'>
                        {totals.map((item, index) => (
                            <div key={index} className='cart__total-item'>
                                <h4>{item?.label}</h4>
                                <h4>{item?.number}</h4>
                            </div>
                        ))}
                        <div className='cart__total-number'>
                            <h4>Total:</h4>
                            <h4>{totalNumber}</h4>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default OrderSummary;


