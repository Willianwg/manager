export interface IPayment<T> {
    createOrder(orderInfo: T): Promise<string>;
}