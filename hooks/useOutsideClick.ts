// 📁 src/hooks/useOutsideClick.ts (CORREGIDO)

import { useEffect, RefObject } from 'react';

/**
 * Hook para detectar clics fuera del elemento de referencia.
 * @param ref RefObject del elemento a observar.
 * @param handler Función a ejecutar cuando ocurre un clic fuera.
 * @param triggerRef RefObject de un elemento "gatillo" (opcional), como un botón que abre el panel, para ignorar clics en él.
 */
export function useOutsideClick<T extends HTMLElement>(
  // MODIFICACIÓN CLAVE: Cambiar RefObject<T> a RefObject<T | null>
  ref: RefObject<T | null>, 
  handler: (event: MouseEvent) => void,
  // Esta ya estaba bien tipada para aceptar null
  triggerRef?: RefObject<HTMLElement | null> 
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verificar si el clic no está dentro del elemento de referencia (el panel)
      const isOutsideRef = ref.current && !ref.current.contains(event.target as Node);
      
      // Verificar si el clic no está en el elemento "gatillo" (el botón que abre el panel)
      const isOutsideTrigger = !triggerRef || (triggerRef.current && !triggerRef.current.contains(event.target as Node));

      if (isOutsideRef && isOutsideTrigger) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  // Asegúrate de que el array de dependencias maneje ref y triggerRef correctamente.
  }, [ref, handler, triggerRef]); 
}