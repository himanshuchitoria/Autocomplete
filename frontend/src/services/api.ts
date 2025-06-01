
const BASE_URL = 'http://localhost:8000';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}


function buildQuery(params: Record<string, string | number | undefined>): string {
  const esc = encodeURIComponent;
  return Object.entries(params)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${esc(k)}=${esc(String(v))}`)
    .join('&');
}

/**
 * Generic GET request
 */
export async function apiGet<T>(
  endpoint: string,
  params: Record<string, string | number | undefined> = {}
): Promise<ApiResponse<T>> {
  const query = buildQuery(params);
  const url = `${BASE_URL}${endpoint}${query ? `?${query}` : ''}`;

  try {
    const res = await fetch(url);
    const status = res.status;
    if (!res.ok) {
      const errText = await res.text();
      return { data: null, error: errText || res.statusText, status };
    }
    const json = await res.json();
    return { data: json, error: null, status };
  } catch (err: any) {
    return { data: null, error: err.message || 'Network error', status: 0 };
  }
}
