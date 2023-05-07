import { useRef, useEffect } from "react";

export default function Paypal() {
    const paypal = useRef();

    useEffect(() => {
        window.paypal
            .Buttons({
                style: {
                    color: "gold",
                    layout: "horizontal",
                    height: 48,
                    tagline: false,
                    shape: "pill"
                },
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Cool looking table",
                                amount: {
                                    currency_code: "USD",
                                    value: 50.00,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}