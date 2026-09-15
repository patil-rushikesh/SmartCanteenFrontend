#!/bin/sh
set -eu
# JSON encoding prevents quotes/newlines in values from breaking JavaScript.
json=$(jq -n \
  --arg api "${VITE_API_BASE_URL:-/api}" \
  --arg backend "${VITE_BACKEND_BASE_URL:-}" \
  --arg payment "${VITE_PAYMENT_MODE:-razorpay}" \
  --arg key "${VITE_RAZORPAY_KEY_ID:-}" \
  --arg qa "${VITE_ENABLE_QA_TOOLS:-false}" \
  '{VITE_API_BASE_URL:$api,VITE_BACKEND_BASE_URL:$backend,VITE_PAYMENT_MODE:$payment,VITE_RAZORPAY_KEY_ID:$key,VITE_ENABLE_QA_TOOLS:$qa}')
printf 'window._env_ = %s;\n' "$json" > /tmp/env-config.js
