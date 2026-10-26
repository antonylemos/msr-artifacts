// src/pages/flowbuilder/utils/flowUtils.js

/**
 * Safely retrieves a value from a nested object using a dot-notation path.
 * Handles basic dot notation and simple array indexing like 'key[0]'.
 * @param {object} context The object to traverse.
 * @param {string} path The dot-notation path (e.g., "contact.name", "trigger.data.messageText", "contact.tags[0]").
 * @param {*} [defaultValue=undefined] The value to return if path is not found.
 * @returns {*} The value at the path, or defaultValue if not found.
 */
export const getContextValue = (context, path, defaultValue = undefined) => {
  if (!path || typeof path !== 'string' || !context) return defaultValue;

  // Regex to split path by dots, but not dots within square brackets (for array indices)
  // This is a simplified regex and might not cover all edge cases of complex paths.
  const parts = path.match(/[^.[\]]+|\[\d+\]/g);
  if (!parts) return defaultValue;

  let current = context;
  for (const part of parts) {
    if (part.startsWith('[') && part.endsWith(']')) { // Array index
      const index = parseInt(part.substring(1, part.length - 1), 10);
      if (Array.isArray(current) && index >= 0 && index < current.length) {
        current = current[index];
      } else {
        return defaultValue; // Index out of bounds or not an array
      }
    } else { // Object property
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return defaultValue; // Property not found or current is not an object
      }
    }
  }
  return current === undefined ? defaultValue : current;
};

/**
 * Safely sets a value in a nested object using a dot-notation path.
 * Creates nested objects/arrays if they don't exist along the path.
 * Handles basic dot notation and simple array indexing like 'key[0]'.
 * This function mutates the original context object.
 * @param {object} context The object to modify.
 * @param {string} path The dot-notation path (e.g., "flow.userName", "temp.data.value", "contact.tags[0]").
 * @param {*} value The value to set.
 */
export const setContextValue = (context, path, value) => {
  if (!path || typeof path !== 'string' || !context) return;

  const parts = path.match(/[^.[\]]+|\[\d+\]/g);
  if (!parts) return;

  let current = context;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextPartIsArrayIndex = parts[i+1]?.startsWith('[');

    if (part.startsWith('[') && part.endsWith(']')) { // Current part is array index
      const index = parseInt(part.substring(1, part.length - 1), 10);
      if (!Array.isArray(current)) return; // Error: trying to index non-array
      if (index >= current.length) { // Ensure array is large enough
          for(let j = current.length; j <= index; j++) current.push(undefined);
      }
      if (current[index] === undefined || typeof current[index] !== 'object') {
        current[index] = nextPartIsArrayIndex ? [] : {};
      }
      current = current[index];
    } else { // Current part is object key
      if (!current[part] || typeof current[part] !== 'object') {
        current[part] = nextPartIsArrayIndex ? [] : {};
      }
      current = current[part];
    }
  }

  const lastPart = parts[parts.length - 1];
  if (lastPart.startsWith('[') && lastPart.endsWith(']')) {
    const index = parseInt(lastPart.substring(1, lastPart.length - 1), 10);
    if (!Array.isArray(current)) { // If the parent should be an array but isn't (e.g. path "a[0]" but 'a' is not array)
        // This case is tricky: what should current be? For simplicity, we assume parent exists as array.
        // A more robust solution would create it if it's the direct parent.
        // For now, if current isn't an array and we're trying to set an index, this might fail or behave unexpectedly.
        // Let's assume for 'a[0]=value', 'a' should exist or be created as an array.
        console.warn(`Trying to set index on non-array for path: ${path}`);
        return;
    }
    if (index >= current.length) {
        for(let j = current.length; j <= index; j++) current.push(undefined);
    }
    current[index] = value;
  } else {
    current[lastPart] = value;
  }
};


/**
 * Replaces placeholders like {{variable.path}} in a string with values from the context.
 * @param {string} templateString The string containing placeholders.
 * @param {object} context The data context to use for replacements.
 * @returns {string} The string with placeholders replaced.
 */
export const replacePlaceholders = (templateString, context) => {
  if (typeof templateString !== 'string') return String(templateString); // Or handle error
  return templateString.replace(/\{\{([^}]+)\}\}/g, (match, placeholderPath) => {
    const value = getContextValue(context, placeholderPath.trim());
    return (value !== undefined && value !== null) ? String(value) : match; // Keep {{placeholder}} if not found
  });
};


