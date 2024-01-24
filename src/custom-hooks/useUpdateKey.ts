import { useCallback, useState } from "react";

export function useUpdateKey() {
  const [key, setKey] = useState(0);
  const updateKey = useCallback(() => setKey((curr) => curr + 1), []);

  return { key, updateKey };
}
