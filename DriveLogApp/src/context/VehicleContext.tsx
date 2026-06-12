import React, { createContext, useContext, useState, useMemo } from 'react';
import { vehicles as seed } from '../data';
import { Vehicle } from '../types';

interface Ctx {
  vehicles: Vehicle[];
  selected: Vehicle;
  selectedId: string;
  select: (id: string) => void;
}

const VehicleContext = createContext<Ctx | undefined>(undefined);

export function VehicleProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState(seed[0].id);

  const value = useMemo<Ctx>(() => {
    const selected = seed.find((v) => v.id === selectedId) ?? seed[0];
    return {
      vehicles: seed,
      selected,
      selectedId,
      select: setSelectedId,
    };
  }, [selectedId]);

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>;
}

export function useVehicles() {
  const ctx = useContext(VehicleContext);
  if (!ctx) throw new Error('useVehicles must be used within VehicleProvider');
  return ctx;
}
