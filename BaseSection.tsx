"use client"
import React, { useCallback } from "react";
import type { BaseInputs } from "@/lib/types";
import { DEFAULT_FORM_STATE } from "@/lib/constants";
import { useTrainingTimeInput } from "@/hooks/useTrainingTimeInput";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface BaseSectionProps {
  data: BaseInputs;
  onChange: (data: BaseInputs) => void;
}

export function BaseSection({ data, onChange }: BaseSectionProps) {
  /*   const onRawChange = useCallback(
      (raw: string) => {
        onChange({ ...data, trainingTimeRaw: raw });
      },
      [data, onChange]
    ); */
  const onRawChange = (raw: string) => {
    onChange({ ...data, trainingTimeRaw: raw });
  };


  const { displayValue, handleChange: handleTimeChange, handleBlur } =
    useTrainingTimeInput({
      rawValue: data.trainingTimeRaw,
      onRawChange,
    });

  const handleNumberChange = useCallback(
    (
      field: keyof Pick<
        BaseInputs,
        "speedupDays" | "speedupHours" | "speedupMinutes" | "trainingSpeedBonus"
      >
    ) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.max(0, parseInt(e.target.value) || 0);
        onChange({ ...data, [field]: val });
      },
    [data, onChange]
  );

  const handleReset = useCallback(() => {
    onChange({ ...DEFAULT_FORM_STATE.base });
  }, [onChange]);

  console.log("trainingTimeRaw:", data.trainingTimeRaw);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">Base</CardTitle>
          <CardDescription>Training time and speedups</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="training-time">Training Time (per 1000 troops)</Label>
          {/* <Input
            id="training-time"
            placeholder="HH:MM:SS"
            value={displayValue ?? ""}
            onChange={handleTimeChange}
            onBlur={handleBlur}
          /> */}
          <Input
            id="training-time"
            placeholder="HH:MM:SS"
            value={displayValue}
            onChange={handleTimeChange}
          />
          <p className="text-xs text-muted-foreground">
            Type digits e.g. 12530 → 01:25:30
          </p>
        </div>

        <div className="space-y-2">
          <Label>Speedups Available</Label>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label
                htmlFor="speedup-days"
                className="text-xs text-muted-foreground"
              >
                Days
              </Label>
              <Input
                id="speedup-days"
                type="number"
                min={0}
                value={data.speedupDays || ""}
                onChange={handleNumberChange("speedupDays")}
                placeholder="0"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="speedup-hours"
                className="text-xs text-muted-foreground"
              >
                Hours
              </Label>
              <Input
                id="speedup-hours"
                type="number"
                min={0}
                value={data.speedupHours || ""}
                onChange={handleNumberChange("speedupHours")}
                placeholder="0"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="speedup-minutes"
                className="text-xs text-muted-foreground"
              >
                Minutes
              </Label>
              <Input
                id="speedup-minutes"
                type="number"
                min={0}
                value={data.speedupMinutes || ""}
                onChange={handleNumberChange("speedupMinutes")}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="speed-bonus">Training Speed Bonus (%)</Label>
          <Input
            id="speed-bonus"
            type="number"
            min={0}
            max={99}
            value={data.trainingSpeedBonus || ""}
            onChange={handleNumberChange("trainingSpeedBonus")}
            placeholder="0"
          />
        </div>
      </CardContent>
    </Card>
  );
}
