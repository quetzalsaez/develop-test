export default function TotalAmounts(props) {
    const { useState, useEffect } = React
    const [subtotal, setSubtotal] = useState();
    const [total, setTotal] = useState();
    const [vat, setVat] = useState();

    useEffect(() => {
        calculate();
    }, [props.itemList]);

    function calculate() {
        let localSubtotal = 0;
        let localVat;
        let localTotal;
        props.itemList.forEach(function (element) {
            localSubtotal += element.quantity * element.price;
            localVat = localSubtotal * 1 / 20;
            localTotal = localSubtotal + localVat;
        })
        setSubtotal(localSubtotal)
        setVat(localVat)
        setTotal(localTotal)
    }

    return (
        <div class="total-amount">
            <div className="total-amount__subtotal flex-row space-between">
                <p>Subtotal</p>
                <p>£{subtotal ? subtotal.toFixed(2) : 0}</p>
            </div>
            <div className="total-amount__vat flex-row space-between">
                <p>VAT at 20%</p>
                <p>£{vat ? vat.toFixed(2) : 0}</p>
            </div>
            <div className="total-amount__total flex-row space-between">
                <p>Total cost</p>
                <p>£{total ? total.toFixed(2) : 0}</p>
            </div>
        </div>
    )
}