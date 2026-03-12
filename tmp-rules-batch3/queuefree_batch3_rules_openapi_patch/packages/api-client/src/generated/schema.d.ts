/**
 * This file is a checked-in snapshot derived from services/api/openapi/openapi.json.
 * Do not hand-edit business paths or schema fields here.
 * Regenerate with: pnpm --filter @queuefree/api-client generate
 */

export interface paths {
  "/v1/health": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["getHealth"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/system/runtime-config": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["getRuntimeConfig"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/rules": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["listRules"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/rules/{slug}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["getRuleBySlug"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}

export interface components {
  schemas: {
    AppEnv: "local" | "dev" | "test" | "staging" | "prod";
    HealthResponse: {
      status: "ok";
      service: string;
      version: string;
      environment: components["schemas"]["AppEnv"];
      timestamp: string;
    };
    RuntimeConfigResponse: {
      marketCode: string;
      currencyCode: string;
      timezone: string;
      locale: string;
      language: string;
      ruleVersion: string;
      rewardedAdsEnabled: boolean;
    };
    RuleListItem: {
      slug: string;
      title: string;
      summary: string;
      updatedAt: string;
      ruleVersion: string;
    };
    RuleDetailResponse: {
      slug: string;
      title: string;
      sections: string[];
      updatedAt: string;
      ruleVersion: string;
    };
    ApiErrorResponse: {
      code: string;
      message: string;
      requestId?: string;
      details?: Record<string, unknown>;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export interface operations {
  getHealth: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HealthResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ApiErrorResponse"];
        };
      };
    };
  };
  getRuntimeConfig: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["RuntimeConfigResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ApiErrorResponse"];
        };
      };
    };
  };
  listRules: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["RuleListItem"][];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ApiErrorResponse"];
        };
      };
    };
  };
  getRuleBySlug: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        slug: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["RuleDetailResponse"];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ApiErrorResponse"];
        };
      };
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ApiErrorResponse"];
        };
      };
    };
  };
}
