# react-use-feature-flag

[![npm version](https://img.shields.io/npm/v/react-use-feature-flag.svg)](https://www.npmjs.com/package/react-use-feature-flag)
[![npm bundle size](https://img.shields.io/bundlephobia/min/react-use-feature-flag)](https://bundlephobia.com/result?p=react-use-feature-flag)
[![CI](https://github.com/slavikme/use-feature-flag/actions/workflows/ci.yml/badge.svg)](https://github.com/slavikme/use-feature-flag/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/react-use-feature-flag.svg)](https://github.com/slavikme/use-feature-flag/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-16.8+-61DAFB.svg)](https://reactjs.org/)

A simple React hook for managing client-side feature flags using localStorage.

## Installation

```bash
npm install react-use-feature-flag
# or
yarn add react-use-feature-flag
# or
pnpm add react-use-feature-flag
```

## Usage

```tsx
import useFeatureFlag from "react-use-feature-flag";

function MyComponent() {
  const [isEnabled, setEnabled] = useFeatureFlag("my-feature");

  return (
    <div>
      {isEnabled && <NewFeature />}
      <button onClick={() => setEnabled(!isEnabled)}>Toggle Feature</button>
    </div>
  );
}
```

## API

### Function Signature

```typescript
useFeatureFlag(
  flagName: string,
  initValue?: boolean,
  options?: FeatureFlagOptions
): [boolean, (value: boolean) => void]
```

or

```typescript
useFeatureFlag(
  flagName: string,
  options?: FeatureFlagOptions
): [boolean, (value: boolean) => void]
```

### Parameters

- `flagName` (string): The name of the feature flag
- `initValue` (boolean, optional): Initial value
- `options` (FeatureFlagOptions, optional): Configuration options

### Options

```typescript
type FeatureFlagOptions = {
  /** Prefix for the localStorage key. Defaults to "FF_" */
  prefix?: string;
  /** Whether to store the initial value in localStorage on first mount. Defaults to true */
  storeOnInit?: boolean;
};
```

### Returns

A tuple containing:

- Current flag value (boolean)
- Setter function to update the flag value

## Examples

### Basic Usage

```tsx
const [isEnabled, setEnabled] = useFeatureFlag("new-feature");
```

### With Initial Value

```tsx
const [isEnabled, setEnabled] = useFeatureFlag("new-feature", true);
```

### With Options

```tsx
const [isEnabled, setEnabled] = useFeatureFlag("new-feature", {
  prefix: "FEATURE_",
  storeOnInit: false,
});
```

### With Initial Value and Options

```tsx
const [isEnabled, setEnabled] = useFeatureFlag("new-feature", true, {
  prefix: "FEATURE_",
  storeOnInit: true,
});
```

## Features

- 🔄 Persistent storage using localStorage
- ⚡️ TypeScript support
- 🎯 Simple API
- 🔧 Configurable prefix for localStorage keys
- 🚫 Option to disable automatic storage on initialization

## Important Notes

### Manual Flag Management

The feature flag can be manually changed from the browser's DevTools:

1. Open DevTools (F12 or right-click -> Inspect)
2. Go to Application -> Local Storage
3. Find the flag using the configured prefix (default: "FF\_")
4. Change the value to "true" or "false"
5. The change will take effect immediately in the application

### Default Storage Behavior

By default, the hook creates a record in localStorage with a `false` value on first mount. This makes it easier to manage flags in the client and provides a consistent initial state. You can modify this behavior using the `storeOnInit` option in the configuration for various reasons:

- Hide feature flags from users in DevTools
- Prevent accidental flag exposure during development
- Control when flags become visible to end users

```tsx
// Disable automatic storage on initialization
const [isEnabled, setEnabled] = useFeatureFlag("new-feature", {
  storeOnInit: false,
});
```

## License

[MIT](LICENSE)
