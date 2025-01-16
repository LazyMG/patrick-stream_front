import { useRecoilState } from "recoil";
import { globalToastConfigState } from "../../app/entities/global/atom";

export const useToast = () => {
  const [globalToastConfig, setGlobalToastConfig] = useRecoilState(
    globalToastConfigState
  );

  const setGlobalToast = (text: string, toastKey: string) => {
    if (globalToastConfig === null) {
      setGlobalToastConfig({
        closeToast: (key: string) =>
          setGlobalToastConfig((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              toasts: prev.toasts.filter((toast) => toast.toastKey !== key), // 해당 key의 Toast만 삭제
            };
          }),
        toasts: [{ text, toastKey }],
      });
      return;
    }

    if (globalToastConfig && globalToastConfig.toasts) {
      const isToastExists = globalToastConfig.toasts.some(
        (toast) => toast.toastKey === toastKey
      );
      if (isToastExists) {
        return; // 같은 내용의 toast가 이미 있으면 추가하지 않음
      }

      setGlobalToastConfig((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          closeToast: (key: string) =>
            setGlobalToastConfig((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                toasts: prev.toasts.filter((toast) => toast.toastKey !== key),
              };
            }),
          toasts: [...prev.toasts, { text, toastKey }],
        };
      });
    }
  };

  return { setGlobalToast };
};
