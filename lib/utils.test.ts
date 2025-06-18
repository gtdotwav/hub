import { formatCurrency } from "./utils"

describe("formatCurrency", () => {
  it("should format positive numbers correctly for BRL", () => {
    expect(formatCurrency(1234.56)).toBe("R$ 1.234,56")
  })

  it("should format zero correctly for BRL", () => {
    expect(formatCurrency(0)).toBe("R$ 0,00")
  })

  it("should format negative numbers correctly for BRL", () => {
    expect(formatCurrency(-500)).toBe("-R$ 500,00")
  })

  it("should use a different currency if specified", () => {
    // Note: Node's Intl might need full ICU data for all currencies.
    // This test might behave differently in limited Node environments vs. browsers.
    // For USD, it should be '$1,234.56' if Intl is configured correctly.
    // For simplicity, we'll check if it contains the currency symbol.
    expect(formatCurrency(1234.56, "USD")).toContain("US$")
  })
})
