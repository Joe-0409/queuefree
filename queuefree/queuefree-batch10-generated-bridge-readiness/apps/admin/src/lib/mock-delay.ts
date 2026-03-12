export async function waitForMock(delayMs = 140): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
}
