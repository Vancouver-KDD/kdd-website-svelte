<script lang="ts">
  import {Button, EventCard, Section, Stats, Sponsors, Photos} from '$lib/components'
  import ellipse from '$lib/images/ellipse.svg'
  import {LinkedIn, Slack, naverCafe} from '$lib/icons'
  import {DateTime} from 'luxon'
  // import {applyAction, enhance} from '$app/forms'
  // import type {ActionData as SubscribeActionData} from '../../api/subscribe/$types'
  export let data

  // export let form: SubscribeActionData
  $: isPastEvent = DateTime.fromISO(data.event.date).diffNow().toMillis() < 0
</script>

<svelte:head>
  <title>Vancouver KDD | 밴쿠버 KDD | 한인 개발자 디자이너 모임</title>
  <meta
    name="description"
    content="저희는 밴쿠버 한인 개발자 디자이너로 이루어져 있으며 네트워킹 및 한인 사회에 기여를 추구하는 모임 입니다." />
</svelte:head>

<div class="flex-col gap-10">
  <section
    class={`flex-center h-screen bg-[url('$lib/images/hero-bg-2023-07.jpg')] bg-cover bg-center`}>
    <div class="flex-col items-center gap-8 text-center text-white px-4">
      <h1 class="text-4xl md:text-5xl font-bold text-shadow-lg text-transparent sm:text-inherit">
        Vancouver KDD
      </h1>
      <h2 class="text-lg md:text-xl">
        저희는 밴쿠버 한인 개발자 디자이너로 이루어져 있으며 네트워킹 및 한인 사회에 기여를 추구하는
        모임 입니다.
      </h2>
      <div class="flex-col gap-2 sm:flex-row sm:gap-8">
        <Button class="gap-1.5" href="https://cafe.naver.com/vancouverkdd" target="_blank">
          <img src={naverCafe} alt="naver-cafe" height="24" width="24" />
          NAVER CAFE
        </Button>
        <Button
          class="gap-2"
          href="https://join.slack.com/t/vancouverkdd/shared_invite/zt-1xyhcghtg-OIgE_8OO_SmBMpyOPuH5Ew"
          target="_blank">
          <Slack />
          JOIN SLACK
        </Button>
        <Button class="gap-2" href="https://www.linkedin.com/company/vancouver-kdd" target="_blank">
          <LinkedIn class="h-5" />
          LINKEDIN
        </Button>
      </div>
      <!-- {#if form}
        {#if form.status === 'success'}
          <div>Email successfully registered</div>
        {:else if form.status === 'failed'}
          <div>Error: {form.message}</div>
        {/if}
      {:else}
        <form
          use:enhance={() =>
            async ({result}) => {
              await applyAction(result)
            }}
          action="/api/subscribe"
          method="POST">
          <div class="flex-col gap-2 sm:flex-row">
            <label>
              Email
              <input name="email" type="email" class="text-black" />
            </label>
            <Button>Subscribe</Button>
          </div>
        </form>
      {/if} -->
    </div>
    <img class="absolute bottom-0 w-full" src={ellipse} alt="ellipse" />
  </section>

  <Section>
    <Stats stats={data.stats} />
  </Section>

  <Section title="Sponsors" class="bg-gray-100 p-6">
    <Sponsors sponsors={data.sponsors} />
  </Section>

  <Section title={isPastEvent ? 'Past Event' : 'Upcoming Event'}>
    <EventCard event={data.event} />
  </Section>

  <Section title={'Photos'}>
    <div class="flex w-full overflow-x-auto gap-4 text-center">
      <Photos dbPhotos={data.photos} />
    </div>
  </Section>

  <Section title="Subscribe to KDD">
    <div class="flex justify-center items-center h-72 md:h-auto">
      <script type="text/javascript" src="https://campaigns.zoho.com/js/zc.iframe.js"></script>
      <!-- ZOHO Campaign - Sign Up Form -->
      <iframe
        title="KDD Subscription Form"
        frameborder="0"
        id="iframewin"
        width="100%"
        height="100%"
        src="https://zcsub-cmpzourl.maillist-manage.com/ua/Optin?od=11287ecc59340d&zx=130eee8c7&tD=1fc927abddb173c1&sD=1fc927abddb177ad" />
    </div>
  </Section>
  <Section title="Contact Us" class="text-center">
    <div class="flex flex-center text-center flex-col gap-4">
      <a class="text-2xl font-bold" href="mailto:marketing@vancouverkdd.com">
        marketing@vancouverkdd.com
      </a>
      <a class="text-2xl font-bold" href="mailto:partner@vancouverkdd.com">
        partner@vancouverkdd.com
      </a>
      <a class="text-2xl font-bold" href="mailto:subgroup@vancouverkdd.com">
        subgroup@vancouverkdd.com
      </a>
    </div>
  </Section>
</div>

<!-- <style lang="sass">
  form
    label
      @apply flex gap-2 items-center mr-2
    input
      @apply rounded p-3
    button
      @apply font-bold
</style> -->
