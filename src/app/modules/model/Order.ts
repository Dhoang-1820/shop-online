export class OrderDetailList  {
    productId!: number;
    quantity!: number;
    unitPrice!: number
}

export class Order {
    public date!: any;
    public status!: string;
    public totalPrice!: number;
    public paymentMode!: string;
    public userId!: number;
    public orderDetailList!: OrderDetailList[]
}