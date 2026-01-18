const decodeJWT = (token) => {
  if (!token) return null;
  
  try {
    // Split the token into parts
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }
    
    // Base64 decode the payload (second part)
    const payload = parts[1];
    
    // Base64 decode for React Native (replace padding and convert)
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeBase64(base64);
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

// Base64 decoding for React Native
const decodeBase64 = (base64) => {
  // For React Native, we can use a simple implementation
  // In a real app, you might want to use a library like base-64
  return atobPolyfill(base64);
};

// Simple atob polyfill for React Native
const atobPolyfill = (input) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let str = String(input).replace(/=+$/, '');
  let output = '';

  for (
    let bc = 0, bs, buffer, idx = 0;
    (buffer = str.charAt(idx++));
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4)
      ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
};

// Check if token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return true;
  
  // Convert expiration time to milliseconds and compare with current time
  return Date.now() >= payload.exp * 1000;
};
