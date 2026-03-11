// @/hooks/useTrainingTimeInput

import { useCallback, useMemo } from "react";
import type React from "react";
import { formatTimeFromDigits, clampTime } from "@/lib/formatters";

interface UseTrainingTimeInputOptions {
  rawValue: string;
  onRawChange: (raw: string) => void;
}

interface UseTrainingTimeInputReturn {
  displayValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
}

/**
 * Encapsulates the smart HH:MM:SS formatting logic:
 * - strips non-digits on input, limits to 6 chars
 * - formats as HH:MM:SS for display
 * - clamps to 23:59:59 on blur
 */
export function useTrainingTimeInput({
  rawValue,
  onRawChange,
}: UseTrainingTimeInputOptions): UseTrainingTimeInputReturn {

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, "").slice(-6);
      onRawChange(digits);
    },
    [onRawChange]
  );

  const handleBlur = useCallback(() => {
    if (!rawValue) return;

    const formatted = clampTime(formatTimeFromDigits(rawValue));
    const digits = formatted.replace(/:/g, "");
    onRawChange(digits);
  }, [rawValue, onRawChange]);

  // 👇 показываем formatted только если есть значение
  const displayValue = useMemo(() => {
    if (!rawValue) return "";
    return formatTimeFromDigits(rawValue);
  }, [rawValue]);

  return { displayValue, handleChange, handleBlur };
}
