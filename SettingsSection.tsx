"use client"

import { useCallback } from "react";
import type { SettingsInputs, EventType, TroopTier } from "@/lib/types";
import { EVENT_TYPES, TROOP_TIERS, DEFAULT_FORM_STATE } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RotateCcw } from "lucide-react";

interface SettingsSectionProps {
  data: SettingsInputs;
  onChange: (data: SettingsInputs) => void;
}

export function SettingsSection({ data, onChange }: SettingsSectionProps) {
  const handleReset = useCallback(() => {
    onChange({ ...DEFAULT_FORM_STATE.settings });
  }, [onChange]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">Settings</CardTitle>
          <CardDescription>Event and troop configuration</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label>Event Type</Label>
          <RadioGroup
            value={data.eventType}
            onValueChange={(value: string) =>
              onChange({ ...data, eventType: value as EventType })
            }
            className="flex gap-4"
          >
            {EVENT_TYPES.map((evt) => (
              <div key={evt} className="flex items-center space-x-2">
                <RadioGroupItem value={evt} id={`event-${evt}`} />
                <Label
                  htmlFor={`event-${evt}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {evt}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Troop Tier</Label>
          <Select
            value={String(data.troopTier)}
            onValueChange={(value: string) =>
              onChange({ ...data, troopTier: Number(value) as TroopTier })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tier" />
            </SelectTrigger>
            <SelectContent>
              {TROOP_TIERS.map((tier) => (
                <SelectItem key={tier} value={String(tier)}>
                  T{tier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
