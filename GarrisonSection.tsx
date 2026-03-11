"use client"

import React, { useCallback } from "react";
import type { GarrisonInputs } from "@/lib/types";
import { DEFAULT_FORM_STATE } from "@/lib/constants";
import { formatNumber } from "@/lib/formatters";
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

interface GarrisonSectionProps {
  data: GarrisonInputs;
  troopsTrained: number;
  onChange: (data: GarrisonInputs) => void;
}

export function GarrisonSection({
  data,
  troopsTrained,
  onChange,
}: GarrisonSectionProps) {
  const handleChange = useCallback(
    (field: keyof GarrisonInputs) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.max(0, parseInt(e.target.value) || 0);
        onChange({ ...data, [field]: val });
      },
    [data, onChange]
  );

  const handleReset = useCallback(() => {
    onChange({ ...DEFAULT_FORM_STATE.garrison });
  }, [onChange]);

  const { currentTroops, maxGarrisonCapacity } = data;
  const totalAfter = currentTroops + troopsTrained;
  const hasCapacity = maxGarrisonCapacity > 0;
  const remaining = hasCapacity
    ? Math.max(0, maxGarrisonCapacity - totalAfter)
    : 0;
  const isOverCapacity = hasCapacity && totalAfter > maxGarrisonCapacity;

  // Percentages for the stacked bar
  const barMax = hasCapacity
    ? Math.max(maxGarrisonCapacity, totalAfter)
    : totalAfter || 1;
  const currentPct = (currentTroops / barMax) * 100;
  const trainedPct = (troopsTrained / barMax) * 100;
  const remainingPct = hasCapacity
    ? (Math.max(0, maxGarrisonCapacity - totalAfter) / barMax) * 100
    : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">Garrison</CardTitle>
          <CardDescription>
            Information — doesn&apos;t affect calculation
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="current-troops">Current Troops</Label>
            <Input
              id="current-troops"
              type="number"
              min={0}
              value={data.currentTroops || ""}
              onChange={handleChange("currentTroops")}
              placeholder="0"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="max-garrison">Max Garrison Capacity</Label>
            <Input
              id="max-garrison"
              type="number"
              min={0}
              value={data.maxGarrisonCapacity || ""}
              onChange={handleChange("maxGarrisonCapacity")}
              placeholder="0"
            />
          </div>
        </div>

        {/* Visual bar + legend — show when there's something to display */}
        {(currentTroops > 0 || troopsTrained > 0) && (
          <div className="space-y-3">
            {/* Stacked bar */}
            <div className="w-full h-2 rounded-lg overflow-hidden flex bg-muted border">
              {/* Current troops — blue */}
              {currentPct > 0 && (
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${currentPct}%` }}
                  title={`Current: ${formatNumber(currentTroops)}`}
                />
              )}
              {/* New trained troops — green */}
              {trainedPct > 0 && (
                <div
                  className={`h-full transition-all duration-300 ${
                    isOverCapacity
                      ? "bg-emerald-500/70 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.15)_4px,rgba(255,255,255,0.15)_8px)]"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${trainedPct}%` }}
                  title={`New: ${formatNumber(troopsTrained)}`}
                />
              )}
              {/* Remaining capacity — gray/empty */}
              {remainingPct > 0 && (
                <div
                  className="h-full bg-muted transition-all duration-300"
                  style={{ width: `${remainingPct}%` }}
                  title={`Free: ${formatNumber(remaining)}`}
                />
              )}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-blue-500" />
                <span className="text-muted-foreground">Current</span>
                <span className="font-semibold">
                  {formatNumber(currentTroops)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-emerald-500" />
                <span className="text-muted-foreground">Trained</span>
                <span className="font-semibold text-emerald-600">
                  +{formatNumber(troopsTrained)}
                </span>
              </div>
              {hasCapacity && (
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-muted border" />
                  <span className="text-muted-foreground">Max</span>
                  <span className="font-semibold">
                    {formatNumber(maxGarrisonCapacity)}
                  </span>
                </div>
              )}
            </div>

            {/* Summary line */}
            {hasCapacity && (
              <div
                className={`text-sm rounded-md px-3 py-2 ${
                  isOverCapacity
                    ? "bg-destructive/10 text-destructive font-medium"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isOverCapacity ? (
                  <>
                    ⚠️ Over capacity by{" "}
                    <span className="font-bold">
                      {formatNumber(totalAfter - maxGarrisonCapacity)}
                    </span>{" "}
                    troops
                  </>
                ) : remaining === 0 ? (
                  <>✅ Garrison will be exactly full</>
                ) : (
                  <>
                    You can train{" "}
                    <span className="font-semibold text-foreground">
                      {formatNumber(remaining)}
                    </span>{" "}
                    more before it&apos;s full
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
