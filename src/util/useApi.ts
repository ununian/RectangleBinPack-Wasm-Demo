import { ref, onMounted } from 'vue';

export function useApi<T, TArgs extends any[] = []>(
  func: (...args: TArgs) => Promise<T> | T,
  start: T | null = null,
  immediately = true
) {
  const result = ref<T | null>(start);
  const error = ref<any>(null);
  const loading = ref(immediately);

  const refresh = (...args: TArgs) => {
    loading.value = true;
    Promise.resolve(func(...args))
      .then((r) => {
        result.value = r as any;
      })
      .catch((err) => {
        error.value = err;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  if (immediately) {
    onMounted(refresh);
  }

  return { result, error, loading, refresh };
}
