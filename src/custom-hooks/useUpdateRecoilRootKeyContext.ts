import { createContext, useCallback, useContext, useState } from "react";

export const UpdateRecoilRootKeyContext = createContext(() => {});
export const useUpdateRecoilRootKey = () => useContext(UpdateRecoilRootKeyContext);
