import { afterEach, describe, expect, it, vi } from 'vitest'
import { randomUuid } from '../src/index.ts'

describe('randomUuid', () => {
  afterEach(() => { vi.unstubAllGlobals() })

  it('generates v4 UUIDs with getRandomValues when randomUUID is unavailable', () => {
    vi.stubGlobal('crypto', {
      getRandomValues(bytes: Uint8Array) {
        return bytes.fill(0)
      },
    })

    expect(randomUuid()).toBe('00000000-0000-4000-8000-000000000000')
  })
})
