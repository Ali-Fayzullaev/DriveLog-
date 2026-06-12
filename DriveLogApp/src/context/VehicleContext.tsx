import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vehicles as seed } from '../data';
import { Vehicle } from '../types';
import type { VehicleModelType } from '../components/vehicles/VehicleSVG';

interface MileageLogInput {
  vehicleId: string;
  odometer: number;
  notes: string;
  date: string;
}

interface AddVehicleInput {
  kind: 'car' | 'truck';
  modelType: VehicleModelType;
  make: string;
  model: string;
  year: number;
  plate: string;
  engine: string;
  color: string;
  mileage: number;
  trailerPlate?: string;
}

interface Ctx {
  vehicles: Vehicle[];
  selected: Vehicle;
  selectedId: string;
  select: (id: string) => void;
  addVehicle: (input: AddVehicleInput) => Promise<void>;
  addMileageLog: (input: MileageLogInput) => Promise<void>;
  removeVehicle: (id: string) => void;
}

const VehicleContext = createContext<Ctx | undefined>(undefined);

const STORAGE_KEY = 'drivelog_vehicles';
const SELECTED_KEY = 'drivelog_selected';

function buildNewVehicle(input: AddVehicleInput): Vehicle {
  const id = `v_${Date.now()}`;
  const isTruck = input.kind === 'truck';
  return {
    id,
    kind: input.kind,
    make: input.make,
    model: input.model,
    year: input.year,
    plate: input.plate,
    engine: input.engine || '—',
    color: input.color || '—',
    mileage: input.mileage,
    health: 100,
    healthLabel: 'Отличное состояние',
    badge: { text: 'Хорошее', urgency: 'ok' },
    glyphIcon: isTruck ? 'truck-trailer' : 'car',
    ...(isTruck && {
      trailerPlate: input.trailerPlate,
      axles: 5,
      hasTrailer: !!input.trailerPlate,
      adBlueLevel: 1.0,
    }),
    stats: [],
    reminders: [],
    history: [],
    tires: [],
  };
}

export function VehicleProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(seed);
  const [selectedId, setSelectedId] = useState(seed[0].id);

  // Persist custom vehicles
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const saved = JSON.parse(raw) as Vehicle[];
          if (saved.length > 0) setVehicles([...seed, ...saved]);
        } catch {}
      }
    });
    AsyncStorage.getItem(SELECTED_KEY).then((id) => {
      if (id) setSelectedId(id);
    });
  }, []);

  const selected = vehicles.find((v) => v.id === selectedId) ?? vehicles[0];

  const select = useCallback((id: string) => {
    setSelectedId(id);
    AsyncStorage.setItem(SELECTED_KEY, id);
  }, []);

  const addVehicle = useCallback(async (input: AddVehicleInput) => {
    const vehicle = buildNewVehicle(input);
    setVehicles((prev) => {
      const next = [...prev, vehicle];
      const custom = next.filter((v) => v.id.startsWith('v_'));
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
      return next;
    });
    setSelectedId(vehicle.id);
    AsyncStorage.setItem(SELECTED_KEY, vehicle.id);
  }, []);

  const addMileageLog = useCallback(async (input: MileageLogInput) => {
    setVehicles((prev) => {
      const next = prev.map((v) =>
        v.id === input.vehicleId ? { ...v, mileage: input.odometer } : v,
      );
      const custom = next.filter((v) => v.id.startsWith('v_'));
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
      return next;
    });
  }, []);

  const removeVehicle = useCallback((id: string) => {
    setVehicles((prev) => {
      const next = prev.filter((v) => v.id !== id);
      const custom = next.filter((v) => v.id.startsWith('v_'));
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
      return next.length > 0 ? next : seed;
    });
    setSelectedId((cur) => (cur === id ? (vehicles[0]?.id ?? seed[0].id) : cur));
  }, [vehicles]);

  return (
    <VehicleContext.Provider value={{ vehicles, selected, selectedId, select, addVehicle, addMileageLog, removeVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicles() {
  const ctx = useContext(VehicleContext);
  if (!ctx) throw new Error('useVehicles must be used within VehicleProvider');
  return ctx;
}
