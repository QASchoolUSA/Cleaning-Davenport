import { BookingCalculator } from "@/components/calculator/BookingCalculator";
import { getPricingConfig } from "@/lib/pricing-config";
import type { FrequencyId, ServiceTypeId } from "@/lib/pricing";

/**
 * Renders the calculator with live prices already resolved, so the estimate in
 * the server-rendered HTML is the real one and never changes under the customer.
 * Pages should import this rather than `BookingCalculator` directly.
 */
export async function BookingCalculatorServer(props: {
  defaultService?: ServiceTypeId;
  defaultFrequency?: FrequencyId;
  variant?: "embedded" | "app";
}) {
  const config = await getPricingConfig();
  return <BookingCalculator {...props} config={config} />;
}
