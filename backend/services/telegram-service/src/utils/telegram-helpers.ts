// Утилита для исключения caption из опций
export function stripCaption<T extends { caption?: any }>(options?: T) {
  const { caption, ...rest } = options ?? {};
  return rest;
}

// Безопасное приведение caption к string
export function safeCaption(caption: string): string {
  return caption as unknown as string;
}

// Универсальная утилита для приведения к string
export function asStr<T>(val: T): string {
  return val as unknown as string;
}

// Глобальный тип для безопасного caption
export type SafeCaption = string | (string & {}); 