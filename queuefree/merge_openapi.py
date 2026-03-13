import yaml
import json

# Load original
with open('services/api/openapi/queuefree.v1.yaml', 'r') as f:
    data = yaml.safe_load(f)

# Load patch
patch_yaml = '''
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
'''

patch = yaml.safe_load(patch_yaml)

# Merge paths
def merge_paths(base, overlay):
    for path, path_item in overlay.get('paths', {}).items():
        if path not in base['paths']:
            base['paths'][path] = path_item
        else:
            for method, method_details in path_item.items():
                if method not in base['paths'][path]:
                    base['paths'][path][method] = method_details
                else:
                    if 'responses' in method_details:
                        base['paths'][path][method]['responses'].update(method_details['responses'])

merge_paths(data, patch)

# Update description
data['info']['title'] = 'QueueFree API (Readonly + Write Operations)'
data['info']['description'] = 'QueueFree API contract with both readonly and write operations for C-end integration.'

# Write back
with open('services/api/openapi/queuefree.v1.yaml', 'w') as f:
    yaml.dump(data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)

print('Merged successfully')
