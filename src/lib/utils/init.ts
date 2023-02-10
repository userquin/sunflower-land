import util from "util";
import Decimal from "decimal.js-light";

export function initialise() {
  /**
   * Override the default stringify of Decimal.js for assist in debugging.
   */
  (Decimal.prototype as any)[util.inspect.custom] = Decimal.prototype.toString;

  /**
   * Decimal precision standard to handle ERC20 18 decimals + 12 decimal places reserved for in game actions
   */
  Decimal.set({ toExpPos: 30 });
  Decimal.set({ toExpNeg: -30 });

  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  }
}
