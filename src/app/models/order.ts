export default class Order {
  public cryptoMoney?: CryptoMoney;
  public dateTransaction: string;
  public idOrder?: number;
  public mode?: string;
  public quantity?: number;
  public unitPrice?: number;
}

export class CryptoMoney {
  public cryptoName?: string;
  public slug?: string;
  public symbol?: string;

}
