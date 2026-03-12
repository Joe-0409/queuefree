export async function waitForMock(delayMs = 120): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
}
