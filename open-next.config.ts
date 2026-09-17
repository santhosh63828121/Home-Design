import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// Default configuration: no incremental/tag cache wired up yet.
// See https://opennext.js.org/cloudflare/caching to add R2/KV caching later.
export default defineCloudflareConfig()
