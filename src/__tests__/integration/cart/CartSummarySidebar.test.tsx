import { CartSummarySidebar } from "@/components/cart/CartSummarySidebar";
import {
  useApplyDiscount,
  useCheckoutWallet,
  useCheckoutZarinpal,
  useWallet,
} from "@/services";
import { useRemoveDiscount } from "@/services/cart/useRemoveDiscount";
import { useAuthStore } from "@/store/authStore";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockCart = {
  id: "cart-1",
  totalItems: 2,
  subtotal: 1000000,
  totalAmount: 1000000,
  totalPayment: 1000000,
  discount: null,
  items: [],
};

describe("CartSummarySidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuthStore).mockReturnValue(true as any); // پیش‌فرض لاگین شده
    vi.mocked(useWallet).mockReturnValue({
      data: { data: { wallet: { balance: 2000000 } } },
    } as any);
  });

  it("should render prices correctly", () => {
    render(<CartSummarySidebar cart={mockCart as any} />);

    expect(screen.getByText("subtotal")).toBeInTheDocument();
    expect(screen.getByText("totalAmount")).toBeInTheDocument();
  });

  it("should allow switching between ZarinPal and Wallet payment methods", async () => {
    const user = userEvent.setup();
    render(<CartSummarySidebar cart={mockCart as any} />);

    const walletBtn = screen.getByRole("button", {
      name: /paymentMethods\.WALLET/i,
    });
    await user.click(walletBtn);

    expect(walletBtn).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("walletBalance:")).toBeInTheDocument();
  });

  it("should call checkoutZarinpal when ZarinPal is selected and checkout button is clicked", async () => {
    const mockCheckoutZarinpal = vi.fn();
    vi.mocked(useCheckoutZarinpal).mockReturnValue({
      mutate: mockCheckoutZarinpal,
      isPending: false,
    } as any);

    const user = userEvent.setup();
    render(<CartSummarySidebar cart={mockCart as any} />);

    const checkoutBtn = screen.getByText("checkout");
    await user.click(checkoutBtn);

    expect(mockCheckoutZarinpal).toHaveBeenCalledTimes(1);
  });

  it("should call checkoutWallet when Wallet is selected and user has enough balance", async () => {
    const mockCheckoutWallet = vi.fn();
    vi.mocked(useCheckoutWallet).mockReturnValue({
      mutate: mockCheckoutWallet,
      isPending: false,
    } as any);

    const user = userEvent.setup();
    render(<CartSummarySidebar cart={mockCart as any} />);

    // انتخاب کیف پول
    const walletBtn = screen.getByRole("button", {
      name: /paymentMethods\.WALLET/i,
    });
    await user.click(walletBtn);

    // پرداخت
    const checkoutBtn = screen.getByText("checkout");
    await user.click(checkoutBtn);

    expect(mockCheckoutWallet).toHaveBeenCalledTimes(1);
  });

  it("should allow applying a discount code", async () => {
    const mockApplyDiscount = vi.fn();
    vi.mocked(useApplyDiscount).mockReturnValue({
      mutate: mockApplyDiscount,
      isPending: false,
    } as any);

    const user = userEvent.setup();
    render(<CartSummarySidebar cart={mockCart as any} />);

    const input = screen.getByPlaceholderText("discountPlaceholder");
    await user.type(input, "OFF50");

    const applyBtn = screen.getByText("applyDiscount");
    await user.click(applyBtn);

    expect(mockApplyDiscount).toHaveBeenCalledWith({ code: "OFF50" });
  });

  it("should render active discount and allow removing it", async () => {
    const mockRemoveDiscount = vi.fn();
    vi.mocked(useRemoveDiscount).mockReturnValue({
      mutate: mockRemoveDiscount,
      isPending: false,
    } as any);

    const cartWithDiscount = {
      ...mockCart,
      discount: { code: "YELDA", type: "PERCENTAGE", value: 20 },
      totalPayment: 800000,
    };

    const user = userEvent.setup();
    render(<CartSummarySidebar cart={cartWithDiscount as any} />);

    expect(screen.getByText("YELDA")).toBeInTheDocument();

    const removeBtn = screen.getByLabelText("discountRemove");
    await user.click(removeBtn);

    expect(mockRemoveDiscount).toHaveBeenCalledTimes(1);
  });
});
