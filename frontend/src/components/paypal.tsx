import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export function Paypal({ price }: { price: number }) {

    return (
        <>
            <PayPalScriptProvider options={{ "client-id": "AaHSVSNnZZK-S4EdPcb_qDubK4biLbVM_TvKuOWquDceFIPH81tKrzr1JxSML2YYqSyrIcRC2PxnH-wV" }}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: String(price),
                                    },

                                },
                            ],
                        });
                    }}

                    onApprove={async (data) => {
                        alert(data.orderID);
                    }}

                    onCancel={async () => {
                        alert("Canceled");
                    }}

                />
            </PayPalScriptProvider>
        </>
    )
}