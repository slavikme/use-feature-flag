import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export type FeatureFlagOptions = {
  /** Prefix for the localStorage key. Defaults to "FF_" */
  prefix?: string;
  /** Whether to store the initial value in localStorage on first mount. Defaults to true */
  storeOnInit?: boolean;
};

/**
 * Custom hook to manage feature flags in the application.
 *
 * @example
 * ```tsx
 * // Basic usage with options
 * const [isEnabled, setEnabled] = useFeatureFlag('new-feature', {
 *   prefix: 'FEATURE_',
 *   storeOnInit: true
 * });
 *
 * // With initial value and options
 * const [isEnabled, setEnabled] = useFeatureFlag('new-feature', true, {
 *   prefix: 'FEATURE_',
 *   storeOnInit: true
 * });
 *
 * // With just initial value
 * const [isEnabled, setEnabled] = useFeatureFlag('new-feature', true);
 * ```
 *
 * @param {string} flagName - The name of the feature flag.
 * @param {boolean | FeatureFlagOptions} initValueOrOptions - Initial value or configuration options.
 * @param {FeatureFlagOptions} [options] - Configuration options for the feature flag.
 * @returns {[boolean, (value: boolean) => void]} A tuple containing the flag value and a setter function.
 */
function useFeatureFlag(
  flagName: string,
  initValue?: boolean,
  options?: FeatureFlagOptions
): [boolean, (value: boolean) => void];

function useFeatureFlag(
  flagName: string,
  options?: FeatureFlagOptions
): [boolean, (value: boolean) => void];

function useFeatureFlag(
  flagName: string,
  initValueOrOptions: boolean | FeatureFlagOptions = false,
  options: FeatureFlagOptions = {}
): [boolean, (value: boolean) => void] {
  const isOptions = typeof initValueOrOptions === "object";
  const initValue = isOptions ? false : initValueOrOptions;
  const finalOptions = isOptions ? initValueOrOptions : options;

  const { prefix = "FF_", storeOnInit = true } = finalOptions;

  const prefixedFlagName = `${prefix}${flagName}`;
  const [flagValue, setFlagValue] = useLocalStorage<boolean | null>(
    prefixedFlagName,
    null
  );

  useEffect(() => {
    if (storeOnInit && flagValue === null) {
      setFlagValue(initValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we want to run this effect only once and only when the component is mounted
  }, []);

  return [flagValue ?? initValue, setFlagValue];
}

export default useFeatureFlag;
