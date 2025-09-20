import axios, { AxiosError } from 'axios';

const BASE_URL = process.env.JSON_SERVER_URL || 'http://localhost:4000';

type ProxyOptions = {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: any;
};

export async function proxy(path: string, options: ProxyOptions) {
  try {
    const res = await axios.request({
      url: `${BASE_URL}${path}`,
      method: options.method,
      data: options.body,
      headers: { 'Content-Type': 'application/json' },
    });

    return res.data;
  } catch (err) {
    const e = err as AxiosError;
    throw new Error(e.message || 'Proxy error');
  }
}
