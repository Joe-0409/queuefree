import { ADMIN_API_PREFIX, API_PREFIX } from './routes';

export const API_ROOT_PATH = API_PREFIX;
export const ADMIN_API_ROOT_PATH = ADMIN_API_PREFIX;

export const HEALTH_ENDPOINT = `${API_ROOT_PATH}/health`;
export const SYSTEM_RUNTIME_CONFIG_ENDPOINT = `${API_ROOT_PATH}/system/runtime-config`;
export const OPENAPI_DOCS_PATH = `${API_ROOT_PATH}/docs`;
export const OPENAPI_JSON_PATH = `${API_ROOT_PATH}/openapi.json`;
