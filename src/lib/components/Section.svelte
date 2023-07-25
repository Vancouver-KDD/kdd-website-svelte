<script lang="ts">
  import {clsx} from 'clsx'
  export let title = ''
</script>

<section class={clsx('flex-center', $$restProps.class)}>
  <div class="w-[calc(100vw-2rem)] max-w-4xl">
    {#if title}
      <div class="flex-col flex-center gap-4 mb-6">
        <h2 class="text-2xl md:text-3xl font-bold text-center">
          {title}
        </h2>
        <div class="w-36 h-0.5 bg-red-500" />
      </div>
    {/if}
    <slot />
  </div>
</section>
