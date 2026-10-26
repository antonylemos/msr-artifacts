type OrderSummaryProps = {
  totalPrice: number;
};

/**
 * Displays the order summary, including subtotal, shipping,
 * and the final total price.
 */
export function OrderSummary({ totalPrice }: OrderSummaryProps) {
  return (
    <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 sticky top-8">
      <h2 className="text-2xl font-bold border-b pb-4 mb-6 text-gray-700">
        Order Summary
      </h2>
      <div className="space-y-4 text-slate-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-semibold text-green-500">FREE</span>
        </div>
        <div className="border-t pt-4 mt-4 flex justify-between font-bold text-xl text-slate-900">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition">
        Proceed to Checkout
      </button>
    </div>
  );
}
