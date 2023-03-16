import { useApi } from "@/services/axios";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export function Paypal({ price, sellerId, productId }: { price: number, sellerId: string | null, productId: string }) {
    const api = useApi();
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
                        const response = await api.saveSale({
                            managerId: "random",
                            sellerId: sellerId ?? "randomtoo",
                            productId
                        })

                        if(response) alert("SUCCESS");
                    }}

                    onCancel={async () => {
                        alert("Canceled");
                    }}

                />
            </PayPalScriptProvider>
        </>
    )
}