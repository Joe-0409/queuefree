/**
 * Intentionally empty runtime root.
 *
 * Rationale:
 * - Prevent accidental broad imports from `@queuefree/api-client` in Expo / Metro.
 * - Runtime SDK imports must use narrow subpaths:
 *   - `@queuefree/api-client/sdk`
 *   - `@queuefree/api-client/client`
 * - Type imports should use:
 *   - `@queuefree/api-client/types`
 */
export {};
