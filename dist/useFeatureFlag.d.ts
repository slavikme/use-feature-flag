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
declare function useFeatureFlag(flagName: string, initValue?: boolean, options?: FeatureFlagOptions): [boolean, (value: boolean) => void];
declare function useFeatureFlag(flagName: string, options?: FeatureFlagOptions): [boolean, (value: boolean) => void];
export default useFeatureFlag;
