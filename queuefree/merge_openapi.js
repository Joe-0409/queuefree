const fs = require('fs');
const yaml = require('js-yaml');

const originalPath = 'services/api/openapi/queuefree.v1.yaml';
const outputPath = 'services/api/openapi/queuefree.v1.yaml';

// Read original
const originalYaml = fs.readFileSync(originalPath, 'utf8');
const data = yaml.load(originalYaml);

// Patch content
const patchYaml = `
paths:
  /v1/orders:
    post:
      responses:
        '201':
          description: Order created successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateOrderResponse'
        '400':
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiErrorResponse'
        '404':
          description: Related resource not found.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiErrorResponse'
        '500':
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiErrorResponse'

  /v1/orders/{orderId}/payment-intents:
    post:
      responses:
        '201':
          description: Payment intent created successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreatePaymentIntentResponse'
        '404':
          description: Order not found.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiErrorResponse'
        '409':
          description: Order state conflict.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiErrorResponse'
        '500':
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiErrorResponse'

  /v1/queue-guard/check-in:
    post:
      responses:
        '200':
          description: Queue guard check-in succeeded.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserQueueGuardResponse'
        '400':
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiErrorResponse'
        '500':
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiErrorResponse'
`;

const patch = yaml.load(patchYaml);

// Merge paths
function mergePaths(base, overlay) {
  for (const path of Object.keys(overlay.paths || {})) {
    const pathItem = overlay.paths[path];
    if (!base.paths[path]) {
      base.paths[path] = pathItem;
    } else {
      for (const method of Object.keys(pathItem || {})) {
        if (!base.paths[path][method]) {
          base.paths[path][method] = pathItem[method];
        } else {
          if (pathItem[method]?.responses) {
            base.paths[path][method].responses = {
              ...base.paths[path][method].responses,
              ...pathItem[method].responses
            };
          }
        }
      }
    }
  }
}

mergePaths(data, patch);

// Update info
data.info.title = 'QueueFree API (Readonly + Write Operations)';
data.info.description = 'QueueFree API contract with both readonly and write operations for C-end integration.';

// Write back
fs.writeFileSync(outputPath, yaml.dump(data, { indent: 2, noRefs: true, lineWidth: -1 }));
console.log('Merged successfully');
