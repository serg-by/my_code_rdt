"use client"

import type { CalculationResult } from "@/lib/types";
import { formatSecondsToDHMS, formatNumber } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ResultSectionProps {
  result: CalculationResult;
  eventType: string;
}

function ResultRow({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="text-right">
        <span className="text-sm font-semibold">{value}</span>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}

export function ResultSection({ result, eventType }: ResultSectionProps) {
  const {
    troopsTrained,
    speedupsUsedSeconds,
    speedupsRemainingSeconds,
    eventPoints,
    speedupPoints,
    totalPoints,
    resourcesRequired,
  } = result;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Result</CardTitle>
        <CardDescription>Calculation output</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        {/* Troops */}
        <ResultRow
          label="Troops Trained"
          value={formatNumber(troopsTrained)}
        />
        <Separator />

        {/* Speedups */}
        <ResultRow
          label="Speedups Used"
          value={formatSecondsToDHMS(speedupsUsedSeconds)}
        />
        <ResultRow
          label="Speedups Remaining"
          value={formatSecondsToDHMS(speedupsRemainingSeconds)}
        />
        <Separator />

        {/* Points */}
        <ResultRow
          label="Event Points (troops)"
          value={formatNumber(eventPoints)}
        />
        {eventType === "Alliance Duel" && (
          <ResultRow
            label="Event Points (speedups)"
            value={formatNumber(speedupPoints)}
            sub="1 min = 250 pts"
          />
        )}
        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium">Total Points</span>
          <Badge variant="default" className="text-base px-3 py-1">
            {formatNumber(totalPoints)}
          </Badge>
        </div>
        <Separator />

        {/* Resources */}
        <div className="pt-1">
          <p className="text-sm font-medium mb-2">Resources Required</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <ResultRow
              label="🌾 Food"
              value={formatNumber(resourcesRequired.food)}
            />
            <ResultRow
              label="🪵 Wood"
              value={formatNumber(resourcesRequired.wood)}
            />
            <ResultRow
              label="⚙️ Metal"
              value={formatNumber(resourcesRequired.metal)}
            />
            <ResultRow
              label="⛽ Fuel"
              value={formatNumber(resourcesRequired.fuel)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
