import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

const mockReplace = vi.fn();
const mockSearchParams = new URLSearchParams();
const router = { replace: mockReplace };

vi.mock('next/navigation', () => ({
  useRouter: () => router,
  usePathname: () => '/',
  useSearchParams: () => mockSearchParams,
}));

beforeEach(() => {
  mockReplace.mockClear();
  Array.from(mockSearchParams.keys()).forEach((key) => mockSearchParams.delete(key));
});
