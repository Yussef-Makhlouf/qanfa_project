"use client"

import React, { useState, useCallback } from 'react';
import { Card } from "@/components/ui/card";

interface SelectionArea {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

interface ApartmentDesignCustomizerProps {
  onAreaSelect?: (area: SelectionArea) => void;
  initialAreas?: SelectionArea[];
  imageUrl: string;
}

export default function ApartmentDesignCustomizer({
  onAreaSelect,
  initialAreas = [],
  imageUrl
}: ApartmentDesignCustomizerProps) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [areas] = useState<SelectionArea[]>(initialAreas);

  const handleAreaClick = useCallback((area: SelectionArea) => {
    setSelectedArea(area.id);
    onAreaSelect?.(area);
  }, [onAreaSelect]);

  return (
    <Card className="w-full max-w-[1200px] mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="p-6">
        <div className="relative w-full aspect-[16/9]">
          {/* Main apartment image */}
          <img
            src={imageUrl}
            alt="Apartment Layout"
            className="w-full h-full object-contain"
          />
          
          {/* Clickable areas */}
          <div className="absolute inset-0">
            {areas.map((area) => (
              <button
                key={area.id}
                onClick={() => handleAreaClick(area)}
                className={`absolute cursor-pointer transition-all duration-200 ${
                  selectedArea === area.id
                    ? 'bg-blue-500/20 border-2 border-blue-500'
                    : 'bg-transparent hover:bg-blue-500/10'
                }`}
                style={{
                  left: `${area.x}%`,
                  top: `${area.y}%`,
                  width: `${area.width}%`,
                  height: `${area.height}%`,
                }}
                aria-label={area.label}
              />
            ))}
          </div>
        </div>

        {/* Selection information */}
        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {selectedArea 
              ? areas.find(a => a.id === selectedArea)?.label 
              : 'اختر منطقة للتخصيص'}
          </h3>
          <p className="text-gray-600">
            {selectedArea 
              ? 'انقر للاطلاع على خيارات التخصيص المتاحة'
              : 'انقر على أي منطقة في التصميم لبدء التخصيص'}
          </p>
        </div>
      </div>
    </Card>
  );
} 