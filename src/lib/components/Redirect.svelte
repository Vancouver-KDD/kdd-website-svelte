<script lang="ts">
  import {goto} from '$app/navigation'
  import {page} from '$app/stores'
  import {onMount} from 'svelte'

  export let href: string

  onMount(() => {
    if (href !== $page.url.pathname) {
      goto(href)
    }
  })
</script>
