const currenciesFormatters = {
  'pt-br': new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }),
}

export function useCurrency(currency: keyof typeof currenciesFormatters): (value: number) => string {
  return (value: number) => currenciesFormatters[currency]?.format(value)
}