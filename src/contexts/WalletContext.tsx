
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

interface Allocation {
  id: string;
  name: string;
  amount: number;
  target?: number;
}

interface WalletContextType {
  walletBalance: number;
  allocations: Record<string, Allocation>;
  totalLockedFunds: number;
  depositToAllocation: (allocationId: string, name: string, amount: number, target?: number) => boolean;
  withdrawFromAllocation: (allocationId: string, amount: number) => boolean;
  setInitialWalletBalance: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Initial mock data - this would ideally come from a backend or user setup
const initialWalletBalance = 25000; // Example total liquid cash
const initialAllocationsData: Record<string, Allocation> = {
  // These IDs should match goal IDs from your pages
  "1": { id: "1", name: "Dream Vacation Fund", amount: 750, target: 2000 },
  "emergencyFund": { id: "emergencyFund", name: "Emergency Safety Net", amount: 3000, target: 5000 },
  "2": { id: "2", name: "Next-Gen Gaming Setup", amount: 200, target: 800 },
   // Example for budget page (this is more complex, as budgets are usually not "locked" funds from wallet)
  // "budget-food": { id: "budget-food", name: "Food Budget (Spent)", amount: 450, target: 600 },
};


export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletBalance, setWalletBalance] = useState<number>(initialWalletBalance);
  const [allocations, setAllocations] = useState<Record<string, Allocation>>(initialAllocationsData);

  const totalLockedFunds = React.useMemo(() => {
    return Object.values(allocations).reduce((sum, alloc) => {
       // Only count funds truly locked for goals/emergency, not general budget spending trackers
       if (alloc.id !== "budget-food") { // Example: exclude budget items if they are different
         return sum + alloc.amount;
       }
       return sum;
    }, 0);
  }, [allocations]);

  // Adjust wallet balance if initial locked funds exceed it
  useEffect(() => {
    if (totalLockedFunds > walletBalance) {
      // This scenario ideally shouldn't happen with proper initial setup or bank sync
      // For now, let's assume walletBalance is the source of truth for available cash
      console.warn("Initial locked funds exceed wallet balance. This indicates an issue with initial data setup.");
    }
  }, [totalLockedFunds, walletBalance]);


  const setInitialWalletBalance = useCallback((amount: number) => {
    setWalletBalance(amount);
  }, []);

  const depositToAllocation = useCallback((allocationId: string, name: string, amount: number, target?: number): boolean => {
    if (amount <= 0) {
        console.error("Deposit amount must be positive.");
        return false;
    }
    if (walletBalance < amount) {
      console.error("Insufficient funds in wallet for this deposit.");
      // Here you might want to use a toast notification for the user
      return false;
    }

    setWalletBalance(prevBalance => prevBalance - amount);
    setAllocations(prevAllocations => {
      const existingAllocation = prevAllocations[allocationId];
      const newAmount = (existingAllocation?.amount || 0) + amount;
      return {
        ...prevAllocations,
        [allocationId]: {
          id: allocationId,
          name: existingAllocation?.name || name,
          amount: newAmount,
          target: existingAllocation?.target || target,
        },
      };
    });
    return true;
  }, [walletBalance]);

  const withdrawFromAllocation = useCallback((allocationId: string, amount: number): boolean => {
    if (amount <= 0) {
        console.error("Withdrawal amount must be positive.");
        return false;
    }
    const allocation = allocations[allocationId];
    if (!allocation || allocation.amount < amount) {
      console.error("Insufficient funds in allocation or allocation not found.");
      // Toast notification for user
      return false;
    }

    setWalletBalance(prevBalance => prevBalance + amount);
    setAllocations(prevAllocations => ({
      ...prevAllocations,
      [allocationId]: {
        ...prevAllocations[allocationId],
        amount: prevAllocations[allocationId].amount - amount,
      },
    }));
    return true;
  }, [allocations]);


  return (
    <WalletContext.Provider value={{ walletBalance, allocations, totalLockedFunds, depositToAllocation, withdrawFromAllocation, setInitialWalletBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
