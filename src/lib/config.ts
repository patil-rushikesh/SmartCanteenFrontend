const getEnv = (key: string) => {
  return window._env_?.[key] || import.meta.env[key];
};

export const appConfig = {
  apiBaseUrl: getEnv('VITE_API_BASE_URL')?.replace(/\/$/, '') ?? 'http://localhost:8080/api',
  paymentMode: getEnv('VITE_PAYMENT_MODE') ?? 'fake',
  razorpayKeyId: getEnv('VITE_RAZORPAY_KEY_ID') ?? 'rzp_test_key',
  enableQaTools: getEnv('VITE_ENABLE_QA_TOOLS') === 'true'
} as const;
