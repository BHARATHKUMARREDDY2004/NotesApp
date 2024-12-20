import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LocationResult {
  placeName: string;
  latitude: number;
  longitude: number;
}

interface StoreState {
  userLocation: LocationResult | null;
  searchResults: LocationResult[];
  isLocationModalVisible: boolean;
  setLocation: (location: LocationResult) => void;
  setSearchResults: (results: LocationResult[]) => void;
  toggleLocationModal: () => void;
}

type StoreCreator = (
  set: (fn: (state: StoreState) => void) => void,
  get: () => StoreState
) => StoreState;

const createStore: StoreCreator = (set) => ({
  userLocation: null,
  searchResults: [],
  isLocationModalVisible: false,
  setLocation: (location: LocationResult) =>
    set(
      produce((state) => {
        state.userLocation = location;
      })
    ),
  setSearchResults: (results: LocationResult[]) =>
    set(
      produce((state) => {
        state.searchResults = results;
      })
    ),
  toggleLocationModal: () =>
    set(
      produce((state) => {
        state.isLocationModalVisible = !state.isLocationModalVisible;
      })
    ),
});

export const useStore = create<StoreState>()(
  persist(createStore, {
    name: 'dukaaon-user-location',
    storage: createJSONStorage(() => AsyncStorage),
    merge: true,
  })
);

