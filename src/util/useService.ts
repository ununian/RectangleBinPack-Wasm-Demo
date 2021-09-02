export const useService = <T>(ctor: new (...args: any) => T): T => {
  return new ctor();
};
