// Provide the native DOMException available in Node.js 18+ 
// This avoids using the deprecated npm 'node-domexception' package.
module.exports = globalThis.DOMException || Error;
