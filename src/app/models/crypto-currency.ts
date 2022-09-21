export class CryptoCurrency {
  constructor(public cryptoName: string, public imageUrl: string, public marketCap: string, public name: string,
              public percentChange1h: string, public percentChange24h: string, public percentChange30d: string, public percentChange60d: string,
              public percentChange7d: string, public percentChange90d: string, public priceAsDouble: number, public priceUsd: string, public slug: string,
              public symbol: string, public value: number, public volume24h: string, public volumeChange24h: string) {
  }
}
