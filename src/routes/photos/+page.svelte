<script lang="ts">
  import type {PageServerData} from './$types'
  import {Photos} from '$lib/components'
  export let data: PageServerData
</script>

<svelte:head>
  <title>Vancouver KDD - Photos 사진첩</title>
</svelte:head>

<section class="flex-center flex-col">
  <h1 class="text-3xl font-bold p-10">Photos</h1>
  <div
    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-center place-items-center items-start">
    <Photos dbPhotos={data.photos} />
  </div>
</section>
