"use client"

import React, { useCallback } from "react";
import type { ResourceCost } from "@/lib/types";
import { DEFAULT_FORM_STATE } from "@/lib/constants";
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

interface ResourceSectionProps {
  data: ResourceCost;
  onChange: (data: ResourceCost) => void;
}

const RESOURCE_FIELDS: { key: keyof ResourceCost; label: string; icon: string }[] = [
  { key: "food", label: "Food", icon: "🌾" },
  { key: "wood", label: "Wood", icon: "🪵" },
  { key: "metal", label: "Metal", icon: "⚙️" },
  { key: "fuel", label: "Fuel", icon: "⛽" },
];

export function ResourceSection({ data, onChange }: ResourceSectionProps) {
  const handleChange = useCallback(
    (field: keyof ResourceCost) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.max(0, parseInt(e.target.value) || 0);
        onChange({ ...data, [field]: val });
      },
    [data, onChange]
  );

  const handleReset = useCallback(() => {
    onChange({ ...DEFAULT_FORM_STATE.resources });
  }, [onChange]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">Resources</CardTitle>
          <CardDescription>Cost per 1000 troops</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {RESOURCE_FIELDS.map(({ key, label, icon }) => (
            <div key={key} className="space-y-1">
              <Label htmlFor={`resource-${key}`} className="text-sm">
                {icon} {label}
              </Label>
              <Input
                id={`resource-${key}`}
                type="number"
                min={0}
                value={data[key] || ""}
                onChange={handleChange(key)}
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
