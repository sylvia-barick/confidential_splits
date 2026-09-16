import { type ConnectedAPI } from '@midnight-ntwrk/dapp-connector-api';

// The 1AM wallet's own `connect()` handshake can itself fail transiently, the same way its
// hosted prover intermittently 500s on `/check` (see BrowserDeployedSplitsManager). Historically
// every caller (the "Connect wallet" button, and each contract manager's own provider setup)
// re-ran this handshake independently, so a single page load could hit the flaky call two or
// three times over, multiplying the odds of a "Request failed" surfacing to the user. Caching the
// in-flight/resolved connection here means the handshake runs at most once per page load and every
// caller shares the same session.
let connectedWallet: Promise<ConnectedAPI> | undefined;

export const getSharedWalletConnection = (connect: () => Promise<ConnectedAPI>): Promise<ConnectedAPI> => {
  if (!connectedWallet) {
    connectedWallet = connect().catch((e: unknown) => {
      // Allow a fresh attempt next time instead of caching a permanent failure.
      connectedWallet = undefined;
      throw e;
    });
  }
  return connectedWallet;
};

// Same flakiness as the connect handshake and the hosted prover's /check calls: the 1AM wallet's
// submitTransaction round-trips to hosted infrastructure and intermittently comes back with a bare
// "Request failed", even though the transaction is otherwise valid. Resubmitting the identical,
// already-signed/proved FinalizedTransaction is safe (the ledger dedupes by tx hash), so retry once
// before surfacing the error to the user.
export const withHostedWalletRetry = async <T>(fn: () => Promise<T>, retries = 1, delayMs = 750): Promise<T> => {
  try {
    return await fn();
  } catch (e) {
    if (retries <= 0) {
      throw e;
    }
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return withHostedWalletRetry(fn, retries - 1, delayMs);
  }
};
