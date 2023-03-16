import { ProductProps } from "@/pages/Dashboard";
import { useApi } from "@/services/axios";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export function Paypal({ sellerId, product }: { sellerId: string | null, product: ProductProps }) {
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
                                        value: String(5),
                                    },

                                },
                            ],
                        });
                    }}

                    onApprove={async (data) => {
                        alert(data.orderID);
                        console.log(data)
                       /* const response = await api.saveSale({
                            sellerId: sellerId ?? "ad847ec0-790c-43ff-a714-ecff55651efd",
                            productId: product.id,
                        }) */
                    }}

                    onCancel={async () => {
                        alert("Canceled");
                    }}

                />
            </PayPalScriptProvider>
        </>
    )
}