import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const titleCase = (str: string) => {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); });
}

export const getAvatarInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
}


//TODO: keeping this for now

// export const debounce = (func: (...args: any[]) => void, wait: number) => {
//   let timeout: NodeJS.Timeout | null;

//   return function (...args: any[]) {
//     if (timeout) clearTimeout(timeout);

//     timeout = setTimeout(() => {
//       func.apply(this, args);
//     }, wait);
//   };
// }

export const debounce = (fn: (...args: any[]) => void, T: number) => {
  let timer: NodeJS.Timeout | null;
  const debouncedFunction = () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(fn, T)
  }

  debouncedFunction.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debouncedFunction;
}

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))